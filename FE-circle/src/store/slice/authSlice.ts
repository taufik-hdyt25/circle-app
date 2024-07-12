


import {createSlice} from '@reduxjs/toolkit'
import { IProfile } from '../../interface/user.interface'

const initialState : IProfile = {

  user: {
    id: 0,
    email: "",
    createdAt: "",
    fullname: "",
    password: "",
    profile_description: "",
    profile_picture: "",
    username: "",
  },
  followers: [],
  followings: [],
  message: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_CHECK : (_,action)=> {
      const payload = action.payload
      const user :IProfile ={
        user: {
          id: payload.user.id,
          email: payload.user.email,
          createdAt: payload.user.createdAt,
          fullname: payload.user.fullname,
          password: payload.user.password,
          profile_description: payload.user.profile_description,
          profile_picture: payload.user.profile_picture,
          username: payload.user.username,
        },
        followers: payload.followers,
        followings: payload.followings,
        message: payload.message

      }
      return user
    },

    AUTH_ERROR: ()=> {
      localStorage.removeItem("token")
    },

    AUTH_LOGOUT: ()=> {
      localStorage.removeItem("token")
    }
  }
})