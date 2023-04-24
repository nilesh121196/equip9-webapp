import { configureStore } from "@reduxjs/toolkit";
import fullScreenLoaderReducer from "./shared-components/fullScreenLoader/fullScreenLoaderSlice";
import popupBlockReducer from "./shared-components/popupBlock/popupBlockSlice";
import userRegistrationReducer from "./components/user-registration/userRegistrationSlice";
import loginReducer from "./components/login/loginSlice";
export const store = configureStore({
  reducer: {
    fullscreenloader: fullScreenLoaderReducer,
    popupblock: popupBlockReducer,
    userregistration: userRegistrationReducer,
    login: loginReducer,
  },
});
