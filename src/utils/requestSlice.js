import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],   // IMPORTANT!
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;   // payload must be array
    },
    removeRequest: (state,action) => {
        const newArray = state.requests.filter((r)=> r._id !== action.payload);
        return newArray;
    }
  },
});

export const { addRequests,removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
