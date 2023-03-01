import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostContext from "./post";

const AuthContext = createContext({
  loginUser: null,
  signupUser: null,
  logoutUser: null,
  user: null,
  errors: null,
});

export default AuthContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);

  const { fetchPosts, postsCount } = useContext(PostContext);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchInitialUser = () => {
    fetch("/me")
      .then(responseHandler)
      .catch((err) => {
        navigate("/login");
      });
  };

  const loginUser = (formData) => {
    fetch("/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then(responseHandler)
      .catch((err) => {
        navigate("/login");
      });
  };

  const signupUser = (formData) => {
    fetch("/signup", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then(responseHandler)
      .catch((err) => {
        navigate("/login");
      });
  };

  const logoutUser = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const responseHandler = (res) => {
    if (res.ok) {
      res.json().then((data) => {
        setUser(data);
        if (postsCount < 1) {
          fetchPosts().then(() => {
            if (location.pathname.match(/signup|login|\/$/)) {
              navigate("/posts");
            }
          });
          return;
        }
        if (location.pathname.match(/signup|login|\/$/)) {
          navigate("/posts");
        }
      });
    } else {
      throw new Error(`status code: ${res.status}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        fetchInitialUser,
        signupUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
