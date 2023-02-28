import { useContext, useState } from "react";
import AuthContext from "../context/auth";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [loginFormData, setLoginFormData] = useState(initialState);

  const { loginUser } = useContext(AuthContext);

  const handleUpdateLoginForm = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginFormData);
    setLoginFormData(initialState);
  };

  return (
    <form onSubmit={onLoginSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleUpdateLoginForm}
        value={loginFormData.username}
      />
      <input
        type="password"
        name="password"
        onChange={handleUpdateLoginForm}
        value={loginFormData.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
