import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const AlbumPage: React.FC = () => {
  const { albumId } = useParams();
  useEffect(() => {}, []);
  return (
    <div>
      <div className="header">{albumId}</div>
    </div>
  );
};
