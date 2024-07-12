"use client";

import { forwardRef, useState, useEffect, useImperativeHandle } from "react"
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import moment from "moment";
import {
  CORTESIA,
  FRANJAS,
  HORA_INICIO,
} from '@/utils/constant';
import { PLAN_ACTIONS } from '@/utils/constant';


const defaultValue = {
  "day": "monday",
  "start": "10:00",
  "end": "10:00",
}

function RestrictionsSelector({
  duration,
  restrictions,
  setRestrictions,
  onlyStartTime,
  action
}) {
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

  function addNewRow() {
    setRestrictions([
      ...restrictions,
      defaultValue
    ])
  }

  function removeLastRow() {
    const removedLast = [...restrictions]
    removedLast.pop()
    setRestrictions(removedLast)
  }

  function handleDynamicChange(index, value, field) {
    const prevValues = [...restrictions];
    if (field === "day")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        day: value
      })
    if (field === "start")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        start: value
      })
    if (field === "end")
      prevValues.splice(index, 1, {
        ...prevValues[index],
        end: value
      })
    setRestrictions(prevValues);
  }

  return (
    <>
      <Box sx={{ textAlign: "start", padding: "10px" }}>
        {
          !onlyStartTime && <small>El usuario solo podrá agendar sus clases en las siguientes <b>franjas horarias</b>:</small>
        }
        {
          onlyStartTime && <small>El usuario solo podrá agendar sus clases en los siguientes <b>horarios específicos</b>:</small>
        }
      </Box>
      {
        restrictions.map((item, index) =>
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
              value={item["start"]}
              onChange={(e) => handleDynamicChange(index, e.target.value, "start")}
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
            {
              !onlyStartTime && <TextField
                id="outlined-select-currency"
                label="Fin"
                select
                value={item["end"]}
                onChange={(e) => handleDynamicChange(index, e.target.value, "end")}
                size="small"
                sx={{ width: "120px" }}
                disabled={onlyStartTime || action === PLAN_ACTIONS.update}
              >
                {time.map((option) => (
                  <MenuItem key={`${index}${option}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            }
            {
              onlyStartTime && <TextField
                id="outlined-select-currency"
                label="Fin"
                value={moment(item["start"], "hh:mm").add(duration, "hours").format("HH:mm")}
                size="small"
                sx={{ width: "120px" }}
                disabled
              >
                {time.map((option) => (
                  <MenuItem key={`${index}${option}`} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            }
          </Box >
        )
      }
      <Box>
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
          disabled={restrictions.length === 1 || action === PLAN_ACTIONS.update}
        >Quitar</Button>
      </Box>
    </>
  )
}

const NonAutoScheduleSelector = forwardRef(function NonAutoScheduleSelector({
  currentSchedule,
  displayedSection,
  makeDesition,
  action
}, ref) {
  const [addRestrictions, setAddRestrictions] = useState(false);
  const [daysOfAvailability, setDaysOfAvailability] = useState(30);
  const [duration, setDuration] = useState(1);
  const [amountClasses, setAmountClasses] = useState(4);
  const [restrictions, setRestrictions] = useState([]);
  const [onlyStartTime, setOnlyStartTime] = useState(false);

  useEffect(() => {
    if (displayedSection === FRANJAS) {
      setAmountClasses(4);
      setAddRestrictions(true);
      setOnlyStartTime(false);
    } else if (displayedSection === HORA_INICIO) {
      setAmountClasses(4);
      setAddRestrictions(true);
      setOnlyStartTime(true);
    } else if (displayedSection === CORTESIA) {
      setAmountClasses(1);
      setAddRestrictions(true);
      setOnlyStartTime(true);
    } else {
      setAmountClasses(4);
      setAddRestrictions(false);
      setOnlyStartTime(false);
    }
  }, [displayedSection])

  useEffect(() => {
    if (!currentSchedule?.availability?.autoschedule && currentSchedule?.availability?.data?.length > 0)
      setAddRestrictions(currentSchedule.availability.data[0]["restrictions"].length > 0)
  }, []);

  useEffect(() => {
    if (currentSchedule?.availability?.data?.length > 0 && !currentSchedule?.availability?.autoschedule) {
      setDuration(currentSchedule.availability.data[0]["duration"]);
      setAmountClasses(currentSchedule.numClasses);
      setDaysOfAvailability(currentSchedule.expirationDays);
    }
    if (addRestrictions) {
      if (
        currentSchedule?.availability?.data?.length > 0 &&
        currentSchedule.availability.data[0]["restrictions"]?.length > 0
      ) {
        if (currentSchedule.availability.data[0]["courtesyClass"]) {
          setOnlyStartTime(true);
          makeDesition(CORTESIA);
        }
        else if (currentSchedule.availability.data[0]["onlyStartTime"]) {
          setOnlyStartTime(true);
          makeDesition(HORA_INICIO);
        } else {
          setOnlyStartTime(false);
          makeDesition(FRANJAS);
        }
        setRestrictions(currentSchedule.availability.data[0]["restrictions"]);
      } else {
        setRestrictions([defaultValue])
      }
    }
    else {
      setRestrictions([])
    }
  }, [addRestrictions, currentSchedule]);

  function getGenerateNonAuthoScheduleData() {
    const result = {
      "data": [
        {
          "day": null,
          "start_time": null,
          "duration": duration,
          "onlyStartTime": onlyStartTime,
          "courtesyClass": displayedSection === CORTESIA,
          "restrictions": restrictions
        }
      ],
      "numClasses": amountClasses,
      "expirationDays": daysOfAvailability,
    }
    return result;
  }

  useImperativeHandle(ref, () => {
    return {
      getNonAuthoScheduleData() {
        return getGenerateNonAuthoScheduleData();
      },
    };
  }, [
    restrictions, daysOfAvailability, duration,
    amountClasses, onlyStartTime, displayedSection
  ]);

  return (
    <>
      <Box sx={{ textAlign: "start", padding: "10px", marginBottom: "10px" }}>
        <small>El usuario deberá agendar <b>{amountClasses} clases manualmente</b>, cada una de <b>{duration} horas</b>. El plan estará <b>habilitado {daysOfAvailability} días</b> desde la fecha de compra.</small>
      </Box>
      <TextField
        id="outlined-select-currency"
        label="Clases"
        value={amountClasses}
        onChange={(e) => setAmountClasses(e.target.value)}
        size="small"
        sx={{ width: "70px" }}
        type="number"
        disabled={displayedSection === CORTESIA || action === PLAN_ACTIONS.update}
        InputProps={{ inputProps: { min: 1 } }}
      />
      <TextField
        id="outlined-select-currency"
        label="Horas"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        size="small"
        sx={{ width: "70px" }}
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        disabled={action === PLAN_ACTIONS.update}
      />
      <TextField
        id="outlined-select-currency"
        label="Días vencimiento"
        value={daysOfAvailability}
        onChange={(e) => setDaysOfAvailability(e.target.value)}
        size="small"
        sx={{ width: "120px" }}
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        disabled={action === PLAN_ACTIONS.update}
      />
      <br />
      {
        [FRANJAS, HORA_INICIO, CORTESIA].includes(displayedSection) && <RestrictionsSelector
          duration={duration}
          restrictions={restrictions}
          setRestrictions={setRestrictions}
          onlyStartTime={onlyStartTime}
          setOnlyStartTime={setOnlyStartTime}
          action={action}
        />
      }
    </>
  )
})

export default NonAutoScheduleSelector;