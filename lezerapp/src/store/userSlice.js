import { createSlice } from '@reduxjs/toolkit';
import { get, post } from 'axios';

const API_URL = 'http://localhost:3000/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

export const selectUsername = (state) => state.user.username;
export const selectProfilePicture = (state) => state.user.profilePicture;

export const { setUsername, setProfilePicture } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (username) => async (dispatch) => {
  try {
    const { data } = await get(`${API_URL}/user/${username}`);
    dispatch(setUsername(data.username));
  } catch (err) {
    throw new Error(err);
  }
};

export const registerUser = (username) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/user`, { userName: username });
    dispatch(setUsername(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const googleAccount = (googleResponse) => async (dispatch) => {
  try {
    const { data } = await post(`${API_URL}/user/oauth/google`, {
      tokenId: googleResponse.tokenId,
    });
    dispatch(setUsername(data.userName));
    dispatch(setProfilePicture(data.profilePicture));
  } catch (err) {
    throw new Error(err);
  }
};
