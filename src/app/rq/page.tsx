"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "../api/api";
import { PostProps } from "../lib/types";

const FETCHRQ = () => {
  const { data, isLoading, error } = useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 3000,
    gcTime: 5000,
  });

  if (isLoading){
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if(error){
    return <p className="text-center text-white">Something went wrong</p>
  }

  return (
    <div>
      <h2 className="mb-6">Hello FetchRQ</h2>
      <ul className="flex flex-col gap-2">
        {data?.map((post) => (
          <li key={post.id} className="border-l-2 border-gray-200 bg-gray-500">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FETCHRQ;
