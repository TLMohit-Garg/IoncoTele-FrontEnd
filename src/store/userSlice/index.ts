import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  // Add other user-related state properties if needed
}

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    // Add other reducers if needed
  },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
