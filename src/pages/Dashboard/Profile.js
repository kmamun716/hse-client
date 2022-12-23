import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="flex items-end">
          <img
            className="w-24 rounded"
            src={
              user?.photo
                ? user.photo
                : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
            }
            alt={user?.name}
          />{" "}
          <span className="btn btn-xs btn-accent">Change Photo</span>
        </div>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Mobile: {user?.mobile}</p>
        <p>District: {user?.district}</p>
        <label
          onClick={() => setModalOpen(true)}
          htmlFor="profile-modal"
          className="btn btn-info"
        >
          Edit
        </label>
      </div>
      {isModalOpen && (
        <ProfileModal
          userData={user}
          isOpen={setModalOpen}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Profile;
