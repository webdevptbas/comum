import React from "react";
import "./Community.css";
import CommunityCalendar from "../../Component/CommunityComponent/Calendar/Calendar";
import ArticleList from "../../Component/CommunityComponent/ArticleList/ArticleList";

const CommunityPage = () => {
  return (
    <>
      <div className="community-container">
        <div className="community-header">
          <h1 className="title community-title">Community</h1>
        </div>
        <div className="community-body">
          <h2 className="title event-schedule-title">Event Schedule</h2>
          <CommunityCalendar />
          <h2 className="title event-schedule-title">Article</h2>
          <ArticleList />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
