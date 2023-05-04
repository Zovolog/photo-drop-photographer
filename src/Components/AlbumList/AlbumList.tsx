import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { token } from "../../App";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./AlbumList.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
export const AlbumList: React.FC = () => {
  const access_token = localStorage.getItem("access_token");
  const { getIsAuthorized } = useContext(token);
  const [open, setOpen] = useState(false);
  const [data, getData] = useState([]);
  const [name, getName] = useState("");
  const [location, getLocation] = useState("");
  const [datepicker, getDatepicker] = useState("");
  const [validateName, showValidateName] = useState("");
  const [validateLocation, showValidateLocation] = useState("");
  const [validateDatepicker, showValidateDatepicker] = useState("");
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = (name: string, location: string, datepicker: string) => {
    if (!name) {
      showValidateName("Please type name");
    } else if (!location) {
      showValidateLocation("Please type location");
    } else if (!datepicker) {
      showValidateDatepicker("Please type datepicker");
    } else {
      axios({
        url: `https://photos-ph.onrender.com/create-album`,
        method: "post",
        headers: { ["authorization"]: access_token },
        data: {
          name: name,
          location: location,
          datapicker: datepicker,
        },
      })
        .then(function (response) {
          setOpen(false);
        })
        .catch(function (error) {
          console.log(error.data);
        });
    }
  };

  useEffect(() => {
    axios({
      url: `https://photos-ph.onrender.com/me`,
      method: "get",
      headers: { ["authorization"]: access_token },
    })
      .then(function (response) {
        getIsAuthorized(true);
      })
      .catch(function (error) {
        navigate("/login");
      });
  }, []);
  useEffect(() => {
    axios({
      url: `https://photos-ph.onrender.com/all-albums`,
      method: "get",
      headers: { ["authorization"]: access_token },
    })
      .then(function (response) {
        console.log(response.data);
        getData(response.data.data);
      })
      .catch(function (error) {});
  }, []);
  return (
    <div>
      <div className="header">
        <img src={logo} alt="logo" height={"50%"} />
        <p className="album-header">Album page</p>
        <button className="bt-blue" onClick={handleClickOpen}>
          Add album
        </button>
      </div>
      <div className="body">
        <div className="album-list">
          {data.map((album: any, i) => (
            <Link key={i} to={`/album/${album.albumId}`}>
              <div className="album">
                <img
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${album.name}`}
                  className="icon"
                />
                <div className="album-text-part">
                  <p>{album.name}</p>
                  <p>{album.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new album</DialogTitle>
        <DialogContent>
          <div className="modal-body">
            <input
              type="text"
              className="input-new-album"
              placeholder="Name"
              onChange={(e) => getName(e.currentTarget.value)}
            />
            <p className="validate-message">{validateName}</p>
            <input
              type="text"
              className="input-new-album"
              placeholder="Location"
              onChange={(e) => getLocation(e.currentTarget.value)}
            />
            <p className="validate-message">{validateLocation}</p>
            <input
              type="text"
              className="input-new-album"
              placeholder="Datepicker"
              onChange={(e) => getDatepicker(e.currentTarget.value)}
            />
            <p className="validate-message">{validateDatepicker}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bt-blue"
            onClick={() => sendData(name, location, datepicker)}
          >
            Add album
          </button>
          <button className="bt-blue" onClick={handleClose}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
