import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import setAuthToken from "../../lib/setAuthToken";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const authToken = localStorage.getItem("authToken");
  const [photo, setPhoto] = useState(null);
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", photo);
    fetch(
      "https://api.imgbb.com/1/upload?key=1b6521bd0bd67a12328f7f6c0e209344",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setAuthToken(authToken);
        if (result.success) {
          if (!postData.title || !postData.content) {
            toast.error("title or post not be empty");
          } else {
            axios
              .post("http://localhost:4000/api/v1/post/create", {
                ...postData,
                photo: result.data.url,
              })
              .then((post) => {
                toast.success(post.data.message);
                setPostData({ title: "", content: "" });
                e.target.reset();
              });
          }
        } else {
          toast.error("There have some error");
        }
      });
  };
  return (
    <div>
      <h2 className="text-xl text-center underline">Create Post</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Post Title:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="title"
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* content input area */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Write Your Post</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write Post Here"
              name="content"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose Post Avator</span>
            </label>
            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <input className="mt-2 btn btn-accent" type="submit" value="Post" />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
