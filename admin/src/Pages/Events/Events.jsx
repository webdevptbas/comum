import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { message, Form, Modal } from "antd";
import {
  createEvent,
  deleteEvent,
  fetchAllEvent,
  fetchEventById,
  updateEvent,
} from "../../Util/apiService";
import "./Events.css";
import dayjs from "dayjs";
import CreateEventModal from "../../Component/Modals/EventCreateModal";
import EventViewModal from "../../Component/Modals/EventViewModal";
import EventEditModal from "../../Component/Modals/EventEditModal";

const { confirm } = Modal;

const EventsAdminPage = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createForm] = Form.useForm();
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const loadEvents = async (start, end) => {
    if (!start || !end) return;

    try {
      setLoading(true);
      const data = await fetchAllEvent(start, end);

      const formattedEvents = data.map((event) => ({
        id: event._id,
        title: event.title,
        date: event.date,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Event fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
      }, 500);
    }
  };

  const handleDateClick = (arg) => {
    createForm.resetFields();
    createForm.setFieldsValue({ date: dayjs(arg.dateStr) });
    setCreateModalVisible(true);
  };

  const handleCreateSubmit = async (values) => {
    try {
      const formData = new FormData();

      // ===== base fields (shared by all event types)
      formData.append("type", values.type);
      formData.append("title", values.title);
      formData.append("contactPerson", values.contactPerson);
      formData.append("contactInfo", values.contactInfo);
      formData.append("shortDesc", values.shortDesc);
      formData.append("description", values.description || "");
      formData.append("date", values.date.format("YYYY-MM-DD"));
      formData.append("startTime", values.startTime.format("HH:mm"));
      formData.append("additionalDetail", values.additionalDetail || "");

      // ===== cycling-specific
      if (values.type === "cycling") {
        formData.append(
          "cycling",
          JSON.stringify({
            start: values.start,
            finish: values.finish,
            durationMinutes: Number(values.durationMinutes),
            paceMin: Number(values.paceMin),
            paceMax:
              values.paceMax !== undefined && values.paceMax !== ""
                ? Number(values.paceMax)
                : undefined,
          }),
        );
      }

      // ===== padel-specific
      if (values.type === "padel") {
        formData.append(
          "padel",
          JSON.stringify({
            location: values.location,
            court: Number(values.court),
            level: values.level,
            maxPlayers: Number(values.maxPlayers),
            matchFormat: values.matchFormat,
            partnerType: values.partnerType,
            durationMinutes: Number(values.durationMinutes),
          }),
        );
      }

      // ===== image
      const imageFile = values.image?.[0]?.originFileObj;
      if (imageFile) {
        formData.append("thumbnail", imageFile);
      }

      // ===== submit
      const res = await createEvent(formData);
      message.success(res.message);

      setCreateModalVisible(false);
      createForm.resetFields();
      loadEvents(dateRange.start, dateRange.end);
    } catch (err) {
      message.error("Failed to create event");
    }
  };

  const handleUpdate = (eventData) => {
    setEditModalVisible(true); // open the form modal
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();

      // 🔹 REQUIRED: event type
      formDataToSend.append("type", values.type);

      // 🔹 Shared fields
      formDataToSend.append("title", values.title);
      formDataToSend.append("contactPerson", values.contactPerson);
      formDataToSend.append("contactInfo", values.contactInfo);
      formDataToSend.append("shortDesc", values.shortDesc);
      formDataToSend.append("description", values.description || "");
      formDataToSend.append("date", values.date.format("YYYY-MM-DD"));
      formDataToSend.append("startTime", values.startTime.format("HH:mm"));
      formDataToSend.append("additionalDetail", values.additionalDetail || "");

      // 🔹 TYPE-SPECIFIC PAYLOAD
      if (values.type === "cycling") {
        const cyclingPayload = {
          start: values.start,
          finish: values.finish,
          durationMinutes: Number(values.durationMinutes),
          paceMin: Number(values.paceMin),
          paceMax:
            values.paceMax !== undefined && values.paceMax !== ""
              ? Number(values.paceMax)
              : undefined,
        };

        formDataToSend.append("cycling", JSON.stringify(cyclingPayload));
      }

      if (values.type === "padel") {
        const padelPayload = {
          location: values.location,
          court: Number(values.court),
          level: values.level,
          maxPlayers: Number(values.maxPlayers),
          matchFormat: values.matchFormat,
          partnerType: values.partnerType,
          durationMinutes: Number(values.durationMinutes),
        };

        formDataToSend.append("padel", JSON.stringify(padelPayload));
      }

      // 🔹 Image (only if changed)
      if (values.image && values.image[0]?.originFileObj) {
        formDataToSend.append("thumbnail", values.image[0].originFileObj);
      }

      await updateEvent(eventDetails._id, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        message.success(res.message);
      });

      setEditModalVisible(false);
      setModalVisible(false);
      loadEvents(dateRange.start, dateRange.end);
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      setLoading(true);
      await deleteEvent(eventId).then((res) => {
        message.success(res.message);
      });
      setModalVisible(false);
      loadEvents(dateRange.start, dateRange.end);
    } catch (error) {
      console.error("Delete failed:", error);
      message.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (eventId) => {
    confirm({
      title: "Are you sure you want to delete this event?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        return handleDelete(eventId);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleDatesSet = (arg) => {
    setCurrentView(arg.view.type);

    const startStr = arg.startStr;
    const endStr = arg.endStr;

    setDateRange({ start: startStr, end: endStr });
    loadEvents(startStr, endStr);
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
            <div className="read-details">Read Details</div>
          </div>
        </div>
      );
    }

    // For other views, just default render
    return <div>{eventInfo.event.title}</div>;
  };

  return (
    <div className="container">
      <h1>Events</h1>
      <div>
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
          dateClick={handleDateClick}
          editable={false}
          selectable={true}
          eventDisplay="block"
        />

        <EventViewModal
          open={modalVisible}
          loading={loading}
          eventDetails={eventDetails}
          onCancel={() => {
            setModalVisible(false);
            setEventDetails(null);
          }}
          onEdit={(eventData) => handleUpdate(eventData)}
          onDelete={(id) => showDeleteConfirm(id)}
        />

        {/* Create Event Modal */}
        <CreateEventModal
          open={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          onCreate={handleCreateSubmit}
          form={createForm}
        />

        {/* Edit Event Modal */}
        <EventEditModal
          open={editModalVisible}
          loading={loading}
          onCancel={() => setEditModalVisible(false)}
          eventDetails={eventDetails}
          onFinish={(values) => handleEditSubmit(values)}
        />
      </div>
    </div>
  );
};

export default EventsAdminPage;
