import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'user',

  initialState: {

  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = loginSlice.actions;
export default loginSlice.reducer;
