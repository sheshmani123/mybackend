import React from "react";
import "./Dasboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p className="welcome-message">Manage your activities, view analytics, and explore features!</p>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Profile</h2>
          <p>View and update your personal information.</p>
        </div>

        <div className="dashboard-card">
          <h2>Orders</h2>
          <p>Track and manage your orders seamlessly.</p>
        </div>

        <div className="dashboard-card">
          <h2>Settings</h2>
          <p>Customize your preferences and account settings.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
