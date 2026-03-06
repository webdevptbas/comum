import React from "react";
import "../Calendar.css";
import { FaLongArrowAltRight, FaRegClock } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { IoSpeedometerOutline, IoPersonOutline } from "react-icons/io5";

const EventViewCycling = ({ event }) => {
  const { cycling } = event;
  console.log({ event });

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
            <h2 className="heading3 event-modal-title">{event.title}</h2>

            <p className="text-l-regular event-modal-date">
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p className="text-l-regular event-modal-time">
              <FaRegClock /> {event.startTime}
            </p>

            {event?.cycling?.start && (
              <p className="text-l-regular event-modal-location">
                <LuMapPin /> {cycling.start} <FaLongArrowAltRight />{" "}
                {cycling.finish}
              </p>
            )}

            {event.location && (
              <p className="text-l-regular event-modal-location">
                <LuMapPin /> {event.location} <FaLongArrowAltRight />{" "}
                {event.address}
              </p>
            )}

            {event?.cycling?.paceMin && (
              <p className="text-l-regular event-modal-pace">
                <IoSpeedometerOutline /> {cycling.paceMin}
                {cycling.paceMax && cycling.paceMax !== cycling.paceMin
                  ? ` – ${cycling.paceMax}`
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

            <p className="text-l-regular event-modal-time">
              <IoPersonOutline /> {event.contactPerson}
            </p>
          </div>
        </div>

        <p className="text-l-regular event-modal-description">
          {event.shortDesc}
        </p>

        {event.additionalDetail && (
          <p className="text-l-regular event-modal-additional">
            {event.additionalDetail}
          </p>
        )}

        <div className="event-modal-actions">
          <a
            className="event-modal-contact-person"
            href={`https://wa.me/${event.contactInfo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-button-regular join-btn">
              Contact Person
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventViewCycling;
