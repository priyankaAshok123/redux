import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./slices/counterSlice";
import todoReducer from "./slices/todoSlice";
import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";
import postsCardReducer from "../components/PostCard/PostCardSlice";

const store = configureStore({
    reducer : {
        // counter : counterReducer,
        // todo : todoReducer,
        // posts: postsReducer,
        users : usersReducer,
        postcard : postsCardReducer
        // posts key inisde a reducer here indicates how your state tree looks 
    }
})

export default store;