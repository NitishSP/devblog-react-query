import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api/postApi";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/postApi";
import { useNavigate } from "react-router-dom";

export default function PostDetails() {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId, // Only run the query if postId is available
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  if (isLoading) {
    return <p className="text-center mt-4">Loading post...</p>;
  }
  if (isError) {
    return <p className="text-center mt-4 text-red-500">Error loading post</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
      <Link
        to={`/posts/${post.id}/edit`}
        className="inline-block mt-4 text-blue-600 underline"
      >
        Edit This Post
      </Link>

      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this post?")) {
            deleteMutate(post.id);
          }
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  );
}
