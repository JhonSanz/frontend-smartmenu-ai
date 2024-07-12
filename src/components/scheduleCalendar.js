"use client";

import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment-timezone';
import "@/styles/customCalendarStyle.css"
import { getCookie } from 'cookies-next';
import Modal from '@/components/modal';
import { CALENDAR_COLORS } from '@/utils/constant';


const MyCalendar = ({
  events,
  handleOnChange
}) => {
  const userTimezone = getCookie("timezone")
  moment.tz.setDefault(userTimezone)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setmodalContent] = useState(null);
  const localizer = momentLocalizer(moment);
  const colors = {};
  const myEventsList = [
    // {
    //   id: 1,
    //   title: 'DTS ENDS',
    //   start: moment("2024-02-01T07:30:00").toDate(),
    //   end: moment("2024-02-01T07:30:00").toDate(),
    // },
    // {
    //   id: 2,
    //   title: 'DTS ENDS 2',
    //   start: moment("2024-02-01T07:30:00").toDate(),
    //   end: moment("2024-02-01T07:30:00").toDate(),
    // }
  ]

  const components = {
    event: (props) => {
      const { data } = props.event;
      return (
        <div style={{
          backgroundColor: data?.type === "active" ? "#2196f3" : "#e0e0e0",
          color: data?.type === "active" ? "#fff" : "#000",
          fontSize: "13px",
          padding: "2px",
          borderRadius: "7px"
        }}>
          <small>
            {props.title}
          </small>
        </div>
      )
    }
  }

  function eventStyleGetter(event, start, end, isSelected) {
    let bgcolor = colors[event.title];
    if (!bgcolor) {
      bgcolor = CALENDAR_COLORS[Object.keys(colors).length];
      colors[event.title] = bgcolor;
    }
    const { data } = event;
    var style = {
      opacity: 0.8,
      border: '0px',
      display: 'block',
      backgroundColor: data?.type === "active" ? bgcolor : "#e0e0e0",
      color: data?.type === "active" ? "#fff" : "#000",
      fontSize: "13px",
      padding: "2px",
      paddingLeft: "10px",
      borderRadius: "7px"
    };

    return {
      style: style
    };
  }

  return (
    <div
      style={{ height: "80vh", width: "100%" }}
    >
      <Calendar
        localizer={localizer}
        events={[...events, ...myEventsList]}
        views={["month", "week", "day"/*"day", "agenda"*/]}
        defaultView='month'
        toolbar={true}
        onNavigate={(e) => handleOnChange(moment.tz(e, userTimezone))}
        onSelectEvent={(event) => {
          if (event.displayForm) event.displayForm();
          else {
            setmodalContent(event.description)
            setIsModalOpen(true)
          }
        }}
        // components={components}

        eventPropGetter={eventStyleGetter}
      />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        children={modalContent}
      />
    </div>
  )
}

export default MyCalendar;
