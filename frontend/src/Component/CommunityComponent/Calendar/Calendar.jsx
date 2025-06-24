import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "antd";
import "./Calendar.css"; // You can style this to match your mockup
import { fetchAllEvent, fetchEventById } from "../../../Util/apiService";
import useMediaQuery from "../../../Util/useMediaQuery";

const CommunityCalendar = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0); // NEW STATE
  const [calendarRange, setCalendarRange] = useState({
    start: null,
    end: null,
  });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const calendarRef = useRef(null);

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
            location: event.location,
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
    const newView = arg.view.type;
    if (currentView !== newView) {
      setCurrentView(newView);
    }

    setCalendarRange({
      start: arg.view.activeStart,
      end: arg.view.activeEnd,
    });
  };

  const renderEventContent = (eventInfo) => {
    const viewType = eventInfo.view.type; // "dayGridDay", "dayGridWeek", etc.

    if (viewType === "dayGridDay") {
      return (
        <div className="custom-calendar-event">
          <div className="calendar-event-time heading6">
            {new Date(eventInfo.event.start).toLocaleDateString("en-GB", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
          <div className="calendar-event-title heading6">
            {eventInfo.event.title}
          </div>
          <div className="calendar-event-location heading6">
            {eventInfo.event.extendedProps.location}
          </div>
          <div className="calendar-event-link heading6">
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

  const getCurrentWeekEvents = () => {
    if (!calendarRange.start || !calendarRange.end) return [];

    return events.filter((event) => {
      const eventStart = new Date(event.start);
      return (
        eventStart >= calendarRange.start && eventStart < calendarRange.end
      );
    });
  };

  const formatRange = () => {
    if (!calendarRange.start || !calendarRange.end) return "";

    const start = calendarRange.start;
    const end = calendarRange.end;

    if (currentView === "dayGridDay") {
      return start.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    const endDate = new Date(end.getTime() - 1);
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startStr} – ${endStr}`;
  };

  const changeView = (viewName) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewName);
      setCurrentView(viewName); // Keep local state in sync
    }
  };

  const goPrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      setForceRefresh((prev) => prev + 1); // Trigger re-render
    }
  };

  const goNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      setForceRefresh((prev) => prev + 1); // Trigger re-render
    }
  };

  const goToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
      setForceRefresh((prev) => prev + 1); // Trigger re-render
    }
  };

  const renderMobileHeader = () => (
    <div className="custom-mobile-header">
      {/* Top Row: Arrows + Title (Center) */}
      <div className="mobile-header-title">
        <div onClick={goPrev} className="arrow-btn">
          ⬅
        </div>
        <span className="mobile-date-range text-button-regular">
          {formatRange()}
        </span>
        <div onClick={goNext} className="arrow-btn">
          ➡
        </div>
      </div>

      {/* Bottom Row: Today + View Buttons */}
      <div className="mobile-header-controls">
        <div className="mobile-today-btn text-button-regular" onClick={goToday}>
          Today
        </div>

        <div className="mobile-view-switch">
          <div
            className={`view-btn text-button-regular ${
              currentView === "dayGridDay" ? "active" : ""
            }`}
            onClick={() => changeView("dayGridDay")}
          >
            Day
          </div>
          <div
            className={`view-btn text-button-regular ${
              currentView === "dayGridWeek" ? "active" : ""
            }`}
            onClick={() => changeView("dayGridWeek")}
          >
            Week
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeekEvents = () => {
    const weekEvents = getCurrentWeekEvents();

    if (weekEvents.length === 0) {
      return <p className="text-l-regular no-events">No events this week.</p>;
    }

    const handleReadDetails = async (eventId) => {
      setLoading(true);
      setModalVisible(true);
      try {
        const data = await fetchEventById(eventId);
        setEventDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    return weekEvents.map((event) => (
      <div key={event.id} className="custom-calendar-week-event">
        <div className="calendar-event-date heading5">
          {new Date(event.start).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        <div className="calendar-event-time heading6">
          {new Date(event.start).toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>

        <div className="calendar-event-title heading6">{event.title}</div>
        <div className="calendar-event-location heading6">{event.location}</div>

        <div className="calendar-event-link heading6">
          <a
            href="#"
            className="read-details"
            onClick={(e) => {
              e.preventDefault();
              handleReadDetails(event.id);
            }}
          >
            Read Details
          </a>
        </div>
      </div>
    ));
  };

  const getHeaderToolbar = () => {
    return isMobile
      ? false
      : {
          start: "dayGridDay,dayGridWeek,dayGridMonth",
          center: "title",
          end: "today prev,next",
        };
  };

  return (
    <div className="container">
      {isMobile && renderMobileHeader()}

      {isMobile && currentView === "dayGridWeek" && (
        <div className="week-events-container">{renderWeekEvents()}</div>
      )}

      {/* Always render FullCalendar (show/hide instead of unmounting) */}
      <div
        style={{
          display: isMobile && currentView === "dayGridWeek" ? "none" : "block",
        }}
      >
        <FullCalendar
          ref={calendarRef}
          height="auto"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView={isMobile ? "dayGridWeek" : currentView}
          headerToolbar={getHeaderToolbar()}
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
      </div>

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
              <div className="event-modal-header">
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
                  <h2 className="heading3 event-modal-title">
                    {eventDetails.title}
                  </h2>
                  <p className="text-l-regular event-modal-date">
                    {new Date(eventDetails.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-l-regular event-modal-time">
                    ⏰ {eventDetails.startTime}
                  </p>
                  <p className="text-l-regular event-modal-location">
                    📍 {eventDetails.location} ➡️ {eventDetails.address}
                    {/* <strong>
                  </strong> */}
                  </p>
                  <p className="text-l-regular event-modal-pace">
                    💨 {eventDetails.paceMin}
                    {eventDetails.paceMax &&
                    eventDetails.paceMax !== eventDetails.paceMin
                      ? ` - ${eventDetails.paceMax}`
                      : ""}
                    kph
                  </p>
                  <p className="text-l-regular event-modal-time">
                    👤 {eventDetails.contactPerson}
                  </p>
                </div>
              </div>
              <p className="text-l-regular event-modal-description">
                {eventDetails.shortDesc}
              </p>
              {eventDetails.additionalDetail && (
                <p className="text-l-regular event-modal-additional">
                  {eventDetails.additionalDetail}
                </p>
              )}
              <div className="event-modal-actions">
                <a
                  className="event-modal-contact-person"
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
                  <button className="text-button-regular join-btn">
                    Contact Person
                  </button>
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
