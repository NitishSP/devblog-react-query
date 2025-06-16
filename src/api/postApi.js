import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
}

export const getPostById = async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
} 

export const addPost = async (newPost) => {
    const response = await axios.post(`${API_URL}/posts`, newPost);
    return response.data;
}

export const updatePost = async (updatedPost) => {
    const response = await axios.put(`${API_URL}/posts/${updatedPost.id}`, updatedPost);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
}

export const getPaginatedPosts = async ({pageParam = 1}) => {
    const response = await axios.get(`${API_URL}/posts`, {
        params: {
            _limit: 10,
            _page: pageParam
        }
    });
    return {
        data: response.data,
        nextPage: pageParam < 10 ? pageParam + 1 : null,
    }
}
