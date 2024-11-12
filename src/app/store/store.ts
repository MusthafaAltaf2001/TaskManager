import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice"
import { undoable } from 'redux-undo-action'
import userReducer from "./slices/userSlice";

/**
 * Redux global state management 
 * Combined reducers into one global state
 */

export const store = configureStore({
  reducer: {
    user: userReducer,
    // By wrapping in undoable, it allows any reducer inside the tasks to be reverted to a previous state
    tasks: undoable(tasksReducer)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
