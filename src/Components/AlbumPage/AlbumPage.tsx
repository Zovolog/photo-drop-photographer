import { useParams } from "react-router-dom";
import "./AlbumPage.css";
import { ImageUploader } from "../ImageUploader(Test)/ImageUploader";
import { useState } from "react";
export const AlbumPage: React.FC = () => {
  const { albumId } = useParams();

  return (
    <div>
      <div className="album-header">
        <p className="album-logo">Album page</p>
      </div>
      <div className="album-body">
        <ImageUploader albumId={albumId} />
      </div>
    </div>
  );
};
