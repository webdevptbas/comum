import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Calendar.css"; // You can style this to match your mockup
import { fetchAllEvent, fetchEventById } from "../../../Util/apiService";
import useMediaQuery from "../../../Util/useMediaQuery";
import CalendarModal from "./CalendarModal";

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
    const loadEvents = async () => {
      if (!calendarRange.start || !calendarRange.end) return;

      try {
        const startISO = calendarRange.start;
        const endISO = calendarRange.end;

        const data = await fetchAllEvent(startISO, endISO);

        const transformedEvents = data
          .map((event) => {
            let startDateTime;
            let endDateTime;

            // 🟢 Model B: explicit start & end
            if (event.startDateTime && event.endDateTime) {
              startDateTime = new Date(event.startDateTime);
              endDateTime = new Date(event.endDateTime);
            }

            // 🟡 Model A: date + startTime + duration
            else if (event.date && event.startTime && event.durationMinutes) {
              startDateTime = new Date(
                `${event.date.substring(0, 10)}T${event.startTime}`,
              );
              endDateTime = new Date(
                startDateTime.getTime() + Number(event.durationMinutes) * 60000,
              );
            } else {
              console.warn("Event has no valid time model, skipped:", event);
              return null;
            }

            // 🚨 Final safety check
            if (
              isNaN(startDateTime.getTime()) ||
              isNaN(endDateTime.getTime())
            ) {
              console.warn("Invalid datetime after parsing, skipped:", event);
              return null;
            }

            return {
              id: event._id,
              title: event.title,
              location: event.location,
              start: startDateTime,
              end: endDateTime,
              extendedProps: event,
            };
          })
          .filter(Boolean);

        setEvents(transformedEvents);
      } catch (err) {
        console.error("Failed to load filtered events:", err);
      }
    };

    loadEvents();
  }, [calendarRange]);

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
      }, 700);
    }
  };

  const handleDatesSet = (arg) => {
    const viewType = arg.view.type;
    setCurrentView(viewType);

    let start, end;

    if (viewType === "dayGridMonth") {
      // Use activeStart, but normalize to real month
      const date = arg.view.activeStart;

      if (!(date instanceof Date) || isNaN(date)) return;

      start = new Date(date.getFullYear(), date.getMonth(), 1);
      end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    } else {
      if (
        !(arg.view.activeStart instanceof Date) ||
        !(arg.view.activeEnd instanceof Date)
      )
        return;

      start = arg.view.activeStart;
      end = arg.view.activeEnd;
    }

    setCalendarRange({ start, end });
  };

  // DAY VIEW RENDER
  const renderEventContent = (eventInfo) => {
    const viewType = eventInfo?.view?.type; // "dayGridDay", "dayGridWeek", etc.

    console.log({ eventInfo });
    if (viewType === "dayGridDay") {
      return (
        <div className="custom-calendar-event">
          <div className="calendar-event-time heading6">
            {new Date(eventInfo?.event?.start).toLocaleDateString("en-GB", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
          <div className="calendar-event-title heading6">
            {eventInfo?.event?.title}
          </div>
          {/* <div className="calendar-event-location heading6">
            {eventInfo?.event?.extendedProps?.location}
          </div> */}
          {eventInfo?.event?.extendedProps?.padel ? (
            <div className="calendar-event-location heading6">
              {eventInfo?.event?.extendedProps?.padel?.location}
            </div>
          ) : eventInfo?.event?.extendedProps?.cycling ? (
            <div className="calendar-event-location heading6">
              {eventInfo?.event?.extendedProps?.cyclng?.location}
            </div>
          ) : (
            <div className="calendar-event-location heading6">
              {eventInfo?.event?.extendedProps?.location}
            </div>
          )}
          <div className="calendar-event-link heading6">
            <p className="read-details">Read Details</p>
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
          <LeftOutlined />
        </div>
        <span className="mobile-date-range text-button-regular">
          {formatRange()}
        </span>
        <div onClick={goNext} className="arrow-btn">
          <RightOutlined />
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

  // WEEK VIEW RENDER
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
      <div key={event?.id} className="custom-calendar-week-event">
        <div className="calendar-event-date heading5">
          {new Date(event?.start).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="calendar-event-time heading6">
          {event?.extendedProps?.startTime}
        </div>

        {/* dibuat banyak if case karena data lama belum terbarukan */}
        <div className="calendar-event-title heading6">{event?.title}</div>
        {event?.extendedProps?.padel ? (
          <div className="calendar-event-location heading6">
            {event?.extendedProps?.padel?.location}
          </div>
        ) : event?.extendedProps?.cycling ? (
          <div className="calendar-event-location heading6">
            {event?.extendedProps?.cyclng?.location}
          </div>
        ) : (
          <div className="calendar-event-location heading6">
            {event?.location}
          </div>
        )}
        <div className="calendar-event-link heading6">
          <p
            className="read-details"
            onClick={(e) => {
              e.preventDefault();
              handleReadDetails(event.id);
            }}
          >
            Read Details
          </p>
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
          showNonCurrentDates={false}
          fixedWeekCount={false}
          timeZone="Asia/Jakarta"
        />
      </div>

      <CalendarModal
        open={modalVisible}
        loading={loading}
        eventDetails={eventDetails}
        onCancel={() => {
          setModalVisible(false);
          setEventDetails(null);
        }}
      />
    </div>
  );
};

export default CommunityCalendar;
