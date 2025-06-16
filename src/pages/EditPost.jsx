import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById, updatePost } from "../api/postApi";
import { useState, useEffect } from "react";

export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["post", updatedPost.id], updatedPost);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/posts/${updatedPost.id}`);
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    mutate({ id: postId, title, body });
  };

  if (isLoading) return <p className="text-center mt-4">Loading post...</p>;

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-4 rounded-xl shadow max-w-2xl mx-auto my-6"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        className="w-full p-2 mb-3 border rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Post"}
      </button>
    </form>
  );
}
