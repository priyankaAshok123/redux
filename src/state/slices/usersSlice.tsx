/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState:any = []

const user_url = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk('posts/fetchUsers' , async(_, thunkApi) => {
    try {
        const response = await axios.get(user_url)
        return [...response?.data];
    } catch(err) {
        return thunkApi.rejectWithValue(err)
    }
})
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload

            //  return action.payload => completedly overwridin the state or we can do use push to add anyother users
        })
    }
})
export const selectAllUsers = (state:any) => state.users;

export const selectAllUsersById = (state:any, userId:any) => state.users.find((user:any) => user.id  === userId)
export default usersSlice.reducer