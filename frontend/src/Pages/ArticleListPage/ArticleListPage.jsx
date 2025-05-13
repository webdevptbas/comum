// ArticleListPage.jsx
import React from "react";
import "./ArticleListPage.css"; // Create this new CSS file for standalone layout
import ArticleList from "../../Component/CommunityComponent/ArticleList/ArticleList";

const ArticleListPage = () => {
  return (
    <div className="articlelist-page-container">
      <h1 className="title articlelist-page-title">Articles</h1>
      <div className="articlelist-page-content">
        <ArticleList />
      </div>
    </div>
  );
};

export default ArticleListPage;
