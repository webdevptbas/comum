import React, { useState } from "react";
import { useAuth } from "../../Util/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (user.role === "AdminProduct") {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <h3>Have a great day!</h3>
        {/* Show product stats, links, etc. */}
      </div>
    );
  }

  if (user.role === "AdminEvent") {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <h3>Have a great day!</h3>
        {/* Show event stats, calendar, etc. */}
      </div>
    );
  }

  return <div>Unauthorized</div>;
};

export default Dashboard;
