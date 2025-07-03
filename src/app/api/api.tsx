import axios from "axios";
import { PostProps } from "../lib/types";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export const getPosts = async(pageNumber: number) => {
    const response = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    if(response.status !== 200){
        return [];
    }else{
        return response.data;
    }

}

// get Post By id
export const getPostById = async(id: string | number) => {
    try{
        const response = await api.get(`/posts/${id}`);
        return response.status === 200 ? response.data : [];
    }catch(error){
        console.log(error);
    }
}

// delete post by id
export const deletePostById = async(id: number) => {
    return api.delete(`/posts/${id}`);
}

// create post
export const createPost = async(post: PostProps): Promise<PostProps> => {
    const response =  await api.post('/posts', post);
    return response.data;
}