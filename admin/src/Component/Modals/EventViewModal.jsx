import React from "react";
import { Modal } from "antd";
import "../../Pages/Events/Events.css";
import EventViewCycling from "./ViewModal/EventViewCycling";
import EventViewPadel from "./ViewModal/EventViewPadel";

const EventViewModal = ({
  open,
  loading,
  onCancel,
  eventDetails,
  onEdit,
  onDelete,
}) => {
  console.log({ eventDetails });
  if (!eventDetails) {
    return (
      <Modal open={open} onCancel={onCancel} footer={null} centered>
        <p>There's no event this day.</p>
      </Modal>
    );
  }

  const renderByType = () => {
    switch (eventDetails.type) {
      case "cycling":
        return (
          <EventViewCycling
            event={eventDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "padel":
        return (
          <EventViewPadel
            event={eventDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      default:
        return <p>Unknown event type</p>;
    }
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width="900px"
      centered
      className="custom-event-modal"
    >
      {renderByType()}
    </Modal>
  );
};

export default EventViewModal;
