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
  },
});

export const selectUsername = (state) => state.user.username;

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (username) => (dispatch) => get(`${API_URL}/user/${username}`)
  .then(({ data }) => dispatch(setUsername(data.username)));

export const registerUser = (username) => (dispatch) => post(`${API_URL}/user`, { userName: username })
  .then(({ data }) => dispatch(setUsername(data)));
