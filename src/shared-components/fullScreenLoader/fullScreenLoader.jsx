/* eslint-disable no-restricted-globals */
import React from "react";
import { useSelector } from "react-redux";
import "./fullScreenLoader.css";
import { getLoadingStatus } from "./fullScreenLoaderSlice";
const FullScreenLoader = (props) => {
  const loading = useSelector(getLoadingStatus);
  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="text-center middleloader">
            <div
              className="spinner-border spinner-border-sm spinner-size-alter me-1"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow spinner-grow-sm spinner-size-alter me-1"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-border spinner-border-sm spinner-size-alter me-1"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow spinner-grow-sm spinner-size-alter me-1"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullScreenLoader;
