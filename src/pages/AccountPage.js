import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Page from "./Page";
// import { AccountContext } from "../contexts/AccountContext";

const Account = () => {
  const { signOut, currentUser } = useContext(AuthContext);

  const accountFields = [
    {
      name: "displayName",
      label: "Display Name",
    },
    {
      name: "email",
      label: "Email",
    },
  ];

  const renderAccountFields = (
    i_accountFields,
    fromCurrentUser = false,
    input = false
  ) => {
    let accountFieldToRender = [];
    let value = "";

    i_accountFields.forEach((field) => {
      if (fromCurrentUser) {
        value = (
          <h3 className="account-field-value">{currentUser[field.name]}</h3>
        );
      } else if (input) {
        value = (
          <input
            type="text"
            // onChange={handlePasswordChange}
            name={field.name}
          ></input>
        );
      } else {
        value = <h3 className="account-field-value">{field.name}</h3>;
      }

      accountFieldToRender.push(
        <div className="account-field" key={field.name}>
          <h4 className="account-field-header">{field.label}</h4>
          {value}
          <br />
        </div>
      );
    });

    return accountFieldToRender;
  };

  const onUserSignOutClick = (event) => {
    const isSure = window.confirm("Are you sure you want to sign out?");

    if (isSure) {
      signOut();
    }
  };

  return (
    <Page title="Account">
      {currentUser && renderAccountFields(accountFields, true)}
      <button className="btn btn-sign-out" onClick={onUserSignOutClick}>
        Sign out
      </button>
    </Page>
  );
};

export default Account;
