import React from "react";
import { Modal } from "antd";
import "../../Pages/Events/Events.css";

const EventViewModal = ({
  open,
  loading,
  onCancel,
  eventDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width="840px"
      centered
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
                    : `–${eventDetails.paceMax}`}{" "}
                  kph
                </p>
                <p className="event-modal-time">
                  👤 {eventDetails.contactPerson}
                </p>
              </div>
            </div>
            <div className="event-modal-descriptions">
              <p className="event-modal-description">
                {eventDetails.shortDesc}
              </p>
              {eventDetails.description && (
                <p className="event-modal-additional">
                  {eventDetails.description}
                </p>
              )}
              {eventDetails.additionalDetail && (
                <p className="event-modal-additional">
                  {eventDetails.additionalDetail}
                </p>
              )}
            </div>

            <div className="event-modal-actions">
              <button
                className="edit-modal-btn"
                onClick={() => onEdit(eventDetails)}
              >
                Edit Event
              </button>
              <button
                className="delete-modal-btn"
                onClick={() => onDelete(eventDetails._id)}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>There's no event this day.</p>
      )}
    </Modal>
  );
};

export default EventViewModal;
