import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../components/shared/Loading";

const MyPosts = () => {
  const token = localStorage.getItem("authToken");
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts"], () =>
    fetch("http://localhost:4000/api/v1/post/allPostOfUser", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  );
  console.log(posts);
  if (isLoading) {
    return <Loading />;
  }
  error && console.log(error);
  const pending = posts?.filter((post) => post.status === "pending");
  const published = posts?.filter((post) => post.status === "published");
  return (
    <div className="">
      <div>
        <h2>Post Summery:</h2>
        <h3>Total {posts?.length} no of Post created</h3>
        <p>Pending: {pending?.length} no</p>
        <p>Published: {published?.length} no</p>
      </div>
      <div>
        <h3 className="text-center underline text-2xl mb-2">My Posts:</h3>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {
            posts?.map(post=><div key={post?.id} className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img width='150px' src={post?.photo} alt={post?.title} /></figure>
            <div className="card-body">
              <h2 className="card-title">{post?.title}</h2>
              <p>{post?.content.slice(0, 50)}</p>
              <div className="card-actions justify-end">
                {post?.content.length>50 && <button className="btn btn-xs btn-primary">See More</button>}
              </div>
            </div>
          </div>)
        }
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
