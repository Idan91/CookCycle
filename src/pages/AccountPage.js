import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Account = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <div className="page">
      <div className="content-container">
        <div className="centered-container">
          <button className="btn" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
