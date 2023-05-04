import React, { createContext, useState } from "react";
import "./App.css";
import { Main } from "./Main";
interface auth {
  isAuthorized: any;
  getIsAuthorized: any;
}
export const token = createContext({} as auth);
function App() {
  const [isAuthorized, getIsAuthorized] = useState(
    sessionStorage.getItem("access_token_ph")
  );
  return (
    <token.Provider
      value={{
        isAuthorized,
        getIsAuthorized,
      }}
    >
      <div className="App">
        <Main />
      </div>
    </token.Provider>
  );
}

export default App;
