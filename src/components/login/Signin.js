import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { auth, signInWithGoogle } from "../../firebase";

import "./Signin.scss";
import { useHistory } from "react-router";

const Signin = () => {
  const history=useHistory()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    await auth.signInWithEmailAndPassword(email, password);
    setUser({
      email: "",
      password: "",
    });
    history.push('/')
  };
  return (
    <div className="Signin">
      <h3> Sign in to you application!!!</h3>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          onChange={onChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          onChange={onChange}
          type="password"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={signInWithGoogle}
          color="secondary"
        >
          Sign In with google
        </Button>
      </form>
    </div>
  );
};

export default Signin;