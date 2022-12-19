import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import setAuthToken from "../../lib/setAuthToken";

const authToken = localStorage.getItem('authToken');

export const getSingleUser = createAsyncThunk('user/getSingleUser', async(navigate)=>{
    setAuthToken(authToken);
    try{
        const user = await axios.get('http://localhost:4000/api/v1/user/singleUser');
        return user.data;
    }
    catch(err){
        localStorage.removeItem('authToken')
        navigate('/login')
    }
});

export const editUser = createAsyncThunk('user/edit', async (data)=>{
    setAuthToken(authToken);
    const update = await axios.put(`http://localhost:4000/api/v1/user/${data.id}`, data.data);
    return update.data;
});