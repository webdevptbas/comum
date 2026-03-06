import React from "react";
import "./Event.css";
import { LinkArrow } from "../../../Icons";
import { useNavigate } from "react-router";
import eventVid from "../../../Videos/eventVid.mp4";
import padelVid from "../../../Videos/padelVid.mp4";

const Event = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="event-container">
        <div className="event-header">
          <div className="title event-header-title">OUR COMMUNITY</div>
          {/* <div className="link">More Event</div> */}
        </div>
        <div className="event-body">
          <div className="text-container">
            <div className="heading2 event-title">
              Move Together, Grow Together
            </div>
            <div className="text-l-regular event-subtitle">
              Welcome to a space where everyone can grow, from first time riders
              and new padel players to experienced cyclists and seasoned
              athletes looking for a strong community to move with.
              <br /> <br />
              Our rides and padel sessions are designed to be accessible for
              beginners, yet still engaging for those seeking challenge,
              progression, and shared momentum. Whether you're learning your
              first pedal stroke or pushing your limits on the court, you’ll
              find people who support your journey and match your energy.
              <br /> <br />
              This is where experience meets openness. A place to discover new
              routes, join social rides, enjoy friendly matches, sharpen your
              skills, and connect with others who share the same passion for
              movement and an active lifestyle.
              <br /> <br />
              If you’re looking for a community that welcomes newcomers,
              appreciates experience, and believes that we grow better together,
              this is the place.
              <br /> <br />
              Let’s go further, together.
            </div>
            <div
              className="link text-button-regular"
              onClick={() => {
                navigate("community");
              }}
            >
              See more <LinkArrow />
            </div>
          </div>
          <div className="event-video-container">
            <video width="100%" autoPlay loop muted>
              <source src={eventVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video
              width="100%"
              autoPlay
              loop
              muted
              style={{ marginTop: "10px" }}
            >
              <source src={padelVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
