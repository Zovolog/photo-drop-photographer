import { useState, useRef } from "react";
import "./ImageUploader.css";
interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onUpload([...images, ...newImages]);
    }
  };

  return (
    <div>
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
  );
};

export default ImageUploader;
