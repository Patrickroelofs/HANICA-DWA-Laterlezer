import { createSlice } from '@reduxjs/toolkit';

const tagListSlice = createSlice({
  name: 'tagList',
  initialState: {
    selectedTags: [],
  },
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
  },
});

export const { setSelectedTags } = tagListSlice.actions;
export default tagListSlice.reducer;
