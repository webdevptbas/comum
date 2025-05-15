import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Modal,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  message,
  Form,
  Button,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createEvent,
  fetchAllEvent,
  fetchEventById,
} from "../../Util/apiService";
import "./Events.css";
import dayjs from "dayjs";

const EventsAdminPage = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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

  const handleDateClick = (arg) => {
    form.resetFields();
    form.setFieldsValue({ date: dayjs(arg.dateStr) });
    setCreateModalVisible(true);
  };

  const handleCreate = async (values) => {
    try {
      const payload = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        startTime: values.startTime.format("HH:mm"),
      };
      await createEvent(payload); // <- You must implement this in apiService.js
      message.success("Event created successfully");
      setCreateModalVisible(false);
      form.resetFields();
      window.location.reload(); // Or re-fetch the events manually
    } catch (err) {
      message.error("Failed to create event");
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
                  className="event-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x400";
                  }}
                />
                <div className="event-details">
                  <p className="event-date">
                    {new Date(eventDetails.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    , {eventDetails.startTime}
                  </p>
                  <h2 className="event-title">{eventDetails.title}</h2>
                  <p className="event-location">
                    📍{" "}
                    <strong>
                      {eventDetails.location}, {eventDetails.address}
                    </strong>
                  </p>
                </div>
                <p className="event-description">{eventDetails.shortDesc}</p>
                {eventDetails.additionalDetail && (
                  <p className="event-additional">
                    {eventDetails.additionalDetail}
                  </p>
                )}
                <div className="event-actions">
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

        {/* Create Event Modal */}
        <Modal
          open={createModalVisible}
          title="Create New Event"
          onCancel={() => setCreateModalVisible(false)}
          onOk={() => form.submit()}
          okText="Create Event"
          centered
        >
          <Form layout="vertical" form={form} onFinish={handleCreate}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="contactPerson"
              label="Contact Person"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="contactInfo"
              label="Contact Info (WhatsApp)"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shortDesc"
              label="Short Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="description" label="Full Description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="image"
              label="Upload Image"
              valuePropName="file"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="location"
              label="Start Location"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Finish Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[{ required: true }]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="durationMinutes"
              label="Duration (minutes)"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="paceMin"
              label="Pace Min (km/h)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="paceMax"
              label="Pace Max (km/h)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="additionalDetail" label="Additional Detail">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default EventsAdminPage;
