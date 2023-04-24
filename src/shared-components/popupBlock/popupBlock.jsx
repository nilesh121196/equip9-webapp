/* eslint-disable no-restricted-globals */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./popupBlock.css";
import { getPopupStatus, setStatusOfPopup } from "./popupBlockSlice";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const PopupBlock = (props) => {
  const popup_status = useSelector(getPopupStatus);
  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(
      setStatusOfPopup({
        ...popup_status,
        show: false,
      })
    );
  };
  const [classForPopup, setClassForPopup] = useState("success-toast");
  useEffect(() => {
    if (popup_status.type === "success") {
      setClassForPopup("success-toast");
    } else if (popup_status.type === "error") {
      setClassForPopup("error-toast");
    }
  }, [popup_status]);
  return (
    <>
      {popup_status.show && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" className={"toast show " + `${classForPopup}`}>
            <div className="toast-header">
              <FontAwesomeIcon icon={faCircleCheck} className="FIcon" />
              <strong className="me-auto toast-title-text ms-1">
                {popup_status.type}
              </strong>

              <small></small>
              <button
                type="button"
                className="btn-close"
                onClick={closePopup}
              ></button>
            </div>
            <div className="toast-body">{popup_status.text}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupBlock;
