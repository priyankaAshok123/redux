import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const initialState = {
  // since my reducer name in strore is postcard : an state is posts to fetch posts => state.postcard.posts
  posts: [],
  status : "idle",
  count : 0
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
// Lets create a thunk for fetching the posts !!

export const fetchPosts = createAsyncThunk('postcard/fetchPosts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data]
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})


export const addNewPost = createAsyncThunk('postcard/addNewPost', async (initialPost, thunkAPI) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    console.log(initialPost, response?.data, 'lll')
    // response.data as we get single data
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const updatePost = createAsyncThunk('postcard/updatePost', async (initialPost, thunkAPI) => {
  const { id } = initialPost
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    console.log(initialPost, response?.data, 'lll')
    // response.data as we get single data
    return response.data
  } catch (err) {
    return initialPost
  }
})

export const deletePost = createAsyncThunk('postcard/deletePost', async (initialPost, thunkAPI) => {
  const { id } = initialPost
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if(response?.status === 200) return initialPost;
    return `${response?.status} : ${response?.statusText}`
    // response.data as we get single data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})


const postCardSlice = createSlice({
  name: "postCard",
  initialState,
  reducers: {
    increaseCount(state, action) {
      state.count = state.count + 1
    },
    setAddNewPost: {
      prepare(title, body) {
        return {
          payload: {
            title,
            body,
            date: new Date().toISOString(),
          }
        }
      },
      reducer(state, action: PayloadAction<any>) {
        state.posts.push(action.payload)
      }
    },
    // In order to sort based on date we add we can insert a date 
    // --> Common way of adding a newPost we can use prepare in order to append any extrernall
  },
  // now even after API is called : but no data is stored
  // without extraReducers, your thunk result will never be stored in state.
  // In order to update the state we need to call extraRedcuers
  // Builder is an Object  inside ExtraReducers, which will help write reducers
  // Builder will help in formaing chain of methods

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload?.map((item: any) => ({
          ...item,
          date: new Date().toISOString()
        }))
        // keep existing values and den add date

        // action.payload.date = new Date().toISOString()
        // state.posts.push(action.payload)
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        state.posts.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if(!action?.payload?.id) {
          return;
        }
        const { id } = action?.payload;

        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post:any) => post.id !== id);
        // post which we edited only 
        state.posts = [...posts, action?.payload]
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if(!action?.payload?.id) {
          return;
        }
        const { id } = action?.payload;

        const posts = state.posts.filter((post:any) => post.id !== id);
        // post which we edited only 
        state.posts = posts
      })
  }
})


export const selectAllPosts = (state: any) => state.postcard.posts;
export const getPostsStatus = (state: any) => state.postcard.status;
export const getPostsError = (state: any) => state.postcard.error;
export const getCount = (state:any) => state.postcard.count;


// Fetch Posts by ID this is diffeent type of  new selector

export const selectPostById = (state: any, postId: number) =>
  state?.postcard?.posts?.find((post: any) => post.id === postId);

export const selectPostsByUserId = createSelector(
  [selectAllPosts, (_state, userId: number) => userId],
  (posts, userId) => posts.filter((post:any) => post.userId === userId)
);




  // state.postcard.posts.find((post:any) => console.log(post));
// we want to get single POST with respect to ID
export const { setAddNewPost, increaseCount } = postCardSlice.actions;
// the above line returns the function but no returned value =>postCard is the key used in store
export default postCardSlice.reducer;