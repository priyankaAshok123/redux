/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, nanoid, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
import axios from "axios";

// const initialState = {
//   posts: [
//     {
//       id: '1',
//       title: "Learning redux toolkit",
//       content: "I have heard good things",
//       date: sub(new Date(), { minutes: 10 }).toISOString(),
//       reactions: {
//         thumpsUp: 0,
//         wow: 0,
//         heart: 0
//       }
//     },
//     {
//       id: '2',
//       title: "Learning redux toolkit 0.1",
//       content: "More things about redux!",
//       date: sub(new Date(), { minutes: 5 }).toISOString(),
//       reactions: {
//         thumpsUp: 0,
//         wow: 0,
//         heart: 0
//       }
//     }
//   ],

//   names: ["saa", "sssaas"],   // 👉 your new extra state
//   count: 0,                   // you can keep adding more
//   text: "",
// };

const initialState = {
  posts : [],
  status : 'idle', // status of API
  error : null, // if API fails,
  names: ["saa", "sssaas"],
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(_, thunkAPI) => {
  // posts/fetchPosts : prefix for the generated type => sliceNAme/actionName
  // second : callback whch is a promise should return some data or reject promise with error
  try {
    const response = await axios.get(BASE_URL)
    // return [...response.data] => or as below
    return response.data
  }
  catch(err:any) {// send custom error payload → goes to rejected case

      return thunkAPI.rejectWithValue(err?.message);
  }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async(initialPost, thunkAPI) => {
  // posts/fetchPosts : prefix for the generated type => sliceNAme/actionName
  // second : callback whch is a promise should return some data or reject promise with error
  try {
    const response = await axios.post(BASE_URL, initialPost)
    // return [...response.data] => or as below
    return response.data
  }
  catch(err:any) {// send custom error payload → goes to rejected case

      return thunkAPI.rejectWithValue(err?.message);
  }
})

const postsSlice = createSlice({
  name: "posts",
  // this is my sliceName
  // name is internally used to prefix the actionTypes : posts/setTodoAdd
  initialState,
  reducers: {
    // setPostAdded(state, action:PayloadAction<any>){
    //     state.posts.push(action.payload)
    // },
    // Older setPostAdded : will convert this into prepare 

    setPostAdded: {
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumpsUp: 0,
              wow: 0,
              heart: 0
            }
          }
        }
      },
      reducer(state, action: PayloadAction<any>) {
        state.posts.push(action.payload)
      }
    },
    setReactions(state, action: PayloadAction<any>) {
      const { postId, reaction } = action.payload;
      const existingPosts = state.posts.find((post: any) => post.id === postId);
      if (existingPosts) {
        existingPosts.reactions[reaction]++;
      }
    },
    setText(state, action: PayloadAction<any>) {
      state.names = action.payload
    }
  },
    extraReducers: (builder) => {
      builder
      .addCase(fetchPosts.pending, (state:any,action:any) => {
        state.status = 'idle',
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state:any,action:any) => {
        // or add date reactions in action.paylaod.date and push them inside state.posts.push(action.paylaod)
        state.status = 'success',
        state.posts = action.payload.map((post: any) => ({
        ...post,
        date: new Date().toISOString(),
        reactions: {
          thumpsUp: 0,
          wow: 0,
          heart: 0,
        },
      }));
        state.error = null
      })
        .addCase(fetchPosts.rejected, (state:any,action:any) => {
        state.status = 'rejected';
        if(action?.payload){
         state.error = action.payload as string
        } else {
          state.error = action.error.message ?? 'something went wrong'
        }
      })
      .addCase(addNewPost.fulfilled, (state,action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumpsUp: 0,
          wow: 0,
          heart: 0,
        }

        state.posts.push(action.payload)
      })
    }
})

export const { setPostAdded, setText, setReactions } = postsSlice.actions
export default postsSlice.reducer