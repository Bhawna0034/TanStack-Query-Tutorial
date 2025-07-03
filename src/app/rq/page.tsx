"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPost, deletePostById, getPosts, updatePostById } from "../api/api";
import { PostProps } from "../lib/types";
import Link from "next/link";
import NewPost from "../_components/NewPost";

const FETCHRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<PostProps[]>({
    queryKey: ["posts", pageNumber],
    queryFn: () => getPosts(pageNumber),
    // staleTime: 3000,
    // gcTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePostById(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData<PostProps[]>(
        ["posts", pageNumber],
        (currentElement) => {
          if (!currentElement) return [];
          return currentElement.filter((post) => post.id !== id);
        }
      );
    },
  });

  const createMutation = useMutation<PostProps, Error, PostProps>({
    mutationFn: createPost,
    onSuccess: (post) => {
      queryClient.setQueryData<PostProps[]>(
        ["posts", pageNumber], (oldPosts) => {
          if (!oldPosts) return [post];
          return [post, ...oldPosts]
        }
      )
    }
    
  })

const updateMutation = useMutation({
  mutationFn: ({ id, updates }: { id: number; updates: Partial<PostProps> }) =>
    updatePostById(id, updates),
  onSuccess: (response, { id }) => {
    queryClient.setQueryData<PostProps[]>(["posts", pageNumber], (postData) =>
      postData?.map((post) =>
        post.id === id ? { ...post, ...response.data } : post
      )
    );
  },
});

  // const handleDeletePost = (id: number) => {
  //   console.log("Delete Post: ", id);
  // }
  const handleNext = () => {
    setPageNumber((prev) => prev + 3);
  };

  const handlePrev = () => {
    setPageNumber((prev) => prev - 3);
  };

  const handleAddPost = () => {
    setIsVisible(true);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-white">Something went wrong</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold">Hello FetchRQ</h2>

        <button
          onClick={handleAddPost}
          className="bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg"
        >
          Add Post
        </button>
      </div>

      {isVisible ? (
        <NewPost 
            setIsVisible={setIsVisible}
            createMutation={createMutation}/>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {data?.map((post) => (
              <li
                key={post.id}
                className="p-2 border-l-2 border-gray-200 bg-gray-600"
              >
                <Link href={`/rq/${post.id}`}>
                  <h3>
                    {post.id}.<span className="ml-2">{post.title}</span>
                  </h3>
                  <p className="mb-4">{post.body}</p>
                </Link>
                <div className="flex items-center gap-4">
                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
                 <button
                  onClick={() => updateMutation.mutate({
                    id: post.id,
                    updates: {title: "Updated Title"},
                  })
                }
                  className="bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg"
                >
                  Update
                </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-8 mt-5 mb-3">
            <button
              onClick={handlePrev}
              disabled={pageNumber === 0}
              className={`px-3 py-2 rounded-lg bg-green-600 ${
                pageNumber === 0
                  ? "cursor-not-allowed"
                  : " hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer"
              }`}
            >
              Prev
            </button>
            <p className="text-lg text-white">{pageNumber / 3}</p>
            <button
              onClick={handleNext}
              className="bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FETCHRQ;
