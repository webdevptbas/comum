import React from "react";
import { FaLongArrowAltRight, FaRegClock } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { IoSpeedometerOutline, IoPersonOutline } from "react-icons/io5";
import "../../../Pages/Events/Events.css";

const EventViewCycling = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-modal-content">
      <div className="event-modal-grid">
        <div className="event-modal-header">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="event-modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800x400";
            }}
          />

          <div className="event-modal-details">
            <h2 className="event-modal-title">{event.title}</h2>

            <p className="event-modal-date">
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p className="event-modal-time">
              <FaRegClock /> {event.startTime}
            </p>

            {event?.cycling?.start && (
              <p className="event-modal-location">
                <LuMapPin /> {event?.cycling?.start} <FaLongArrowAltRight />{" "}
                {event?.cycling?.finish}
              </p>
            )}

            {event.location && (
              <p className="text-l-regular event-modal-location">
                <LuMapPin /> {event.location} <FaLongArrowAltRight />{" "}
                {event.address}
              </p>
            )}

            {event?.cycling?.paceMin && (
              <p className="event-modal-pace">
                <IoSpeedometerOutline /> {event?.cycling?.paceMin}
                {event?.cycling?.paceMax &&
                event?.cycling?.paceMax !== event?.cycling?.paceMin
                  ? ` – ${event?.cycling?.paceMax}`
                  : ""}{" "}
                kph
              </p>
            )}

            {event.paceMin && (
              <p className="text-l-regular event-modal-pace">
                <IoSpeedometerOutline /> {event.paceMin}
                {event.paceMax && event.paceMax !== event.paceMin
                  ? ` – ${event.paceMax}`
                  : ""}{" "}
                kph
              </p>
            )}

            <p className="event-modal-time">
              <IoPersonOutline /> {event.contactPerson}
            </p>
          </div>
        </div>

        <div className="event-modal-descriptions">
          <p className="event-modal-description">{event.shortDesc}</p>
          {event.description && (
            <p className="event-modal-additional">{event.description}</p>
          )}
          {event.additionalDetail && (
            <p className="event-modal-additional">{event.additionalDetail}</p>
          )}
        </div>

        <div className="event-modal-actions">
          <button className="edit-modal-btn" onClick={() => onEdit(event)}>
            Edit Event
          </button>
          <button
            className="delete-modal-btn"
            onClick={() => onDelete(event._id)}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventViewCycling;
