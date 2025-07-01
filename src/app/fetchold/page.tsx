"use client"
import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/api';
import { PostProps } from '../lib/types';

const FETCHOLD = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const getPosts = async() => {
      try{
       const response = await fetchPosts();
       if(response.status !== 200){
        console.log("Failed to get values");
       };
       setPosts(response.data);
      } catch(error){
        console.log("Error: ", error);
      }
    }
    getPosts();
  }, [])
  return (
    <div className='space-y-3'>
      <h2>Hello FetchOld</h2>
      <ul className='flex flex-col gap-2'>
        {posts.map((post) => (
          <li key={post.id} className='border-l-2 border-gray-100 bg-gray-500'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FETCHOLD