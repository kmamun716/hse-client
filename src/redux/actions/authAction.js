import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const registerUser = createAsyncThunk('auth/register', async(data)=>{
    try{
        const user = await axios.post('http://localhost:4000/api/v1/user/register', data);
        return user;
    }catch(err){
        return err.response;
    }
});

export const loginUser = createAsyncThunk('auth/login', async(data)=>{
    try{
        const user = await axios.post('http://localhost:4000/api/v1/user/login', data);
        localStorage.setItem('authToken', user.data.token);
        return user.data;
    }
    catch(err){
        return err.response;
    }
});