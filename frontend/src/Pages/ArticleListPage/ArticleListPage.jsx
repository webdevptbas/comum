// ArticleListPage.jsx
import React from "react";
import "./ArticleListPage.css"; // Create this new CSS file for standalone layout
import ArticleList from "../../Component/CommunityComponent/ArticleList/ArticleList";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ArticleListPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="articlelist-page-container">
      <div
        className="past-event-back-button"
        onClick={() => navigate("/community")}
      >
        <ArrowLeftOutlined />
        <div>Back</div>
      </div>
      <h1 className="title articlelist-page-title">Articles</h1>
      <div className="articlelist-page-content">
        <ArticleList />
      </div>
    </div>
  );
};

export default ArticleListPage;
