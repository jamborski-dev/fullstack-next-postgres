import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { User } from "../../types/auth"

export interface AuthState {
  user: null | User
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    signOut: state => {
      state.user = initialState.user
    }
  }
})

export const { signIn, signOut } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
