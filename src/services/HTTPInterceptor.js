import axios from "axios";
import { setLoading } from "../shared-components/fullScreenLoader/fullScreenLoaderSlice";

export const ActivateHTTPInterceptor = (store) => {
  const { dispatch } = store;
  axios.interceptors.request.use(
    (request) => {
      dispatch(setLoading(true));
      return request;
    },
    (error) => {
      dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      dispatch(setLoading(false));
      return response;
    },
    (error) => {
      dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );
};
