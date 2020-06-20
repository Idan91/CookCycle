import React from "react";
// import React, { useState } from "react";

export const AccountContext = React.createContext();

const AccountContextProvider = (props) => {
  // const { signOut, currentUser } = useContext(AuthContext);
  // const [changePassword, setChangePassword] = useState(false);
  // const [newPassword, setNewPassword] = useState({
  //   newPassword: "",
  //   confirmNewPassword: "",
  // });

  // const handlePasswordChange = (event) => {
  //   const { target } = event;

  //   const currentNewPassword = newPassword;

  //   currentNewPassword[target.getAttribute("name")] = target.value;

  //   setNewPassword(currentNewPassword);
  // };

  // const saveNewPassword = (event) => {
  //   event.preventDefault();

  //   const changePassword = window.confirm(
  //     "Are you sure you want to change your password?"
  //   );
  // };

  return (
    <AccountContext.Provider
      value={
        {
          // handlePasswordChange,
          // changePassword,
          // setChangePassword,
          // saveNewPassword,
        }
      }
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
