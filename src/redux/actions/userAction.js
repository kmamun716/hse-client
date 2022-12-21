import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import setAuthToken from "../../lib/setAuthToken";

export const getSingleUser = createAsyncThunk('user/getSingleUser', async(navigate)=>{
    setAuthToken();
    try{
        const user = await axios.get('http://localhost:4000/api/v1/user/singleUser');
        return user.data;
    }
    catch(err){
        console.log(err)
        localStorage.removeItem('authToken');
        navigate('/login')
    }
});

export const editUser = createAsyncThunk('user/edit', async (data)=>{
    setAuthToken();
    const update = await axios.put(`http://localhost:4000/api/v1/user/${data.id}`, data.data);
    return update.data;
});