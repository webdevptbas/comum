import React, { useEffect, useRef } from "react";
import "./Event.css";
import eventVid from "../../../Videos/eventVid.mp4";
import { LinkArrow } from "../../../Icons";
import { useNavigate } from "react-router";

const Event = () => {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Setup Intersection Observer first
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playerRef.current?.playVideo();
        } else {
          playerRef.current?.pauseVideo();
        }
      },
      {
        threshold: 0.5,
      }
    );

    // Load YouTube Iframe API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    } else {
      initializePlayer();
    }

    // YouTube API callback
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    function initializePlayer() {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event) => {
            setTimeout(() => {
              observerRef.current.observe(iframeRef.current);
              playerRef.current?.playVideo(); // Start it just in case it's in view
            }, 500); // Small delay helps ensure playback
          },
        },
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "5NGrMLzMZ4w",
          controls: 0,
          playsinline: 1, // this ensures autoplay works on iOS
        },
      });
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <div className="event-container">
        <div className="event-header">
          <div className="title event-header-title">OUR COMMUNITY</div>
          {/* <div className="link">More Event</div> */}
        </div>
        <div className="event-body">
          <div className="text-container">
            <div className="title event-title">
              Move Together, Grow Together
            </div>
            <div className="subtitle event-subtitle">
              This is more than just a cycling or running club—this is a space
              where passion, movement, and connection come together. Whether
              you're hitting your first 5K run, training for a long-distance
              ride, or simply enjoying the fresh air with friends, you're
              welcome here.
              <br /> <br />
              Our community brings together runners and cyclists of all levels
              through group rides, local runs, casual meetups, and shared
              stories. It’s a place to stay motivated, discover new routes,
              exchange tips, and push each other forward—because every step or
              pedal stroke is better when shared.
              <br /> <br />
              Here, it's not about how fast or far you go—it’s about showing up,
              moving together, and growing alongside people who cheer you on.
              <br /> <br />
              So if you're looking for a crew to move with, laugh with, and grow
              with, you're in the right place.
              <br /> <br />
              Let’s go further, together.
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
            {/* <video
              src="https://youtu.be/5NGrMLzMZ4w" // Use the imported video here
              autoPlay
              muted
              loop
              playsInline
              // controls
              className="event-video"
            /> */}
            <div id="player">
              <iframe
                ref={iframeRef}
                className="event-video"
                src="https://www.youtube.com/embed/5NGrMLzMZ4w?enablejsapi=1&mute=1&loop=1&playlist=5NGrMLzMZ4w&controls=0"
                title="Event Video"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
