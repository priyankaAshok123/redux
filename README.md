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




# GIT 
```
SCENARIO-1 => When u commited to wrng branch
Revert last commit => git reset --hard HEAD~1
Check logs - git log / git log --oneline -1 (-1 numer of commits)
Single commit pick - git cherry-pick commit-hash

Example
    git checkout main => pick commit from here
    git checkout feature => commit in this branch with cherry-pick
    git checkout main => revert the picked commit with git reset 


SCENARIO-2 => You made the last commit you want to remove it and discard changes
git reset --hard HEAD~1 => permanently remove the changes

SCENARIO-3
Difference git reset and git revert
reset ( dangerous ) revert (safe)
a-b-c-d-e => a-b-c-d => git reset will remove e changes and changes after e NOW HEAD is pointing to D

a-b-c-d-e => a-b-c-d-r => creates a new commit (R) that undoes changes of E ( history is safe)
Prefer git revert if PUSHED since others might have pulled
Prefer git reset /revert if just commited locally

revert multiple commits similar to cherry-pick syntaxes =>> 

SCENARIO-4
cherry-pick multiple commits => 
1. git cherry-pick d5bd28f 6eceb12 0a52808
2.Cherry-pick commits individually
3.git cherry-pick d5bd28f^..0a52808 ( parent - child)

SCNERAIO-5
How to squash multiple commits into 1

git rebase -i HEAD~3
=> editor 
1. Keep first one as pick
2. change others to squash/s
3. add come msg => i insert= :wq save and exit= :q quit
4. git log --oneline

if already pushed => git push --force-with-lease origin feature/scenario

SCENARIO-6

git merge => will keep all history and create a merge commit 
a-b-c-d
        e-f-g 
        after merge => a-b-c-d-h ( h will merge e-f-g into h aligning it with respect to main branch)
git rebase => 

SCENARIO => temporarily saves the uncommited changes
Git can store many stashes until you delete them.

git stash
git pop

git stash push -m  "stash1"
git stash push -m "stash1"

git stash list

apply=>applies changes but keeps stash

git stash apply
git stash apply stash2


remove-> applies changes but removes stash

git stash pop
git stash pop stash2

Remove specfic stash

git stash drop stash2


#remove all stashes

git stash clear
```
