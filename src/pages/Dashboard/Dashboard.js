import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-base-100 text-base-content">
            <li>
              {" "}
              <Link to="/dashboard">Profile</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/dashboard/create-post">Write A Post</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/dashboard/my-posts">Posts</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/dashboard/training">Training</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/dashboard/notice">Notice Board</Link>{" "}
            </li>
            {/* admin area */}
            <li>
              <Link to="/dashboard/allUser">User List</Link>
            </li>
            <li>
              <div className="indicator">
                <span className="indicator-item badge">
                  99+
                </span>
                <Link to="/dashboard/pending-user">Pending User</Link>
              </div>
            </li>
            <li>
            <div className="indicator">
                <span className="indicator-item badge badge-secondary">
                  99+
                </span>
              <Link to="/dashboard/pending-post">Pending Post</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
