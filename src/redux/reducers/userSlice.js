import { createSlice } from '@reduxjs/toolkit';
import { editUser, getSingleUser } from '../actions/userAction';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: {},
        message: ''
    },
    reducers:{
        refetch: ()=>{
            getSingleUser()
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getSingleUser.pending, (state)=>{
            state.isLoading = true
            state.message=''
        });
        builder.addCase(getSingleUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.message = ''
        });
        builder.addCase(editUser.pending, (state)=>{
            state.isLoading = true;
            state.message = ''
        });
        builder.addCase(editUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.message = action.payload.message
        })
    }
});

export const {refetch} = userSlice.actions;

export default userSlice.reducer;