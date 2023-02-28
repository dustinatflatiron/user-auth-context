import { useContext, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import AuthContext, { AuthProvider } from "./context/auth";

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
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user && (
          <>
            <Link onClick={logoutUser}>Logout</Link>
            <Link to="/posts">View Posts</Link>
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

        {user && <Route path="/posts" element={<Posts />} />}
      </Routes>
    </div>
  );
}

export default App;
