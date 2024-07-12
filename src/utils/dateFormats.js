import moment from "moment";

export function formatDatetimePicker(date) {
  return moment(moment(date).format("YYYY-MM-DDTHH:mm:ss"));
}

export function formatDay(date) {
  const format = date.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS");
  return format+"Z";
}
