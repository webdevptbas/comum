import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "antd";
import "./Calendar.css"; // You can style this to match your mockup
import { fetchAllEvent, fetchEventById } from "../../../Util/apiService";

const CommunityCalendar = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchAllEvent();
        const transformedEvents = data.map((event) => {
          const startDateTime = new Date(
            `${event.date.substring(0, 10)}T${event.startTime}`
          );
          const endDateTime = new Date(
            startDateTime.getTime() + event.durationMinutes * 60000
          );

          return {
            id: event._id,
            title: event.title,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            extendedProps: event, // to pass all additional data if needed
          };
        });

        setEvents(transformedEvents);
      } catch (err) {
        console.error(err);
      }
    };

    loadEvent();
  }, []);

  const handleEventClick = async ({ event }) => {
    setLoading(true);
    setModalVisible(true);
    try {
      const data = await fetchEventById(event.id); // Use event.id here
      setEventDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
            {new Date(eventInfo.event.start).toLocaleDateString("en-GB", {
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
        eventClick={handleEventClick}
        editable={false}
        selectable={true}
        eventDisplay="block"
      />

      <Modal
        title={null}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEventDetails(null);
        }}
        footer={null}
        width={"840px"}
        height={"480px"}
        centered
        loading={loading}
        className="custom-event-modal"
      >
        {eventDetails ? (
          <div className="event-modal-content">
            <div className="event-modal-grid">
              <img
                src={eventDetails.imageUrl}
                alt={eventDetails.title}
                className="event-modal-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x400";
                }}
              />
              <div className="event-modal-details">
                <h2 className="event-modal-title">{eventDetails.title}</h2>
                <p className="event-modal-date">
                  {new Date(eventDetails.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="event-modal-time">⏰ {eventDetails.startTime}</p>
                <p className="event-modal-location">
                  📍{" "}
                  <strong>
                    {eventDetails.location} ➡️ {eventDetails.address}
                  </strong>
                </p>
                <p className="event-modal-pace">
                  💨 {eventDetails.paceMin}
                  {eventDetails.paceMax === eventDetails.paceMin
                    ? ""
                    : `- ${eventDetails.paceMax}`}{" "}
                  kph
                </p>
              </div>
              <p className="event-modal-description">
                {eventDetails.shortDesc}
              </p>
              {eventDetails.additionalDetail && (
                <p className="event-modal-additional">
                  {eventDetails.additionalDetail}
                </p>
              )}
              <div className="event-modal-actions">
                <a
                  href={`https://wa.me/${
                    eventDetails.contactInfo
                  }?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20${encodeURIComponent(
                    eventDetails.title
                  )}%20on%20${encodeURIComponent(
                    new Date(eventDetails.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="join-btn">Join Event</button>
                </a>
                {/* <button className="details-btn">Event Details</button> */}
              </div>
            </div>
          </div>
        ) : (
          <p>There's no event this day.</p>
        )}
      </Modal>
    </div>
  );
};

export default CommunityCalendar;
