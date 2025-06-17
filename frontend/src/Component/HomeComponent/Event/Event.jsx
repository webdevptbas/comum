import React, { useEffect, useRef } from "react";
import "./Event.css";
import eventVid from "../../../Videos/eventVid.mp4";
import { LinkArrow } from "../../../Icons";
import { useNavigate } from "react-router";
import useMediaQuery from "../../../Util/useMediaQuery";

const Event = () => {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const observerRef = useRef(null);
  const playerReadyRef = useRef(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      } else {
        initializePlayer();
      }

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    };

    const initializePlayer = () => {
      if (playerRef.current) return; // Prevent multiple initializations

      playerRef.current = new window.YT.Player("event-player", {
        height: "100%",
        width: "100%",
        videoId: "5NGrMLzMZ4w",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "5NGrMLzMZ4w",
          controls: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;

            const iframe = document
              .getElementById("event-player")
              .querySelector("iframe");

            if (iframe && observerRef.current) {
              observerRef.current.observe(iframe);
            }

            playerRef.current.playVideo();
          },
        },
      });
    };

    // Create observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (
            playerReadyRef.current &&
            typeof playerRef.current?.playVideo === "function"
          ) {
            playerRef.current.playVideo();
          }
        } else {
          if (
            playerReadyRef.current &&
            typeof playerRef.current?.pauseVideo === "function"
          ) {
            playerRef.current.pauseVideo();
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    loadYouTubeAPI();

    return () => {
      // Cleanup on unmount
      observerRef.current?.disconnect();
      playerRef.current?.destroy?.();
      playerRef.current = null;
      playerReadyRef.current = false;
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
            <div className="heading2 event-title">
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
            {/* <div id="player">
              <iframe
                ref={iframeRef}
                className="event-video"
                src="https://www.youtube.com/embed/5NGrMLzMZ4w?enablejsapi=1&mute=1&loop=1&playlist=5NGrMLzMZ4w&controls=0"
                title="Event Video"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div> */}
            <div id="event-player" className="event-video" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
