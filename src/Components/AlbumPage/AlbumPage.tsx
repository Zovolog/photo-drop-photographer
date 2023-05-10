import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./AlbumPage.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ImageUploader from "../ImageUploader/ImageUploader";
import axios from "axios";
import { useCookies } from "react-cookie";

const AlbumPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [images, getImages] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const { albumId } = useParams();
  const formData = new FormData();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = (images: any) => {
    getImages(images);
  };
  const sendPhotos = (albumId: any, images: any) => {
    formData.append("clients", "432");
    formData.append("album", albumId);
    images.forEach((item: any) => {
      formData.append("files", item);
    });

    axios
      .post(`https://photos-ph.onrender.com/upload-photos`, formData, {
        headers: {
          ["authorization"]: cookies.access_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        alert("Photos uploaded!");
      })
      .catch(function (error) {});
  };
  return (
    <div>
      <div className="header">
        <button className="bt-add" onClick={handleClickOpen}>
          Add photos
        </button>
      </div>
      <Dialog open={open} onClose={handleClose} className="modal-add-photos">
        <DialogTitle>Add photos to album</DialogTitle>
        <DialogContent>
          <div className="modal-body">
            <ImageUploader onUpload={handleUpload} />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bt-add"
            onClick={() => sendPhotos(albumId, images)}
          >
            Add photos to album
          </button>
          <button className="bt-cancel" onClick={handleClose}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlbumPage;
