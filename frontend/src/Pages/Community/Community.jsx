import React from "react";
import "./Community.css";
import CommunityCalendar from "../../Component/CommunityComponent/Calendar/Calendar";
import ArticleList from "../../Component/CommunityComponent/ArticleList/ArticleList";
import { useNavigate } from "react-router";

const CommunityPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="community-container">
        <div className="community-header">
          <h1 className="title community-title">Community</h1>
        </div>
        <div className="community-body">
          <h2 className="heading2 event-schedule-title">Event Schedule</h2>
          <CommunityCalendar />
          <div className="community-past-event">
            <h2 className="heading2 event-schedule-title">Past Event</h2>
            <h4
              className="heading4 past-event-clickable clickable"
              onClick={() => navigate("/community/article")}
            >
              See All
            </h4>
          </div>
          <ArticleList pageSize={3} showPagination={true} />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
