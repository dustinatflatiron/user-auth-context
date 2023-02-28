import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const fetchInitialUser = () => {
    fetch("/me").then(responseHandler);
  };

  const loginUser = (formData) => {
    fetch("/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(responseHandler);
  };

  const signupUser = (formData) => {
    fetch("/signup", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(responseHandler);
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
        navigate("/posts");
      });
    } else {
      navigate("/login");
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
