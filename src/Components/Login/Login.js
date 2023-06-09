import React, { useContext } from "react";
import "./Login.css";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { baseUrl } from "../../services/api";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

const Login = () => {
  const hideOnClick = (dHeader) => {
    const element = document.getElementById(dHeader);
    if (element) {
      element.style.display = "none";
    }
  };
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const password = e.target.password.value;

    const data = {
      email,
      password,
    };
    console.log(data);
    await axios.post(`${baseUrl}/user/signin`, data).then((res) => {
      if (res.data.status) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setUser(res.data.result);
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <Header></Header>
      {/* Login section  */}
      <div className="login-area d-flex justify-center pt-lin">
        <Container className="d-flex justify-content-center">
          <div className="data-submit-field text-start">
            <h1 className="field-heading">We've missed you!</h1>
            <p className=" pe-4 mb-2">
              More than 150 questions are waiting for your wise suggestions!
            </p>
            {/* input field */}
            <form onSubmit={handleLogin} className="pt-2">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control shadow-sm"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control shadow-sm"
                  id="password"
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input check-w"
                  type="checkbox"
                  id="remember-pass"
                />
                <label className="form-check-label" for="remember-pass">
                  Remember me
                </label>
              </div>
              <div><Link to="/take-email"> Forgot Password</Link></div>
              </div>
              <button type="submit" className="btn btn-bg text-white">
                Sign In
              </button>
              <span className="px-3">Or</span>
              <Link className="text-decoration-none" to={"/register"}>
                Register now!
              </Link>
              <div class="invalid-feedback">Wrong password!</div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;
