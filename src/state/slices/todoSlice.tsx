import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TodoItem = {
    task : string,
    status:string
}


interface TodoState {
    todoText: string;
    todoList: TodoItem[];
}

const initialState: TodoState = {
    todoText: '',
    todoList: []
};

export const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {
        setTodoText:(state, action:PayloadAction<string>) => {
            state.todoText = action.payload
        },
        setTodoList:(state, action:PayloadAction<TodoItem[]>) => {
            state.todoList = action.payload
        },
            setAddTodo:(state, action:PayloadAction<TodoItem>) => {
                // This is possible here as RTK internannlly allows u touodate the state directy
            state.todoList.push(action.payload)
            // You are not pushing into real Redux state.
            // You are pushing into a draft state created by Immer.
        }
    }
})

export const { setTodoText, setTodoList,setAddTodo } = todoSlice.actions

export default todoSlice.reducer