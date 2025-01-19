// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice=createSlice({
//     name:'user',initialState:{
//         user:null
//     },reducers:{
//         setUser:(state,action)=>{
//             state.user=action.payload
//         }
//     }
// })
// export const {setUser}=userSlice.actions;

// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setNotifications: (state, action) => {
      if (state.user) {
        state.user.notification = action.payload.unreadNotifications;
        state.user.seennotification = action.payload.readNotifications;
      }
    },
  },
});

export const { setUser, setNotifications } = userSlice.actions;
