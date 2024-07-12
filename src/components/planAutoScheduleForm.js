"use client"

import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { useState } from "react"
import Box from "@mui/material/Box"
import AutoScheduleSelector from './autoScheduleDymanicForms/autoScheduleSelector';
import NonAutoScheduleSelector from './autoScheduleDymanicForms/nonAutoScheduleSelector';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  AUTOAGENDADO,
  CORTESIA,
  FRANJAS,
  HORA_INICIO,
  SIN_RESTRICCIONES,
} from '@/utils/constant';


const PlanAutoSchedule = forwardRef(function PlanAutoSchedule({
  presetConfig,
  action
}, ref) {
  const [isAutoSchedule, setIsAutoSchedule] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState({});
  const [displayedSection, setDisplayedSection] = useState("");
  const [planType, setPlanType] = useState("");
  const nonAutoScheduleRef = useRef(null);
  const autoScheduleRef = useRef(null);
  const plan_types = [AUTOAGENDADO, CORTESIA, FRANJAS, HORA_INICIO, SIN_RESTRICCIONES];

  function makeDesition(value) {
    setPlanType(value);
    setDisplayedSection(value);
  }

  function configsValidator(configs, durationGetter, start_label) {
    const data = configs.sort((a, b) => {
      if (a.day < b.day) return -1;
      if (a.day > b.day) return 1;
      return 0;
    })

    let currentDay = "";
    let timeThatDay = [];
    for (let config of data) {
      if (currentDay !== config.day) {
        currentDay = config.day;
        timeThatDay = [];
      }
      let hoursDurationAdded = [...Array(durationGetter(config)).keys()];
      for (let hourAdded of hoursDurationAdded) {
        let resultHour = moment(config[start_label], "HH:mm").add(hourAdded, "hours").format("HH:mm");
        if (timeThatDay.includes(resultHour)) return false;
        timeThatDay.push(resultHour);
      }
    }
    return true;
  }

  function isJsonObjectValid(planConfig) {
    const isDataAutoScheduled = planConfig["autoschedule"];
    if (isDataAutoScheduled) {
      const data = planConfig["data"];
      let durationGetter = (config) => parseInt(config.duration);
      return configsValidator(data, durationGetter, "start_time");
    } else {
      const nonAutoScheduledData = planConfig["data"][0];
      const onlyStartTime = nonAutoScheduledData["onlyStartTime"];
      const restrictions = nonAutoScheduledData["restrictions"];
      if (restrictions.length === 0) return true;
      if (onlyStartTime) {
        let durationGetter = () => parseInt(nonAutoScheduledData["duration"]);
        return configsValidator(restrictions, durationGetter, "start");
      } else {
        let durationGetter = (config) => parseInt(
          moment(config.end, "hh:mm").diff(moment(config.start, "hh:mm"), 'hours', true)
        );
        return configsValidator(restrictions, durationGetter, "start");
      }
    }
  }

  function generateJsonObject() {
    let formResult;
    const result = { "autoschedule": isAutoSchedule };
    if (!isAutoSchedule) {
      formResult = nonAutoScheduleRef.current?.getNonAuthoScheduleData();
      result["data"] = formResult["data"];
      result["numClasses"] = parseInt(formResult["numClasses"]);
      result["expirationDays"] = parseInt(formResult["expirationDays"]);
    } else {
      formResult = autoScheduleRef.current?.getAuthoScheduleData();
      result["data"] = formResult["data"];
      result["numClasses"] = formResult["data"].length * 4;
      result["expirationDays"] = 30;
    }
    result["planType"] = planType;
    result["validForm"] = isJsonObjectValid(result);
    return result;
  }

  useImperativeHandle(ref, () => {
    return {
      getDynamicPlanValues() {
        return generateJsonObject();
      },
    };
  }, [autoSchedule, isAutoSchedule, planType]);

  useEffect(() => {
    if (presetConfig && presetConfig.availability) {
      const parsed = JSON.parse(presetConfig.availability);
      if (parsed["autoschedule"]) {
        setIsAutoSchedule(true);
        makeDesition(AUTOAGENDADO);
      } else {
        setIsAutoSchedule(false);
        makeDesition(SIN_RESTRICCIONES);
      }
      setAutoSchedule({ ...presetConfig, availability: parsed });
    } else {
      makeDesition(AUTOAGENDADO);
    }
  }, []);

  useEffect(() => {
    if (planType === AUTOAGENDADO) setIsAutoSchedule(true);
    else setIsAutoSchedule(false);
  }, [planType]);

  return (
    <Box sx={{ backgroundColor: "#fafafa", padding: "10px", border: "1px dotted gray" }}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Tipo plan</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={planType}
            onChange={(e) => makeDesition(e.target.value)}
            label="Tipo de plan"
            disabled={action === "update"}
            fullWidth
          >
            {
              plan_types.map(item => (
                <MenuItem key={item} value={item}>
                  <em>{item}</em>
                </MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </Box>
      {
        displayedSection === AUTOAGENDADO && <AutoScheduleSelector
          ref={autoScheduleRef}
          currentSchedule={autoSchedule}
          action={action}
        />
      }
      {
        [FRANJAS, HORA_INICIO, SIN_RESTRICCIONES, CORTESIA].includes(displayedSection) && <NonAutoScheduleSelector
          ref={nonAutoScheduleRef}
          currentSchedule={autoSchedule}
          setDisplayedSection={setDisplayedSection}
          displayedSection={displayedSection}
          makeDesition={makeDesition}
          action={action}
        />
      }
    </Box>
  )
})

export default PlanAutoSchedule;
