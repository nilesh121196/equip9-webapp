import { createSlice } from "@reduxjs/toolkit";
import { S3 } from "../../services/AWSService";
import { setLoading } from "../../shared-components/fullScreenLoader/fullScreenLoaderSlice";
import { sha256 } from "js-sha256";
import { setStatusOfPopup } from "../../shared-components/popupBlock/popupBlockSlice";
import { devEnv } from "../../config";
export const loginSlice = createSlice({
  name: "loginslice",
  initialState: {
    loginUserDetails: null,
    loginUserImage: null,
  },
  reducers: {
    setLoginUserDetail: (state, action) => {
      state.loginUserDetails = action.payload;
    },
    setImage: (state, action) => {
      state.loginUserImage = action.payload;
    },
  },
});

export const { setLoginUserDetail, setImage } = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const fetchUserData = (user_cred) => (dispatch, getState) => {
  dispatch(setLoading(true));

  const userdetail = JSON.parse(localStorage.getItem(user_cred.email));
  if (userdetail == null) {
    dispatch(
      setStatusOfPopup({
        show: true,
        type: "error",
        text: "User not present!",
      })
    );
    dispatch(setLoading(false));
    return 0;
  }
  if (sha256(user_cred.pass) !== userdetail.sha256_password) {
    dispatch(
      setStatusOfPopup({
        show: true,
        type: "error",
        text: "Password is incorrect!",
      })
    );
    console.log("invalid credential");
    dispatch(setLoading(false));
    return 0;
  }
  dispatch(setLoginUserDetail(userdetail));
  localStorage.setItem("currentUser", JSON.stringify(userdetail));
  dispatch(addCors(userdetail.key));
};

export const getObjectFromS3 = (key) => (dispatch, getState) => {
  var params = {
    Bucket: devEnv.bucketName,
    Key: `${key}.raw`,
  };
  S3.getObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      dispatch(setLoading(false));
    } // an error occurred
    else {
      const fileBlob = new Blob([data.Body], { type: "image/jpeg" });
      let reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onloadend = function () {
        let base64data = reader.result;
        localStorage.setItem("currentUserImage", base64data);
        dispatch(setImage(base64data));
        dispatch(setLoading(false));
      };

      // dispatch(setImage(new Blob([data.Body], { type: "image/jpeg" })));
    } // successful response
  });
};

export const addCors = (key) => async (dispatch, getState) => {
  var params = {
    Bucket: devEnv.bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "POST", "DELETE", "GET"],
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
      dispatch(getObjectFromS3(key));
    } // successful response
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const loginUserDetailsObject = (state) => state.login.loginUserDetails;
export const loginUserImageObject = (state) => state.login.loginUserImage;

export default loginSlice.reducer;
