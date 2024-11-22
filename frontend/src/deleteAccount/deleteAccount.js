import React, { useState } from "react";
import "./deleteAccount.css";
import Backdrop from "../components/Backdrop";
import { DeleteWarning } from "./DeleteWarning.js";
import "./deleteWarning.css"
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default function DeleteAccount() {
  const [confirmationText, setConfirmationText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [warningsIsOpen, setWarningIsOpen] = useState(false)

  const handleInputChange = (event) => {
    const value = event.target.value;
    setConfirmationText(value);
    setIsDisabled(value !== "DELETE");
  };

  const handleDelete = () => {
    if (confirmationText === "DELETE") {
      setWarningIsOpen(true)
    }
  };

  const closeWarning = () => {
    setWarningIsOpen(false)
  }

  const deletionConfirmed = () => {
    //alert("account deleted!")
    axios
      .delete(url + "/user/delete-account", {
        data:{
          email: "f@f", // FOR TESTING AT THE MOMENT
          password: "$2b$10$U2qlNNYyMKwiQ1YfUkSmkeaQCjY68Ih2MxG53qWdFN5p8q48umZHK"
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        //alert(error.response.data.error ? error.response.data.error : error);
      })
    setWarningIsOpen(false)
  }

  return (
    <div className="delete-account-page">
      <div className="delete-account-box">
        <h2>Deleting Account</h2>
        <p>
          Deleting your account will remove all of your information from our
          database. This cannot be undone.
        </p>
        <p>
          <strong>To confirm this, type "DELETE"</strong>
        </p>
        <div className="input-container">
          <input
            type="text"
            value={confirmationText}
            onChange={handleInputChange}
            placeholder="Type DELETE"
            className="confirmation-input"
          />
          <button
            onClick={handleDelete}
            disabled={isDisabled}
            className="delete-button"
          >
            Delete Account
          </button>
        </div>
          { warningsIsOpen ? <Backdrop/> : null}
          { warningsIsOpen ? <DeleteWarning deletionConfirmed={deletionConfirmed} closeWarning={closeWarning}/> : null}
      </div>
    </div>
  );
}
