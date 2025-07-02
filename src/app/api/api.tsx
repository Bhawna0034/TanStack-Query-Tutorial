import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export const fetchPosts = async() => {
    const response = await api.get("/posts?_start=0&_limit=6");
    if(response.status !== 200){
        return [];
    }else{
        return response.data;
    }

}

// get Post By id
export const fetchPostById = async(id: string | number) => {
    try{
        const response = await api.get(`/posts/${id}`);
        return response.status === 200 ? response.data : [];
    }catch(error){
        console.log(error);
    }
}