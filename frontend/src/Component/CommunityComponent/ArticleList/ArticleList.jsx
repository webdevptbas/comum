import React, { useEffect, useState } from "react";
import "./ArticleList.css";
import { fetchAllArticle } from "../../../Util/apiService";
import { useNavigate } from "react-router";
import generateSlug from "../../../Util/GenerateSlug";
import { ArticleListLoading } from "./ArticleLoading/ArticleLoading";
import { Pagination } from "antd";

const ArticleList = ({ pageSize, showPagination }) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(article.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleArticles = showPagination
    ? article.slice(startIndex, endIndex)
    : article.slice(0, pageSize);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      try {
        setLoading(true);

        const data = await fetchAllArticle();
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        if (isMounted) {
          setArticle(sortedData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <ArticleListLoading />;
  }

  const handleClick = (event) => {
    const slug = generateSlug(event.title, event._id);
    navigate(`/community/article/${slug}`, { state: event });
  };

  return (
    <>
      {visibleArticles.map((event) => (
        <div key={event.id} className="articlelist-event-card">
          <div className="articlelist-event-info">
            <h3
              className="articlelist-event-title heading3"
              onClick={() => handleClick(event)}
            >
              {event.title}
            </h3>
            <p className="articlelist-event-date text-l-regular">
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

      {showPagination && totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={article.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            align="center"
          />
        </div>
      )}
    </>
  );
};

export default ArticleList;
