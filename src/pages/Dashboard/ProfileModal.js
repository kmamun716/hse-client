import React, { useState } from "react";
import { editUser } from "../../redux/actions/userAction";
import { refetch } from "../../redux/reducers/userSlice";

const ProfileModal = ({ userData, isOpen, dispatch }) => {
  const [editData, setEditData] = useState({
    name: userData.name,
    mobile: userData.mobile,
    district: userData.district
  });
  const handleChange = e =>{
    setEditData({
        ...editData,
        [e.target.name] : e.target.value
    });
  };
  const handleSubmit=e=>{
    e.preventDefault();
    dispatch(editUser({id:userData.id, data: editData}))
    isOpen(false);
    dispatch(refetch());
  }
  return (
    <div>
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="profile-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <div>
            <p className="text-center underline">Edit Form</p>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={userData?.name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={userData?.email || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Mobile:</span>
                </label>
                <input
                    name="mobile"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={userData?.mobile || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">District:</span>
                </label>
                <input
                  type="text"
                  name="district"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={userData?.district || ''}
                  onChange={handleChange}
                />
              </div>
              <input className="btn btn-warning my-2" type="submit" value="Update" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
