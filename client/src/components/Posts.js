import { useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/post";

const truncate = (str) => {
  return str.slice(0, 51) + "...";
};

const Posts = () => {
  const { posts } = useContext(PostContext);
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>
              {post.content.length > 50 ? truncate(post.content) : post.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
