import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authAction";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        data:{},
        error:{}
    },
    reducers:{
        emptyData:(state)=>{
            state.data={};
        },
        logOut: (state)=>{
            localStorage.removeItem('authToken');
            state.data={};
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            if(action.payload.status !== 400){
                state.data = action.payload.data;
                state.error ={}
            }else{
                state.data = {};
                state.error= action.payload.data
            }
        });
        builder.addCase(loginUser.pending, (state)=>{
            state.isLoading = true
        });
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            if(action.payload.status !== 404){
                state.data = action.payload;
                state.error = {};
            }else{
                state.data = {};
                state.error = action.payload.data;
            }
        })
    }
});

export const {emptyData, logOut} = authSlice.actions;
export default authSlice.reducer;