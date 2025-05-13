import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import "./ArticleDetail.css";
import ErrorPage from "../../../Pages/ErrorPage";
import { fetchArticleById } from "../../../Util/apiService";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ArticleDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const id = slug.split("-").slice(-1)[0];
  const [pastEvent, setPastEvent] = useState(null);

  useEffect(() => {
    fetchArticleById(id).then(setPastEvent).catch(console.error);
  }, []);
  console.log({ pastEvent });

  if (!pastEvent) return <ErrorPage />;

  return (
    <div className="past-event-details-container">
      <div
        className="past-event-back-button"
        onClick={() => navigate("/community/article")}
      >
        <ArrowLeftOutlined />
        <div>Back</div>
      </div>
      <h1 className="event-title">{pastEvent.title}</h1>
      <p className="event-datetime">
        {new Date(pastEvent.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>

      <img
        className="event-thumbnail"
        src={pastEvent.thumbnail}
        alt={pastEvent.title}
      />

      <p className="event-short-desc">{pastEvent.shortDesc}</p>

      {pastEvent.articleSections?.map((section) => (
        <div key={section._id} className="event-article-section">
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
