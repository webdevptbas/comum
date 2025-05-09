import React from "react";
import "./Event.css";
import eventVid from "../../../Videos/eventVid.mp4";
import { LinkArrow } from "../../../Icons";
import { useNavigate } from "react-router";

const Event = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="event-container">
        <div className="event-header">
          <div className="title">OUR COMMUNITY</div>
          {/* <div className="link">More Event</div> */}
        </div>
        <div className="event-body">
          <div className="text-container">
            <div className="title event-title">
              Ride Together, Grow Together
            </div>
            <div className="subtitle event-subtitle">
              Join our exciting community events—group rides and local meetups
              that bring cycling enthusiasts together. Whether you're a casual
              rider or a seasoned cyclist, there's always a place for you in our
              next adventure.
            </div>
            <div
              className="link"
              onClick={() => {
                navigate("community");
              }}
            >
              See more <LinkArrow />
            </div>
          </div>
          <div className="event-video-container">
            <video
              src={eventVid} // Use the imported video here
              autoPlay
              muted
              loop
              playsInline
              // controls
              className="event-video"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
