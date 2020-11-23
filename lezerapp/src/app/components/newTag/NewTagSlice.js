import { createSlice } from '@reduxjs/toolkit';

const newTagSlice = createSlice({
  name: 'user',
  tags: [],

  initialState: {

  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = newTagSlice.actions;
export default newTagSlice.reducer;
