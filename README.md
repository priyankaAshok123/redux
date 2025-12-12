# React & Redux Toolkit – Clean Notes

## Why useEffect Runs Twice in Development
If your app is wrapped in **<React.StrictMode>**, then:
- `useEffect(() => {}, [])` runs **twice**
- API calls inside that effect run twice
- `dispatch(fetchPosts())` runs twice

This happens for all components using `[]`.

## Redux Hooks: useSelector & useDispatch
### useSelector
Used to read data from the Redux store.

### useDispatch
Gives access to the dispatch() function. It tells Redux to run a reducer and update the state.

## Data Flow Diagram
```
React Component → useSelector/useDispatch → Redux Store → Reducer → State Update → UI Re-render
```

## Why Mutation Works Inside Slices (Immer)
Inside slices, `state.posts.push()` works because Immer:
- Creates draft state
- Tracks mutation
- Converts it to immutable update
- Updates Redux correctly

Direct mutation in components will NOT work.
Inside reducers you can mutate state directly (e.g., state.loading = true) because Redux Toolkit uses Immer to convert mutations into immutable updates automatically. You may also return a new state object — both are allowed, but don't mix returning a new state object and mutating (choose one style per case).

## Reducer + Prepare Callback
Prepare helps:
- Move logic out of components
- Generate IDs, timestamps
- Clean and simplify dispatch calls
1. fucntion that runs when u call action creator
2. dispatch(setAddtodo()) => dispacth is a action and setAddTodo is a action creator
3. returns Payload : it passes multiple arguments to action creatore and transform them into a single payload object
4. REDUCER : updates state when action reaches it
5. have optional meta and error 
6. async logic not allowed here
7. 

Sequence:
1. dispatch()
2. prepare() runs
3. RTK creates action object
4. reducer updates state

## Example
```
setPostAdded : {
    reducer(state, action) {
        state.posts.push(action.payload)
    },
    prepare(title, content) {
        return {
            payload: {
                id: nanoid(),
                title,
                content
            }
        }
    }
}
```

## createAsyncThunk
a piece of code that does a delayed work
handles Async logic : APIS

**If the response is needed across screens → use Redux thunk. --> If needed only in same component → do NOT use thunk.**
1. Updates global Redux state
2. Needs loading, success, error UI
3. Multiple components need the same data
4. You want to avoid useEffect + API calls in many components

## Unwrap
Supports `.unwrap()` to access resolved/rejected values.
dispatch(addNewPost({title, body: content, userId})).unwrap()
Only for async thunks created using createAsyncThunk
But sometimes you want to treat the dispatch like a real async function — for example, to:

1. show success message
2. handle errors with try/catch
3. navigate after success
4. close a modal only if API succeeds
This is where unwrap() helps. => unwrap() simplifies the RTK response by returning the real API data and converting errors into normal exceptions.


## When to Use Thunks
| API Type                                | Best Choice           |
| --------------------------------------- | --------------------- |
| Global shared data                      | **createAsyncThunk**  |
| Local screen-only data                  | **useEffect + axios** |
| Data that needs caching/infinite scroll | **React Query**       |
| Simple global flags                     | normal Redux reducers |


```js
createAsyncThunk("sliceName/actionName", async (payload, thunkAPI) => {
    // do async work
})
```

## extraReducers & Builder
Used to handle:
- async thunks
- actions from other slices
- created by createAsyncThunk
-

## Builder
Builder is a {} created by RTK
Builder helps in writing reducers in slice
Builder callback style is recommnd
Builder helps in adding chain of methods
Builder has 
1. addcase(method, callback) => handles single action
2. addMatcher(method, callnack) => handles multiple actions

Example:
```
extraReducers: (builder) => {
  builder
   .addCase(fetchUsers.pending, (state) => {})
   .addCase(fetchUsers.fulfilled, (state, action) => {})
   .addCase(fetchUsers.rejected, (state, action) => {})
}
```

createAsyncThunk("posts/fetchPosts")
           |
           |--- dispatch(fetchPosts())
           |
Redux Toolkit auto-generates: action types
   - posts/fetchPosts/pending
   - posts/fetchPosts/fulfilled
   - posts/fetchPosts/rejected

extraReducers(builder):
           |
           |--- builder.addCase(pending)  → loading UI
           |
           |--- builder.addCase(fulfilled) → success UI + data
           |
           |--- builder.addCase(rejected) → show error



+-----------------------+          +-----------------------+
|   React Component     |          |       Redux Store      |
+-----------------------+          +-----------------------+
            |                                   ^
            | dispatch(action)                  |
            v                                   |
+-----------------------+                       |
|     useDispatch       |                       |
+-----------------------+                       |
            |                                   |
            v                                   |
+--------------------------------------------------------------+
|                      Reducers / extraReducers                 |
|  - reducers handle sync actions                               |
|  - extraReducers handle async actions (thunks)                |
|  - prepare() shapes payload before reducer runs               |
|  - Immer allows mutating code (state.x = 1)                   |
+--------------------------------------------------------------+
            |                                   ^
            | updates state (via Immer)         |
            v                                   |
      +------------------+                      |
      |   Updated State  | ---------------------
      +------------------+
            |
            | read state
            v
+-----------------------+
|     useSelector       |
+-----------------------+
            |
            v
   Component Re-renders

