import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEvent();
      const formattedEvents = data.map((event) => ({
        id: event._id,
        title: event.title,
        date: event.date,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
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
      }, 1000);
    }
  };

  const handleDateClick = (arg) => {
    createForm.resetFields();
    createForm.setFieldsValue({ date: dayjs(arg.dateStr) });
    setCreateModalVisible(true);
  };

  const handleCreate = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("contactPerson", values.contactPerson);
      formData.append("contactInfo", values.contactInfo);
      formData.append("shortDesc", values.shortDesc);
      formData.append("description", values.description || "");
      formData.append("location", values.location);
      formData.append("address", values.address);
      formData.append("date", values.date.format("YYYY-MM-DD"));
      formData.append("startTime", values.startTime.format("HH:mm"));
      formData.append("durationMinutes", values.durationMinutes);
      formData.append("paceMin", Number(values.paceMin));
      if (values.paceMax !== undefined && values.paceMax !== "") {
        formData.append("paceMax", Number(values.paceMax));
      }
      formData.append("additionalDetail", values.additionalDetail || "");

      const imageFile = values.image?.[0]?.originFileObj;
      if (imageFile) {
        formData.append("thumbnail", imageFile); // <- this is what multer expects
      }

      await createEvent(formData).then((res) => {
        message.success(res.message);
      }); // from apiService.js
      setCreateModalVisible(false);
      createForm.resetFields();
      fetchEvents();
    } catch (err) {
      message.error("Failed to create event");
    }
  };

  const handleUpdate = (eventData) => {
    setEditModalVisible(true); // open the form modal
  };

  const handleEditSubmit = async (formData) => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("contactPerson", formData.contactPerson);
      formDataToSend.append("contactInfo", formData.contactInfo);
      formDataToSend.append("shortDesc", formData.shortDesc);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("location", formData.location);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("date", formData.date.format("YYYY-MM-DD"));
      formDataToSend.append("startTime", formData.startTime.format("HH:mm"));
      formDataToSend.append("durationMinutes", formData.durationMinutes);
      formDataToSend.append("paceMin", Number(formData.paceMin));

      if (formData.paceMax !== undefined && formData.paceMax !== "") {
        formDataToSend.append("paceMax", Number(formData.paceMax));
      }

      formDataToSend.append(
        "additionalDetail",
        formData.additionalDetail || ""
      );

      // Only append new file if user selected one
      if (formData.image && formData.image[0]?.originFileObj) {
        formDataToSend.append("thumbnail", formData.image[0].originFileObj);
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
      fetchEvents(); // refresh calendar
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
      fetchEvents(); // refresh event list
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
          onCreate={handleCreate}
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
