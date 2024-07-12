import {combineReducers} from '@reduxjs/toolkit'
import { authSlice } from './slice/authSlice'


export const {AUTH_CHECK,AUTH_ERROR,AUTH_LOGOUT} = authSlice.actions
export const authReducer = authSlice.reducer


const RootReducer = combineReducers({
  auth: authSlice.reducer
})

export default RootReducer