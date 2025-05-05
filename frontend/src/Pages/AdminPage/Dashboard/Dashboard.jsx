import React from "react";
import { useAuth } from "../../../Util/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (user.role === "AdminProduct") {
    return (
      <div>
        <h1>Product Admin Dashboard</h1>
        {/* Show product stats, links, etc. */}
      </div>
    );
  }

  if (user.role === "AdminEvent") {
    return (
      <div>
        <h1>Event Admin Dashboard</h1>
        {/* Show event stats, calendar, etc. */}
      </div>
    );
  }

  return <div>Unauthorized</div>;
};

export default Dashboard;
