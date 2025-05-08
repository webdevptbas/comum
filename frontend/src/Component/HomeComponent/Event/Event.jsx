import React from "react";
import "./Event.css";
import eventVid from "../../../Videos/eventVid.mp4";
import { LinkArrow } from "../../../Icons";

const Event = () => {
  return (
    <>
      <div className="event-container">
        <div className="event-header">
          <div className="title">LATEST EVENT</div>
          {/* <div className="link">More Event</div> */}
        </div>
        <div className="event-body">
          <div className="text-container">
            <div className="title event-title">
              Pedal, Coffee, & Good Vibes: Comum x Seppi.cc Urban Cycling Ride
            </div>
            <div className="subtitle event-subtitle">
              On January 25th, Comum teamed up with @seppi.cc for an
              unforgettable urban cycling event! Riders gathered for an epic
              ride through the city, embracing the thrill of the road, strong
              camaraderie, and, of course, a well-deserved coffee break at the
              finish line. The energy was high, the legs were strong, and the
              vibes were unbeatable.
            </div>
            <div className="link">
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
