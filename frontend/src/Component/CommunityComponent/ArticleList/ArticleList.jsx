import React, { useEffect, useState } from "react";
import "./ArticleList.css";
import { fetchAllArticle } from "../../../Util/apiService";
import { useNavigate } from "react-router";
import generateSlug from "../../../Util/GenerateSlug";

const ArticleList = () => {
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchAllArticle();
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setArticle(sortedData);
      } catch (err) {
        console.error(err);
      }
    };

    loadArticle();
  }, []);

  const handleClick = (event) => {
    const slug = generateSlug(event.title, event._id);
    navigate(`/community/article/${slug}`, { state: event });
  };

  return (
    <>
      {article.map((event) => (
        <div key={event.id} className="articlelist-event-card">
          <div className="articlelist-event-info">
            <h3
              className="articlelist-event-title heading3"
              onClick={() => handleClick(event)}
            >
              {event.title}
            </h3>
            <p className="articlelist-event-date">
              {new Date(event.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p className="articlelist-event-description text-l-regular">
              {event.shortDesc}
            </p>
          </div>
          <img
            src={event.thumbnail}
            alt={event.title}
            className="articlelist-event-image"
          />
        </div>
      ))}
    </>
  );
};

export default ArticleList;
