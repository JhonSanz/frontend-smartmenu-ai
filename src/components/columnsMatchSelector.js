"use client";

import { useState, useEffect, useContext, useImperativeHandle, forwardRef } from "react";
import parse from 'html-react-parser';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import { getCookie } from 'cookies-next';
import { ThemeContext } from '@/components/providers';
import { config } from 'dotenv';
config();

const NEXT_MESSAGES_URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_MESSAGES_URL : process.env.NEXT_PUBLIC_MESSAGES_URL_PRODUCTION;

const ColumnsMatchSelector = forwardRef(function ColumnsMatchSelector({
  fieldName,
  optionsLeft,
  optionsRight,
  linkingField,
  descriptionField
}, ref) {
  const [ready, setReady] = useState(false);
  const [optionsRightValues, setOptionsRightValues] = useState({});
  const [metaTemplates, setMetaTemplates] = useState({});
  const [metaTemplatesError, setMetaTemplatesError] = useState(false);
  const { setAlertContent } = useContext(ThemeContext);
  const userData = getCookie("userData")

  const handleChange = (event) => {
    const newOptions = { ...optionsRightValues };
    newOptions[event.target.name] = event.target.value;
    setOptionsRightValues(newOptions);
  };
  const getMetaTemplates = async () => {
    const companyId = JSON.parse(userData).companyId;
    let response = await fetch(`${NEXT_MESSAGES_URL}/templates/${companyId}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getCookie("token")}`
      },
    });
    if (!response.ok) {
      return;
    }
    response = await response.json();
    return response;
  }

  function formatResponse(meta_templates) {
    const result = [];
    for (let template of meta_templates) {
      const description = template.components.map(section => section.text);
      result.push({
        id: template.name,
        title: template.name,
        description: `<b>${template.name}</b><p>${description.join("<br><br>")}</p>`,
        fullData: JSON.stringify(template)
      })
    }
    setMetaTemplates(result);
    return result
  }

  useEffect(() => {
    async function init() {
      let meta_templates = await getMetaTemplates();
      if (!meta_templates) {
        setMetaTemplatesError(true);
        return
      }
      meta_templates = formatResponse(meta_templates.data);
      const formatOptionsRight = optionsRight.map(item => {
        const meta_template_found = meta_templates.find(template => template.id === item.template)
        return {
          ...item,
          title: meta_template_found === undefined ? "" : meta_template_found.title,
          description: meta_template_found === undefined ? "" : meta_template_found.description,
        }
      })
      const newOptions = { ...optionsRightValues };
      for (let option of optionsLeft) {
        const optionRightFound = formatOptionsRight.find(item => item[linkingField] === option.id);
        if (optionRightFound) {
          const existsOnOptions = meta_templates.find(item => item.id === optionRightFound.template);
          newOptions[option.name] = !existsOnOptions ? "" : optionRightFound.template;
        } else {
          newOptions[option.name] = ""
        }
      }
      setOptionsRightValues(newOptions);
      setReady(true);
    }
    init();
  }, []);

  function displayHelperText(text) {
    setAlertContent(parse(text))
  }

  function generateJsonObject() {
    const result = [];
    for (const [key, value] of Object.entries(optionsRightValues)) {
      const found = metaTemplates.find(item => item.id === value);
      result.push({
        messageTypeId: optionsLeft.find(item => item.name === key).id,
        template: value,
        template_details: found ? found.fullData : "",
      })
    }
    return {
      ok: !metaTemplatesError,
      fieldName: fieldName,
      data: result
    };
  }

  useImperativeHandle(ref, () => {
    return {
      getColumnsMatchSelector() {
        return generateJsonObject();
      },
    };
  }, [optionsRightValues, metaTemplates, metaTemplatesError]);

  return (
    <>
      {
        metaTemplatesError && <h4>Templates de Meta no configuradas</h4>
      }
      {
        ready && !metaTemplatesError && (
          <>
            {
              optionsLeft.map(item =>
                <Grid key={`labels_${item.id}`} container>
                  <Grid item xs={12} sm={5}>
                    <Box
                      display="flex"
                      alignItems="center"
                      mb={1}
                      sx={{ height: "40px" }}
                    >
                      <HelpOutlineIcon
                        sx={{ height: "15px", cursor: "pointer" }}
                        onClick={() => displayHelperText(item[descriptionField])}
                      />
                      <small>{item.name}</small>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} display="flex" alignItems="center">
                    <FormControl
                      sx={{ mb: 1, width: "90%" }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-helper-label">Plantilla</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name={item.name}
                        value={optionsRightValues[item.name]}
                        label="Plantilla"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>Ninguna</em>
                        </MenuItem>
                        {
                          metaTemplates.map(item => <MenuItem
                            key={`options_${item.id}`}
                            value={item.id}
                          >{item.title}</MenuItem>)
                        }
                      </Select>
                    </FormControl>
                    {
                      optionsRightValues[item.name] && <PreviewIcon
                        sx={{ height: "15px", cursor: "pointer" }}
                        onClick={
                          () => displayHelperText(
                            metaTemplates.find(option => option.id === optionsRightValues[item.name]).description
                          )
                        }
                      />
                    }
                  </Grid>
                </Grid>
              )
            }
          </>
        )
      }
    </>
  );
});

export default ColumnsMatchSelector;