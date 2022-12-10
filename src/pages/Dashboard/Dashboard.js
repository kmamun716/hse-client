import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { getSingleUser } from "../../redux/actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getSingleUser());
  }, [dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          <h3 className="text-xl">Welcome <span className="text-lime-500">{user?.name}</span> to your dashboard</h3>
          <p>You are one of <span className="text-orange-500">{user?.role}</span> of this site</p>
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
            {user?.role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/allUser">User List</Link>
                </li>
                <li>
                  <div className="indicator">
                    <span className="indicator-item badge">99+</span>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
