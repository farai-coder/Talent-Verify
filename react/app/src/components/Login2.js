import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container sign-in-container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form onSubmit={signIn}>
            <h1 className="text-center mb-4">Log In to your Account</h1>
            <div className="form-group mb-3">
              <label for="email" className="form-control-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label for="password" className="form-control-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="git"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <label className="form-check-label" for="showPassword">Show Password</label>
              </div>
            </div>
            <button type="submit" className="w-100 btn btn-lg btn-secondary">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;