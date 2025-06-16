import React from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">
        DevBlog - Post List
      </h1>
      <PostForm />
      <PostList />
      
    </div>
  );
}
