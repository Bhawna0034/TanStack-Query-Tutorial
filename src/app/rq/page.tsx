"use client"
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "../api/api";
import { PostProps } from "../lib/types";

const FETCHRQ = () => {
  const { data } = useQuery<PostProps[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return(
    <div>
      <h2 className="mb-6">Hello FetchRQ</h2>
      <ul className='flex flex-col gap-2'>
        {data?.map((post) => (
          <li key={post.id} className='border-l-2 border-gray-200 bg-gray-500'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  ) 
};

export default FETCHRQ;
