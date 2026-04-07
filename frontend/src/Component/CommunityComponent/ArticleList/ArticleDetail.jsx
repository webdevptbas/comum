import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ArticleDetail.css";
import ErrorPage from "../../../Pages/ErrorPage";
import { fetchArticleById } from "../../../Util/apiService";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ArticleDetailLoading } from "./ArticleLoading/ArticleLoading";

const ArticleDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const id = slug.split("-").slice(-1)[0];
  const [pastEvent, setPastEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchArticleById(id);

        if (!data) {
          setNotFound(true);
          return;
        }

        if (isMounted) {
          setPastEvent(data);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <ArticleDetailLoading />;
  }

  // 2️⃣ NOT FOUND
  if (notFound || !pastEvent) {
    return <ErrorPage />;
  }

  return (
    <div className="past-event-details-container">
      <div
        className="past-event-back-button"
        onClick={() => navigate("/community/article")}
      >
        <ArrowLeftOutlined />
        <div>Back to All Articles</div>
      </div>
      <h3 className="article-event-title heading3">{pastEvent.title}</h3>
      <p className="event-datetime text-l-regular">
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

      <p className="event-short-desc text-l-regular">{pastEvent.shortDesc}</p>

      {pastEvent.articleSections?.map((section) => (
        <div key={section._id} className="event-article-section">
          <h3 className="heading3">{section.heading}</h3>
          <p className="text-l-regular">{section.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
