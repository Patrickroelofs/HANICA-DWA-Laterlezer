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
    const { data, status } = await get(`${API_URL}/user/${username}`);
    dispatch(setUsername(data.username));
    return {
      status,
      message: data.message,
      success: data.success,
    };
  } catch ({ response }) {
    return {
      status: response.status,
      message: response.data,
      success: response.data.success || false,
    };
  }
};

export const registerUser = (username) => async (dispatch) => {
  try {
    const { data, status } = await post(`${API_URL}/user`, { userName: username });
    dispatch(setUsername(data));
    return {
      status,
      message: data.message,
      success: data.success,
    };
  } catch ({ response }) {
    return {
      status: response.status,
      message: response.data,
      success: response.data.success || false,
    };
  }
};

export const googleAccount = (googleResponse) => async (dispatch) => {
  try {
    const { data, status } = await post(`${API_URL}/user/oauth/google`, {
      tokenId: googleResponse.tokenId,
    });
    dispatch(setUsername(data.userName));
    dispatch(setProfilePicture(data.profilePicture));
    return {
      status,
      message: data.message,
      success: data.success,
    };
  } catch ({ response }) {
    return {
      status: response.status,
      message: response.data,
      success: response.data.success || false,
    };
  }
};
