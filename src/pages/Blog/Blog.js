import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import Loading from '../../components/shared/Loading';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  const { data: posts, isLoading } = useQuery(["posts"], async () => {
    const res = await fetch("http://localhost:4000/api/v1/post/all");
    return await res.json();
  });
  const indexOfLastRecord = currentPage * postPerPage;
  const indexOfFirstRecord = indexOfLastRecord - postPerPage;
  const currentRecords = posts?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(posts?.length / postPerPage);
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <div className="flex justify-around">
        <h2 className="text-xl text-center underline">Our Blog</h2>
        <div className="flex items-center">
          <p>Show Post Per Page</p>
          <div className="form-control w-20 max-w-xs mx-2">
            <select onChange={(e) => setPostPerPage(e.target.value)} className="select select-bordered">
              <option disabled value={postPerPage}>Select One</option>
              <option value='6'>6</option>
              <option value='12'>12</option>
              <option value='15'>15</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-3 my-2">
        {currentRecords?.map((post) => (
          <div key={post?.id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img width="100px" src={post?.photo} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post?.title}</h2>
              <p>{post?.content.slice(0, 60)}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/post/${post?.title.replace(/\s+/g, "-")}`}
                  className="btn btn-primary"
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Paginate
          nPages={nPages + 1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Blog;
