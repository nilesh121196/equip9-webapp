import "./App.css";
import { ActivateHTTPInterceptor } from "./services/HTTPInterceptor";
import FullScreenLoader from "./shared-components/fullScreenLoader/fullScreenLoader.jsx";
import { store } from "./store";
import PopupBlock from "./shared-components/popupBlock/popupBlock.jsx";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/routing/PrivateRoute";
import PublicRoute from "./utils/routing/PublicRoute";
import Login from "./components/login/login";
import UserRegistration from "./components/user-registration/user-registration";
import Dashboard from "./components/dashboard/dashboard";
function App() {
  return (
    <div className="indexPageHeightWidth">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/newuser" element={<UserRegistration />} />
          </Route>
        </Routes>
        <FullScreenLoader />
        <PopupBlock />
      </Provider>
    </div>
  );
}

export default App;
ActivateHTTPInterceptor(store);
