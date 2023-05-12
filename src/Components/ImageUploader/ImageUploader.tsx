import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import "./ImageUploader.css";
interface ImageUploaderProps {
  stateOpen: boolean;
  stateClose: any;
  albumId: string;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
  stateOpen,
  stateClose,
  albumId,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const [cookies] = useCookies(["access_token"]);

  const handleClose = () => {
    stateClose(false);
  };
  const handleImageChange = (e: any) => {
    const selectedFiles = e.target.files;
    const selectedPreviews: string[] = [];

    if (selectedFiles) {
      const newImages: File[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          selectedPreviews.push(reader.result as string);
          setPreviews([...previews, ...selectedPreviews]);
        };

        reader.readAsDataURL(selectedFiles[i]);
        newImages.push(selectedFiles[i]);
        e.target.value = "";
      }

      setImages([...images, ...newImages]);
    }
  };
  const sendPhotos = (images: any) => {
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
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Dialog
        open={stateOpen}
        onClose={handleClose}
        className="modal-add-photos"
      >
        <DialogTitle>Add photos to album</DialogTitle>
        <DialogContent>
          <div className="modal-body">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bt-add-img"
            >
              Upload photos
            </button>
            <div className="block-images">
              {previews.length > 0 ? (
                previews.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="img-icon"
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bt-add bt-upload"
            onClick={() => sendPhotos(images)}
          >
            Add photos to album
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageUploader;
