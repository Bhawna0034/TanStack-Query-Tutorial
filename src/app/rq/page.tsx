"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchPosts } from "../api/api";
import { PostProps } from "../lib/types";
import Link from "next/link";

const FETCHRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, error } = useQuery<PostProps[]>({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    // staleTime: 3000,
    // gcTime: 5000,
    refetchInterval: 1000,
    refetchIntervalInBackground:true
  });

  const handleNext = () => {
    setPageNumber((prev) => prev + 3 );
  }

  const handlePrev = () => {
    setPageNumber((prev) => prev - 3);
  }
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
          <li key={post.id} className="p-2 border-l-2 border-gray-200 bg-gray-500">
            <Link href={`/rq/${post.id}`}>
            <h3>{post.id}.<span className="ml-2">{post.title}</span></h3>
            <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-8 mt-5 mb-3">
        <button 
              onClick={handlePrev}
              disabled={pageNumber === 0}
              className={`px-3 py-2 rounded-lg bg-green-600 ${pageNumber === 0 ? "cursor-not-allowed": " hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer" }`}>Prev
        </button>
         <p className="text-lg text-white">{pageNumber / 3}</p>
        <button 
              onClick={handleNext} 
              className=" bg-green-600 hover:bg-emerald-700 focus:scale-[1.02] cursor-pointer px-3 py-2 rounded-lg">Next
        </button>
      </div>
    </div>
  );
};

export default FETCHRQ;
