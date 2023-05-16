import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import "./ImageUploader.css";
import axios from "axios";
interface ImageUploaderProps {
  albumId: string | undefined;
}
export const ImageUploader: React.FC<ImageUploaderProps> = (albumId) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [clientInfo, getClinentInfo] = useState<string>("");
  const [validateClientInfo, showValidateClientInfo] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const [cookies] = useCookies(["access_token"]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      }

      setImages([...images, ...newImages]);
      e.target.value = "";
    }
  };

  const sendPhotos = (images: File[], albumId: any) => {
    if (!clientInfo) {
      showValidateClientInfo("Add client to photos");
    }
    formData.append("clients", clientInfo);
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
        showValidateClientInfo("");
        setPreviews([]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const cancelSending = () => {
    showValidateClientInfo("");
    setPreviews([]);
  };
  return (
    <div className="album-body album-block-add-photo">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bt-add-img bt-add-test"
      >
        Choose images
      </button>
      <div>
        <p className="album-client-text" style={{ marginTop: "15px" }}>
          Add client
        </p>
        <input
          type="text"
          className="input-form client-form"
          onChange={(e) => getClinentInfo(e.currentTarget.value)}
        />
        <p className="validate-text">{validateClientInfo}</p>
      </div>
      <div className="block-images-test">
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
      <div className="row-bt">
        <button
          className="bt-add bt-upload-test"
          onClick={(e) => sendPhotos(images, albumId)}
        >
          Upload images
        </button>
        <div className="bt-cancel" onClick={cancelSending}>
          Cancel
        </div>
      </div>
    </div>
  );
};
