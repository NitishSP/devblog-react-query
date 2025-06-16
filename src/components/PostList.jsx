import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postApi";
import { Link } from "react-router-dom";

export default function PostList() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <p className="text-center mt-4">Loading posts...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-4 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div className="border rounded-xl p-4 shadow hover:shadow-md transition hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
