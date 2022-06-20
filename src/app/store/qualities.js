import { createSlice } from '@reduxjs/toolkit';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  }
});

const { reducer: qualitiesReducer } = qualitiesSlice;

export default qualitiesReducer;
