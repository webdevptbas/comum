import React from "react";
import { Skeleton } from "antd";
import "./ArticleLoading.css";

function ArticleListLoading({ count = 3 }) {
  return (
    <div className="article-list-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="article-skeleton-item"
          style={{ display: "flex", flex: "1" }}
        >
          <Skeleton
            active
            title={{ width: "60%" }}
            paragraph={{ rows: 3, width: ["100%", "100%", "100%"] }}
            className="list-skeleton"
          />
          <Skeleton.Image
            active
            style={{ height: 200 }}
            className="list-image-skeleton"
          />
        </div>
      ))}
    </div>
  );
}

function ArticleDetailLoading() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "4rem" }}
      >
        {/* Title */}
        <Skeleton.Input
          active
          size="large"
          style={{ width: "70%", height: 36 }}
          className="article-skeleton"
        />

        {/* Meta */}
        <Skeleton.Input
          active
          size="small"
          style={{ width: 200 }}
          className="article-skeleton"
        />

        {/* Hero Image */}
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: 280,
          }}
          className="article-skeleton"
        />
      </div>

      {/* Article body */}
      <Skeleton
        active
        paragraph={{
          rows: 6,
          width: ["100%", "95%", "100%", "90%", "100%", "85%"],
        }}
        title={false}
      />

      <div style={{ marginTop: 24 }}>
        <Skeleton
          active
          paragraph={{
            rows: 4,
            width: ["100%", "100%", "95%", "80%"],
          }}
          title={false}
        />
      </div>
    </div>
  );
}

export { ArticleListLoading, ArticleDetailLoading };
