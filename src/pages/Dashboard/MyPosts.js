import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import Loading from "../../components/shared/Loading";

const MyPosts = () => {
  const token = localStorage.getItem("authToken");
  const [select, setSelect] = useState('all');
  const [showPost, setShowPost] = useState([]);
  //pagination concept
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const handleChange = (e) => {
    setSelect(e.target.value)
  };
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts"], async () => {
    const res = await fetch("http://localhost:4000/api/v1/post/allPostOfUser", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return await res.json()
  }
  );
  const indexOfLastRecord = currentPage * postPerPage;
  const indexOfFirstRecord = indexOfLastRecord - postPerPage;
  const currentRecords = showPost?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(showPost?.length / postPerPage);
  error && console.log(error);
  const pending = posts?.filter((post) => post.status === "pending");
  const published = posts?.filter((post) => post.status === "published");
  useEffect(() => {
    if (select === "all") {
      setShowPost(posts)
    }
    if (select === 'published') {
      setShowPost(published)
    }
    if (select === 'pending') {
      setShowPost(pending)
    }
  }, [select, posts])

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <div>
        <h2>Post Summery:</h2>
        <h3>Total {posts?.length} no of Post created</h3>
        <p>Pending: {pending?.length} no</p>
        <p>Published: {published?.length} no</p>
      </div>
      <div>
        <div className="flex justify-around mb-5">
          <h3 className="text-center underline text-2xl mb-2">My Posts:</h3>
          <div className="flex items-center">
          <p>Filter By</p>
          <div className="form-control w-29 max-w-xs mx-2">
            <select onChange={handleChange} className="select select-bordered">
              <option disabled value={select}> Choose an Option </option>
              <option value='all'>All</option>
              <option value='published'>Published</option>
              <option value='pending'>Pending</option>
            </select>
          </div>
          </div>
          <div className="flex justify-around">
            <div className="flex items-center">
              <p>Show Post Per Page</p>
              <div className="form-control w-20 max-w-xs mx-2">
                <select onChange={(e) => setPostPerPage(e.target.value)} className="select select-bordered">
                  <option disabled value={postPerPage}>Select One</option>
                  <option value='6'>6</option>
                  <option value='9'>9</option>
                  <option value='12'>12</option>
                </select>
              </div>
            </div>
          </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {currentRecords?.length <= 0 ? <p className="text-2xl text-center text-amber-700">Not Have Any Post</p> : currentRecords?.map((post) => (
              <div
                key={post?.id}
                className="card card-compact w-96 bg-base-100 shadow-xl"
              >
                <figure>
                  <img width="150px" src={post?.photo} alt={post?.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{post?.title}</h2>
                  <p>{post?.content.slice(0, 50)}</p>
                  <p>
                    status:{" "}
                    <span
                      className={
                        post?.status === "published"
                          ? "text-green-500"
                          : "text-yellow-400"
                      }
                    >
                      {post?.status}
                    </span>
                  </p>
                  <div className="card-actions justify-end"> <Link to={`/post/${post?.title.replace(/\s+/g, '-')}`} className="btn btn-xs btn-primary">See More</Link> </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Paginate
            nPages={nPages + 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      );
};

      export default MyPosts;
