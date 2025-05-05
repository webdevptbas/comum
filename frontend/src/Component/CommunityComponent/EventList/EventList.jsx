import React from "react";
import "./EventList.css";

const events = [
  {
    id: 1,
    date: "5 April 2025, 06:30",
    title: "Sunrise Ride & Brew: Comum x Castelli Morning Escape",
    description:
      "Start your weekend right with an early morning ride! Join Comum and Castelli for a scenic sunrise cycling session followed by freshly brewed coffee at our flagship store. Whether you're here for the ride, the coffee, or the community, this is an event you don’t want to miss!",
    image: "/images/event1.jpg",
  },
  {
    id: 2,
    date: "18 March 2025, 17:00",
    title: "Gravel & Grind: Comum x Shimano Adventure Ride",
    description:
      "Ready to get a little dirty? Comum teams up with Shimano for a thrilling gravel ride through scenic off-road trails. Expect rough terrain, technical challenges, and an epic post-ride gathering with drinks and stories to share. Let’s push limits and embrace the adventure!",
    image: "/images/event2.jpg",
  },
  {
    id: 3,
    date: "10 February 2025, 19:30",
    title: "Night Spin & Social: Comum x Pirelli Twilight Ride",
    description:
      "Experience the city lights like never before! Comum and Pirelli bring you a relaxed night ride through urban streets, blending smooth roads with stunning cityscapes. After the ride, join us for an exclusive hangout session with great coffee and even better company.",
    image: "/images/event3.jpg",
  },
];

const EventList = () => {
  return (
    <>
      {events.map((event) => (
        <div key={event.id} className="eventlist-event-card">
          <div className="eventlist-event-info">
            <p className="eventlist-event-date">{event.date}</p>
            <h3 className="eventlist-event-title">{event.title}</h3>
            <p className="eventlist-event-description">{event.description}</p>
          </div>
          <img
            src={event.image}
            alt={event.title}
            className="eventlist-event-image"
          />
        </div>
      ))}
    </>
  );
};

export default EventList;
