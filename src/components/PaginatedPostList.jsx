import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPosts } from "../api/postApi";
import { Link } from "react-router-dom";

export default function PaginatedPostList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["paginatedPosts"],
    queryFn: getPaginatedPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold my-4">Paginated Posts</h2>

      {data.pages.map((page) =>
        page.data.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div className="border p-4 rounded mb-4 hover:bg-gray-100 transition">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
            </div>
          </Link>
        ))
      )}

      <div className="text-center mt-6">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}

        {!hasNextPage && <p className="mt-4 text-gray-500">No more posts</p>}
      </div>
    </div>
  );
}
