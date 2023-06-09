import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../services/api";

const Forgotpass = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();
  const handleReset = async () => {
    if (password.length < 8) {
      toast.error("Password length must be 8 characters long!");
    } else {
      await axios
        .post(`${baseUrl}/user/resetPassword`, {
          email: email,
          code,
          newPassword: password,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
            setTimeout(() => {
              navigate(`/`);
            }, 2000);
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };
  return (
    <div>
      <Container>
        <div
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="data-submit-field text-start">
            <h1 className="field-heading text-center">
              Enter Email to receive code!
            </h1>
            <div class="mb-3">
              <input
                type="password"
                placeholder="New Password"
                className="form-control shadow-sm"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                placeholder="Code"
                className="form-control shadow-sm"
                id="Code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              onClick={handleReset}
              className="btn btn-bg text-white d-block mx-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Forgotpass;
