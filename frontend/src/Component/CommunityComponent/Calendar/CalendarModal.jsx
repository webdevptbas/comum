import React from "react";
import { Modal } from "antd";
import "./Calendar.css";
import EventViewCycling from "./EventViewModal/EventViewCycling";
import EventViewPadel from "./EventViewModal/EventViewPadel";

const CalendarModal = ({ open, loading, onCancel, eventDetails }) => {
  const renderByType = () => {
    switch (eventDetails?.type) {
      case "cycling":
        return <EventViewCycling event={eventDetails} />;
      case "padel":
        return <EventViewPadel event={eventDetails} />;
      default:
        return <p>Unknown event type</p>;
    }
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      loading={loading}
      footer={null}
      width="900px"
      centered
      className="custom-event-modal"
    >
      {renderByType()}
    </Modal>
  );
};

export default CalendarModal;
