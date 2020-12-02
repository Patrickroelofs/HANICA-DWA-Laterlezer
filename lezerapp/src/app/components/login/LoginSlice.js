import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'user',

  initialState: {

  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { setUsername } = loginSlice.actions;
export const { setProfilePicture } = loginSlice.actions;
export default loginSlice.reducer;
