import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * Reducers for handling user states
 */

interface UserState {
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("setting user - ", action.payload);
      state.user = action.payload;
      // Persist to localStorage
      // localStorage.setItem("userData", JSON.stringify(action.payload.user));
    },
    clearUser: (state) => {
      state.user = null;
      // Clear from localStorage
      // localStorage.removeItem("userData");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
