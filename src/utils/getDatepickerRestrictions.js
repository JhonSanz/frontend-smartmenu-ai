import moment from "moment";


export function generateDatePickerRestrictions(value, constraints) {
  const days = constraints.map(d => moment().isoWeekday(d.day).day());
  const day = value.day();
  return !days.includes(day)
}


export function dateIsNotInThese(value, enabled, userTimezone) {
  if (enabled.length === 0) return true;
  const res = enabled.find(date =>
    moment.tz(date.start_datetime, userTimezone).isSame(value)
  );
  return !res;
}


function disbleSpecificDates(value, constraints, userTimezone) {
  /**
   * Desactiva una fecha en específico, por ejemplo:
    const example = [
      {
        "start_datetime": "2024-04-19T19:00:00.000Z",
        "end_datetime": "2024-04-19T21:00:00.000Z"
      }
    ]
   */
  const result = []
  for (let itemExample of constraints) {
    let start = moment.tz(itemExample.start_datetime, userTimezone);
    let end = moment.tz(itemExample.end_datetime, userTimezone);
    result.push(value.isAfter(start, "hour") && value.isBefore(end, "hour"));
  }
  return result.some(i => i)
}


function disableByRestrictions(value, constraints) {
  /**
   * desactiva fechas generalizadas, por ejemplo todas
   * las fechas que NO sean los lunes de 6AM a 10AM
   */

  const conditions = constraints.filter(item => moment().isoWeekday(item.day).day() === value.day());
  const result = []
  for (let item of conditions) {
    let day = moment().isoWeekday(item.day).day();
    let start = moment(item.start, 'h:mm').hour();
    let end = moment(item.end, 'h:mm').hour();
    if (value.day() === day) result.push(value.hour() >= start && value.hour() <= end);
  }
  return !result.some(i => i)
}

export function generateTimePickerRestrictions(value, constraints, userTimezone) {
  if (constraints.isOnlyStartTime) {
    return dateIsNotInThese(value, constraints.takenSchedulesRestrictions, userTimezone)
  } else {
    if (disbleSpecificDates(value, constraints.takenSchedulesRestrictions, userTimezone)) return true;
    if (disableByRestrictions(value, constraints.planRestriction)) return true;
  }
  return false;
} 
