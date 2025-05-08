import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card, Modal, Spin } from "antd";
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
      setLoading(false);
    }
  };

  console.log({ eventDetails });
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
        eventClick={handleEventClick}
        editable={false}
        selectable={true}
        eventDisplay="block"
      />

      <Modal
        title={eventDetails?.title || "Loading..."}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEventDetails(null);
        }}
        footer={null}
      >
        {loading ? (
          <Spin />
        ) : eventDetails ? (
          <div>
            <img
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
            <p>
              <strong>Date:</strong>{" "}
              {new Date(eventDetails.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {eventDetails.location}
            </p>
            <p>
              <strong>Address:</strong> {eventDetails.address}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{eventDetails.description}</p>
            {eventDetails.additionalDetail && (
              <>
                <p>
                  <strong>Additional Info:</strong>
                </p>
                <p>{eventDetails.additionalDetail}</p>
              </>
            )}
          </div>
        ) : (
          <p>There's no event this day.</p>
        )}
      </Modal>
    </div>
  );
};

export default CommunityCalendar;
