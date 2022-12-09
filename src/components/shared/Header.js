import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/reducers/authSlice";

const Header = () => {
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut=()=>{
    dispatch(logOut());
    navigate('/login')
  }
  const navMenu = (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/who-we-are">Who We Are</Link>
      </li>
      <li>
        <Link to='/mission'>Our Misson</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );
  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
            <li>
              <Link to="/login">Login</Link>
            </li>
              {navMenu}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            HSE
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{navMenu}</ul>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-end">
          {token ? <p className="btn btn-ghost" onClick={handleLogOut}>Logout</p> : <p><Link className="text-purple-500" to="/login">Member Login</Link> or <Link className="text-red-400" to="/register">Get Membership</Link></p>}
        </div>
      </div>
    </header>
  );
};

export default Header;

/**
 * for drop down
 * <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
 */
