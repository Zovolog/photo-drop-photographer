import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { Profile } from "./Components/Profile/Profile";

export const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
