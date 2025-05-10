import React, { useEffect, useState } from "react";
import "./ArticleList.css";
import { fetchAllArticle } from "../../../Util/apiService";

const ArticleList = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchAllArticle();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadArticle();
  }, []);

  return (
    <>
      {article.map((event) => (
        <div key={event.id} className="articlelist-event-card">
          <div className="articlelist-event-info">
            <p className="articlelist-event-date">
              {new Date(event.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <h3 className="articlelist-event-title title">{event.title}</h3>
            <p className="articlelist-event-description">{event.shortDesc}</p>
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
