import { createSlice } from "@reduxjs/toolkit";

export const fullScreenLoaderSlice = createSlice({
  name: "fullscreenloader",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = fullScreenLoaderSlice.actions;

export const getLoadingStatus = (state) => state.fullscreenloader.loading;

export default fullScreenLoaderSlice.reducer;
