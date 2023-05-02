import { useState } from "react";
import "./LoginPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
export const LoginPage: React.FC = () => {
  const [login, getLogin] = useState("");
  const [password, getPassword] = useState("");
  const navigate = useNavigate();
  const loginning = (login: string, password: string) => {
    axios({
      url: `https://photos-ph.onrender.com/login`,
      method: "post",
      headers: {},
      data: {
        login: login,
        password: password,
      },
    })
      .then(function (response) {
        console.log(response.data.accessToken);
        response.data.accessToken && navigate("/profile");
      })
      .catch(function (error) {});
  };
  return (
    <div>
      <form autoComplete={"off"} className="input-block">
        <input
          placeholder="Type your login..."
          type="text"
          onChange={(e) => getLogin(e.currentTarget.value)}
          className="input-form"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
        />
        <input
          placeholder="Type your password..."
          type="password"
          onChange={(e) => getPassword(e.currentTarget.value)}
          className="input-form"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
        />
        <div className="row">
          <button
            onClick={(e) => {
              e.preventDefault();
              loginning(login, password);
            }}
          >
            Login
          </button>
          <a href="https://childofukraine.retool.com/embedded/public/7603d391-851a-4a30-93d8-471dc4b9c8ea">
            Don`t have account?
          </a>
        </div>
      </form>
    </div>
  );
};
