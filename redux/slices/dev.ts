import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface DevState {
  role: string
}

// Define the initial state using that type
const initialState: DevState = {
  role: "admin"
}

export const devSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    }
  }
})

export const { switchRole } = devSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDevRole = (state: RootState) => state.dev.role

export default devSlice.reducer
