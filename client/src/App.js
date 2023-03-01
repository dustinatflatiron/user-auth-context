import { useContext, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Post from "./components/Post";
import AuthContext from "./context/auth";

const linkStyles = {
  margin: "4px",
};

function App() {
  const { user, fetchInitialUser, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    fetchInitialUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!user && (
          <>
            <Link style={linkStyles} to="/login">
              Login
            </Link>
            <Link style={linkStyles} to="/signup">
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link style={linkStyles} onClick={logoutUser}>
              Logout
            </Link>
            <Link style={linkStyles} to="/posts">
              View Posts
            </Link>
          </>
        )}
      </header>
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        {user && (
          <>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
