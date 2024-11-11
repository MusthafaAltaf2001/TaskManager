import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tasksReducer from "./slices/taskSlice"
import { undoable } from 'redux-undo-action'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: undoable(tasksReducer)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
