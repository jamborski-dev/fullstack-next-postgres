import { configureStore } from "@reduxjs/toolkit"
import devReducer from "./slices/dev"
import authReducer from "./slices/auth"

export const store = configureStore({
  reducer: {
    dev: devReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
