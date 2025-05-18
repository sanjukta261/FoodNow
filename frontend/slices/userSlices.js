import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canteen: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCanteen: (state, action) => {
      state.canteen = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setCanteen, setRole } = userSlice.actions;
export default userSlice.reducer;
