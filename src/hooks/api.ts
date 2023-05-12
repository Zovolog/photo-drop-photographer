import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Api = (endpoint: string) => {
  const [albums, setAlbums] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const getAlbums = (): Promise<void> => {
    return axios({
      url: `https://photos-ph.onrender.com/${endpoint}`,
      method: "get",
      headers: { authorization: cookies.access_token },
    })
      .then(function (response) {
        console.log(response.data.data);
        setAlbums(response.data.data);
      })
      .catch(function (error) {
        navigate("/");
      });
  };

  return { getAlbums, albums };
};
