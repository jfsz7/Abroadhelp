import React, { useContext } from "react";
import Header from "../Header/Header";
import "./Register.css";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/api";
import axios from "axios";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const country = e.target.country.value;
    const university = e.target.university.value;
    const major = e.target.major.value;
    const gender = e.target.gender.value;
    const password = e.target.password.value;

    const data = {
      username,
      email,
      password,
      country,
      university,
      major,
      gender,
    };
    console.log(data);
    await axios.post(`${baseUrl}/user/signup`, data).then((res) => {
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
      {/* Register section  */}
      <div className="register-area pt-sectn">
        <Container className="d-flex justify-content-center">
          <div className="data-submit-field text-start w-50">
            <h1 className="field-heading">Join AbroadHelp community</h1>
            <p className="text-secondary d-inline pe-4 mb-2">
              Get more features and priviliges by joining to the most helpful
              community
            </p>
            {/* input field */}
            <form onSubmit={handleRegister} className="py-2">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control shadow-sm"
                  id="username"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control shadow-sm"
                  id="email"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div class="invalid-feedback">Email already registered!</div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control shadow-sm"
                  id="password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Major"
                  className="form-control shadow-sm"
                  id="major"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="University"
                  className="form-control shadow-sm"
                  id="university"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Country"
                  className="form-control shadow-sm"
                  id="country"
                  required
                />
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                />
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
              <div class="form-check form-check-inline pb-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="notsay"
                  value="notsay"
                />
                <label class="form-check-label" for="notsay">
                  Prefer not to say
                </label>
              </div>

              <button type="submit" className="btn btn-bg mb-4 text-white">
                Register
              </button>
              <span className="px-3">Or</span>
              <Link className="text-decoration-none" to={"/"}>
                Sign in now!
              </Link>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
