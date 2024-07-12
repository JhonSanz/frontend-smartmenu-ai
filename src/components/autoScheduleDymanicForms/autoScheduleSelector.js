"use client";

import { forwardRef, useState, useEffect, useImperativeHandle } from "react"
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { defaultValueDynamicForm } from '@/utils/constant';
import { PLAN_ACTIONS } from '@/utils/constant';


const AutoScheduleSelector = forwardRef(function AutoScheduleSelector({
  currentSchedule,
  action
}, ref) {
  const days = [
    { name: "Lunes", value: "monday" },
    { name: "Martes", value: "tuesday" },
    { name: "Miércoles", value: "wednesday" },
    { name: "Jueves", value: "thursday" },
    { name: "Viernes", value: "friday " },
    { name: "Sábado", value: "saturday " },
    { name: "Domingo", value: "sunday" },
  ]

  const time = Array.from(
    { length: 24 },
    (_, index) => `${index.toString().length > 1 ? "" : "0"}${index}:00`
  );

  const [autoSchedule, setAutoSchedule] = useState([defaultValueDynamicForm]);

  useEffect(() => {
    if (currentSchedule?.availability?.data && currentSchedule?.availability?.autoschedule)
      setAutoSchedule(currentSchedule.availability.data)
  }, [currentSchedule]);

  function getHelperText() {
    const values = autoSchedule.map(item => days.find(d => d.value === item.day)["name"])
    const removedDuplicates = new Set(values);
    return Array.from(removedDuplicates).join(", ")
  }

  function addNewRow() {
    setAutoSchedule([
      ...autoSchedule,
      defaultValueDynamicForm
    ])
  }

  function removeLastRow() {
    const removedLast = [...autoSchedule]
    removedLast.pop()
    setAutoSchedule(removedLast)
  }

  function handleDynamicChange(index, value, field) {
    const prevValues = [...autoSchedule];
    if (field === "day")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        day: value
      })
    if (field === "time")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        start_time: value
      })
    if (field === "duration")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        duration: value
      })
    setAutoSchedule(prevValues);
  }

  function getGenerateAuthoScheduleData() {
    return {
      "data": autoSchedule
    }
  }

  useImperativeHandle(ref, () => {
    return {
      getAuthoScheduleData() {
        return getGenerateAuthoScheduleData();
      },
    };
  }, [autoSchedule]);

  return (
    <>
      <Box sx={{ textAlign: "start", padding: "10px", marginBottom: "10px" }}>
        <small>El autoagendamiento se hace <b>por mes</b>. Al generarse un pago de este plan el horario se crea automáticamente para el cliente con la siguiente configuración:</small>
      </Box>
      {
        autoSchedule.map((item, index) =>
          <Box key={index} marginBottom={1}>
            <TextField
              id="outlined-select-currency"
              select
              label="Dia"
              value={days.find(d => d["value"] === item["day"])["value"]}
              onChange={(e) => handleDynamicChange(index, e.target.value, "day")}
              size="small"
              sx={{ width: "120px" }}
              disabled={action === PLAN_ACTIONS.update}
            >
              {days.map((option) => (
                <MenuItem key={`${index}${option.value}`} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Inicio"
              value={item["start_time"]}
              onChange={(e) => handleDynamicChange(index, e.target.value, "time")}
              size="small"
              sx={{ width: "120px" }}
              disabled={action === PLAN_ACTIONS.update}
            >
              {time.map((option) => (
                <MenuItem key={`${index}${option}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              label="Horas"
              value={item["duration"]}
              onChange={(e) => handleDynamicChange(index, e.target.value, "duration")}
              size="small"
              sx={{ width: "80px" }}
              disabled={action === PLAN_ACTIONS.update}
              type="number"
            />
          </Box>
        )
      }
      <Box>
        <Box>
          <small>
            Cada semana habrá clases los {getHelperText()}. En total <b>{autoSchedule.length * 4} clases al mes</b>.
          </small>
        </Box>
        <Button
          onClick={() => addNewRow()}
          size="small"
          variant="outlined"
          disabled={action === PLAN_ACTIONS.update}
        >Agregar</Button>
        <Button
          onClick={() => removeLastRow()}
          size="small"
          color="error"
          variant="outlined"
          disabled={autoSchedule.length === 1 || action === PLAN_ACTIONS.update}
        >Quitar</Button>
      </Box>
    </>
  )
})

export default AutoScheduleSelector;