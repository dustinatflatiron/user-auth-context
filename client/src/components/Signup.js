import { useContext, useState } from "react";
import AuthContext from "../context/auth";

const initialState = {
  username: "",
  password: "",
};

const Signup = () => {
  const [signupFormData, setSignupFormData] = useState(initialState);

  const { signupUser } = useContext(AuthContext);

  const handleUpdateSignupForm = (e) => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSignupSubmit = (e) => {
    e.preventDefault();
    signupUser(signupFormData);
    setSignupFormData(initialState);
  };

  return (
    <form onSubmit={onSignupSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleUpdateSignupForm}
        value={signupFormData.username}
      />
      <input
        type="password"
        name="password"
        onChange={handleUpdateSignupForm}
        value={signupFormData.password}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
