import { useParams } from "react-router-dom";
import "./AlbumPage.css";
import { ImageUploaderTest } from "../ImageUploader(Test)/ImageUploader(test)";
import { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
export const AlbumPage: React.FC = () => {
  const { albumId } = useParams();
  const [openLoaderPhotos, setOpenLoaderPhotos] = useState(false);
  return (
    <div>
      <div className="album-header">
        <p className="album-logo">Album page</p>
      </div>
      <div className="album-body">
        <ImageUploaderTest />
        <button
          onClick={() => {
            setOpenLoaderPhotos(true);
          }}
          className="bt-add bt-modal-test"
        >
          Add photos to album
        </button>
      </div>
      <ImageUploader
        stateOpen={openLoaderPhotos}
        stateClose={setOpenLoaderPhotos}
      />
    </div>
  );
};
