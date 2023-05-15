import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import "../../styles/test.css";
export const ImageUploaderTest: React.FC = () => {
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
    }
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
        <input type="text" className="input-form client-form" />
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
      <button className="bt-add bt-upload-test">Upload images</button>
    </div>
  );
};
