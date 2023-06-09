import { useEffect, useState, useContext } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { token } from "../../App";
import { useCookies } from "react-cookie";
export const LoginPage: React.FC = () => {
  const [login, getLogin] = useState<string>("");
  const [password, getPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const { getIsAuthorized } = useContext(token);
  useEffect(() => {
    getIsAuthorized(false);
    sessionStorage.clear();
    setCookie("access_token", "", {
      path: "/",
    });
  }, []);
  const loginning = (login: string, password: string) => {
    setIsLoading(true);
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
        setCookie("access_token", response.data.accessToken, {
          path: "/",
        });
        getIsAuthorized(true);
        sessionStorage.setItem("access_token_ph", "true");
        response.data.accessToken && navigate("/album-list");
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <div className="login-page">
      <form autoComplete={"off"} className="input-block">
        <p className="input-block-name">Sign up</p>
        <p className="input-block-text">Login</p>
        <input
          type="text"
          onChange={(e) => getLogin(e.currentTarget.value)}
          className="input-form"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
        />
        <p className="input-block-text">Password</p>
        <input
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
            className={isLoading ? "bt-login-disabled" : "bt-login"}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
