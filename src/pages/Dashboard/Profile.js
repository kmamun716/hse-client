import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  console.log(message)
  return (
    <div>
      <img src="" alt={user?.name} />
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Mobile: {user?.mobile}</p>
      <p>District: {user?.district}</p>
      <label onClick={() => setModalOpen(true)} htmlFor="profile-modal" className="btn btn-info">Edit</label>
       { isModalOpen && <ProfileModal userData={user} isOpen={setModalOpen} dispatch={dispatch}/>}
    </div>
  );
};

export default Profile;
