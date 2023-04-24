import { createSlice } from "@reduxjs/toolkit";

export const popupblockSlice = createSlice({
  name: "popupblock",
  initialState: {
    show: false,
    type: "success",
    text: "",
  },
  reducers: {
    setStatusOfPopup: (state, action) => {
      state.show = action.payload.show;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
  },
});

export const { setStatusOfPopup } = popupblockSlice.actions;

export const getPopupStatus = (state) => state.popupblock;

export default popupblockSlice.reducer;
