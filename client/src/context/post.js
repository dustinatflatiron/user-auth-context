import { useState, createContext } from "react";

const PostContext = createContext({
  posts: [],
  post: null,
  fetchPosts: null,
  getPost: null,
});

export default PostContext;

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  const fetchPosts = () => {
    return fetch("/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setPostsCount(data.length);
      });
  };

  const getPost = (postId) => {
    return posts.find((post) => post.id === postId);
  };

  return (
    <PostContext.Provider value={{ fetchPosts, posts, postsCount, getPost }}>
      {children}
    </PostContext.Provider>
  );
};
