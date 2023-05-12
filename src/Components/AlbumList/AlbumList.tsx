import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./AlbumList.css";
import logo from "./logo.png";
import { useCookies } from "react-cookie";
import { Loader } from "../Loader/Loader";
import { Api } from "../../hooks/api";
import ImageUploader from "../ImageUploader/ImageUploader";
import plus from "./plus.png";
export const AlbumList: React.FC = () => {
  const [cookies] = useCookies(["access_token"]);
  const { getAlbums, albums } = Api("all-albums");
  const [open, setOpen] = useState(false);
  const [name, getName] = useState("");
  const [location, getLocation] = useState("");
  const [datepicker, getDatepicker] = useState("");
  const [validateName, showValidateName] = useState("");
  const [validateLocation, showValidateLocation] = useState("");
  const [validateDatepicker, showValidateDatepicker] = useState("");
  const [count, setCount] = useState(0);
  const [openLoaderPhotos, setOpenLoaderPhotos] = useState(false);
  const [albumId, setAlbumId] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = (name: string, location: string, datepicker: string) => {
    if (name === "") {
      showValidateName("Please type name");
    } else if (location === "") {
      showValidateLocation("Please type location");
    } else if (datepicker === "") {
      showValidateDatepicker("Please type datepicker");
    } else {
      axios({
        url: `https://photos-ph.onrender.com/create-album`,
        method: "post",
        headers: { ["authorization"]: cookies.access_token },
        data: {
          name: name,
          location: location,
          datapicker: datepicker,
        },
      })
        .then(function (response) {
          console.log(response.data);
          setOpen(false);
          setCount(count + 1);
          getName("");
          getLocation("");
          getDatepicker("");
          showValidateName("");
          showValidateLocation("");
          showValidateDatepicker("");
        })
        .catch(function (error) {
          console.log(error.data);
        });
    }
  };

  useEffect(() => {
    getAlbums();
  }, [count]);
  return (
    <div>
      <div className="header">
        <img src={logo} alt="logo" height={"50%"} />
        <p className="album-header">Album page</p>
        <button className="bt-add" onClick={handleClickOpen}>
          Add album
        </button>
      </div>
      <div className="body">
        {albums.length > 0 ? (
          <div className="album-list">
            {albums.map((album: any, i) => (
              <div key={i}>
                <div className="album">
                  <img
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${album.name}`}
                    className="icon"
                  />
                  <div className="album-text-part">
                    <p>{album.name}</p>
                    <p>{album.location}</p>
                  </div>
                  <button
                    onClick={() => {
                      setOpenLoaderPhotos(true);
                      setAlbumId(album.albumId);
                    }}
                    className="bt-photos"
                  >
                    <img src={plus} className="bt-photos-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new album</DialogTitle>
        <DialogContent>
          <div className="modal-body">
            <p className="input-block-name">Name</p>
            <input
              type="text"
              className="input-form"
              onChange={(e) => getName(e.currentTarget.value)}
            />
            <p className="validate-message">{validateName}</p>
            <p className="input-block-name">Location</p>
            <input
              type="text"
              className="input-form"
              onChange={(e) => getLocation(e.currentTarget.value)}
            />
            <p className="validate-message">{validateLocation}</p>
            <p className="input-block-name">Datepicker</p>
            <input
              type="text"
              className="input-form"
              onChange={(e) => getDatepicker(e.currentTarget.value)}
            />
            <p className="validate-message">{validateDatepicker}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bt-add"
            onClick={() => {
              sendData(name, location, datepicker);
            }}
          >
            Add album
          </button>
          <button className="bt-cancel" onClick={handleClose}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <ImageUploader
        stateOpen={openLoaderPhotos}
        stateClose={setOpenLoaderPhotos}
        albumId={albumId}
      />
    </div>
  );
};
