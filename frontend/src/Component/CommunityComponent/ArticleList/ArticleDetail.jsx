import React from "react";
import { useParams } from "react-router";

const ArticleDetails = ({ pastEvent }) => {
  const formattedDate = dayjs(pastEvent.date).format("D MMMM YYYY");
  const formattedTime = dayjs(
    `${pastEvent.date.split("T")[0]}T${pastEvent.startTime}`
  ).format("HH:mm");

  return (
    <div className="past-event-details-container">
      <h1 className="event-title">{pastEvent.title}</h1>
      <p className="event-datetime">
        {formattedDate} • {formattedTime}
      </p>

      <img
        className="event-thumbnail"
        src={pastEvent.thumbnail}
        alt={pastEvent.title}
      />

      <p className="event-short-desc">{pastEvent.shortDesc}</p>

      {pastEvent.articleSections.map((section) => (
        <div key={section._id} className="event-article-section">
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
