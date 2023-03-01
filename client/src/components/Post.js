import { useContext } from "react";
import { useParams } from "react-router-dom";
import PostContext from "../context/post";

const Post = () => {
  const { getPost } = useContext(PostContext);
  const { id } = useParams();

  const post = getPost(parseInt(id));

  if (!post) return <h1>Loading</h1>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
