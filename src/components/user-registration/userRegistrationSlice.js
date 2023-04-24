import { createSlice } from "@reduxjs/toolkit";
import { S3 } from "../../services/AWSService";
// import { PutBucketCorsCommand, PutObjectCommand } from "aws-sdk/client-s3";
import { setStatusOfPopup } from "../../shared-components/popupBlock/popupBlockSlice";
import { redirect, useNavigate } from "react-router-dom";
import { setLoading } from "../../shared-components/fullScreenLoader/fullScreenLoaderSlice";
import { sha256 } from "js-sha256";
import { devEnv } from "../../config";
export const userRegistrationSlice = createSlice({
  name: "userregistrationslice",
  initialState: {},
  reducers: {},
});

export const { setUserDetail } = userRegistrationSlice.actions;

export const saveFiletoS3 = (userDetail) => async (dispatch, getState) => {
  // const navigate = useNavigate();
  const command = {
    Bucket: devEnv.bucketName,
    Key: `${userDetail.key}.raw`,
    Body: userDetail.photo.blob,
  };

  S3.putObject(command, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      dispatch(setLoading(false));
    } // an error occurred
    else {
      dispatch(setLoading(false));
      dispatch(
        setStatusOfPopup({
          show: true,
          type: "success",
          text: "successfully registered",
        })
      );
    } // successful response
  });
};

export const addCors = (userDetail) => async (dispatch, getState) => {
  var params = {
    Bucket: devEnv.bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "POST", "DELETE"],
          AllowedOrigins: ["http://localhost:3000"],
          ExposeHeaders: ["x-amz-server-side-encryption", ""],
          MaxAgeSeconds: 3000,
        },
        {
          AllowedHeaders: ["Authorization"],
          AllowedMethods: ["GET"],
          AllowedOrigins: ["*"],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  };
  S3.putBucketCors(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      dispatch(setLoading(false));
    } // an error occurred
    else {
      dispatch(saveFiletoS3(userDetail));
    } // successful response
  });
};

export const saveUserToLocalStorage = (userDetail) => (dispatch, getState) => {
  dispatch(setLoading(true));
  let userDetailCopy = JSON.parse(JSON.stringify(userDetail));
  userDetailCopy.sha256_password = sha256(userDetailCopy.sha256_password);
  delete userDetailCopy.photo;
  localStorage.setItem(userDetail.email, JSON.stringify(userDetailCopy));
  dispatch(addCors(userDetail));
};

export default userRegistrationSlice.reducer;
