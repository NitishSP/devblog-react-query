import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/postApi";

export default function PostForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, body });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow max-w-2xl mx-auto my-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add New post</h2>
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Post"}
      </button>

      {isSuccess && (
        <p className="text-green-600 mt-2">Post added successfully!</p>
      )}

      {isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
    </form>
  );
}
