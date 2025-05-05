import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card } from "antd";
import "./Calendar.css"; // You can style this to match your mockup

const CommunityCalendar = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([
    {
      title: "Sunrise Ride & Brew\nComum x Castell...",
      date: "2025-04-17T10:00:00",
    },
    {
      title: "Night Spin & Social\nComum x Pixel Twilig...",
      date: "2025-04-22T18:00:00",
    },
    {
      title: "Gravel & Grind\nComum x Shimano A...",
      date: "2025-04-23T13:00:00",
    },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  const handleDatesSet = (arg) => {
    setCurrentView(arg.view.type);
  };

  const renderEventContent = (eventInfo) => {
    const viewType = eventInfo.view.type; // "dayGridDay", "dayGridWeek", etc.

    if (viewType === "dayGridDay") {
      return (
        <div className="custom-calendar-event">
          <div className="calendar-event-time">
            {new Date(eventInfo.event.start).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
          <div className="calendar-event-title">{eventInfo.event.title}</div>
          <div className="calendar-event-location">Comum Bike and Coffee</div>
          <div className="calendar-event-link">
            <a href="#" className="read-details">
              Read Details
            </a>
          </div>
        </div>
      );
    }

    // For other views, just default render
    return <div>{eventInfo.event.title}</div>;
  };

  return (
    <div className="container">
      <FullCalendar
        height="auto"
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView={currentView}
        headerToolbar={{
          start: "dayGridDay, dayGridWeek, dayGridMonth",
          center: "title",
          end: "today prev,next",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        events={events}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
        editable={false}
        selectable={true}
        eventDisplay="block"
      />
    </div>
  );
};

export default CommunityCalendar;
