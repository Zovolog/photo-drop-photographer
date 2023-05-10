import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { AlbumList } from "./Components/AlbumList/AlbumList";
import { useContext } from "react";
import { token } from "./App";
import AlbumPage from "./Components/AlbumPage/AlbumPage";

export const Main: React.FC = (props) => {
  const { isAuthorized, getIsAuthorized } = useContext(token);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/album-list"
          element={isAuthorized ? <AlbumList /> : <Navigate to={"/"} />}
        />
        <Route path="/album/:albumId" element={<AlbumPage />} />
      </Routes>
    </div>
  );
};
