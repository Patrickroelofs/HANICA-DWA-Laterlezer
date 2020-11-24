import { createSlice } from '@reduxjs/toolkit';

const newTagSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = newTagSlice.actions;
export default newTagSlice.reducer;
