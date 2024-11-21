import React from "react";

function DeleteWarning({closeWarning, deletionConfirmed}){

  return(
    <div>
      <div className="confirm-details">
        <h2>Are you sure?</h2>
        <p>
          There is no going back. All your user information will be deleted.
        </p>
        <div className="">
          <button
            className="confirm-button"
            onClick={deletionConfirmed}
          >
            Confirm
          </button>
          <button
            className="cancel-button"
            onClick={closeWarning}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export { DeleteWarning }