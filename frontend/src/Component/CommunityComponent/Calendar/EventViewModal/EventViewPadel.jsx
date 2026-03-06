import React from "react";
import "../Calendar.css";
import { FaRegClock } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { IoPersonOutline, IoStarOutline } from "react-icons/io5";
import { GiTennisCourt } from "react-icons/gi";

const EventViewPadel = ({ event }) => {
  const { padel } = event;

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
            <div className="event-modal-details-wrapper">
              <div className="left-side">
                <p className="event-modal-time">
                  <FaRegClock /> {event.startTime}
                </p>
                <p className="event-modal-location">
                  <LuMapPin /> {padel.location}
                </p>
                <p className="event-modal-time">
                  <IoPersonOutline /> {event.contactPerson}
                </p>
              </div>

              <div className="right-side">
                <p className="event-modal-time">
                  <GiTennisCourt />
                  {padel.court} Court(s)
                </p>

                <p className="event-modal-time">
                  <IoStarOutline />
                  {padel.level}
                </p>

                <p className="event-modal-time">
                  {padel.matchFormat} · {padel.partnerType}
                </p>
              </div>
            </div>
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

export default EventViewPadel;
