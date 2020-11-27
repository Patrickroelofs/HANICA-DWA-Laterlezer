import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'user',

  initialState: {

  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = registerSlice.actions;
export default registerSlice.reducer;
