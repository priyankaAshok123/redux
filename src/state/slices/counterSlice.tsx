import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    count : 0,
    isPaymentButtonClicked: false
}

// This is the default state slice

export const counterSlice  = createSlice({
    name : 'counter',
    // This is the counter name used to define actionTypes internally by RTK => counter/setIncrement
    initialState,
    reducers: {
        // Reducers are the functions which is used to change the state = > return new state 
        // Mutating slice directly which was not possible in Redux: RTK internally uses IMMER to convert immutable updates safely
        setIncrement: (state, action:PayloadAction<boolean>) => {
            // boolean : here we can pass out own types too
            state.count+=1;
            state.isPaymentButtonClicked = action.payload
        },
        setDecrement: (state, action:PayloadAction<boolean>) => {
            state.count = state.count > 0 ? state.count - 1 : 0;
            state.isPaymentButtonClicked = action.payload
        }
    } 
})

export const {setIncrement, setDecrement} = counterSlice.actions;
// Redux automatically creates actions for reducers

export default counterSlice.reducer;
// Exporting Reducer here to be passed to the store 