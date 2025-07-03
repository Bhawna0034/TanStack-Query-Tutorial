
"use client";
import { getPostById } from "@/app/api/api";
import { PostProps } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import React from "react";

const PostDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
  const { data, isLoading, isError } = useQuery<PostProps>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  const handleBackToPosts = () => {
    router.back();
    console.log("Back to Posts" );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-white">Something went wrong</p>;
  }
  return (
    <div>
      <h2 className="text-3xl text-white text-center underline capitalize mb-8">
        Post Id Number - {id}
      </h2>

        {data && (
          <div className="space-y-2">
            <h3 className="text-gray-400">ID: {data.id}</h3>
            <h4 className="text-gray-500">Title: {data.title} </h4>
            <p className="text-gray-500">Body: {data.body}</p>

            <button onClick={handleBackToPosts} className="mt-5 bg-green-600 px-3 py-2 rounded-lg">
              Go Back
            </button>
          </div>
        )}

    </div>
  );
};

export default PostDetailPage;
