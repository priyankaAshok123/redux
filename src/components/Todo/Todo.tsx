import { useDispatch, useSelector } from "react-redux";
import { setTodoText, setTodoList, setAddTodo } from "../../state/slices/todoSlice";
/* eslint-disable @typescript-eslint/no-explicit-any */

const Todo = () => {
    const dispatch = useDispatch();
    const todoText = useSelector((state: any) => state.todo.todoText);
    const todoList = useSelector((state: any) => state.todo.todoList);

    const handleAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value;
        dispatch(setTodoText(value))
    };

    const handeSubmit = () => {
        // if not

        // create a new Object and append that to a new Array and pass that arrya to setTodoLst[]
        // directly updating the state as we are doing push in slice
        dispatch(setAddTodo({
            task: todoText,
            status: "pending"
        }))
    }

    const handleDelete = (index: number) => {
        const deleteItems = todoList?.filter((i: any, idx: number) => idx !== index);
        dispatch(setTodoList(deleteItems))
    }

    const handleMarkComplete = (index: number) => {
        const markComplted = todoList?.map((i: any, idx: number) => idx === index ? { ...i, status: i.status === 'pending' ? 'completed' : "pending" } : i);
        dispatch(setTodoList(markComplted))
    }

    const handleAddBackToPending = (index: number) => {
        // get the index of clicked complted list
        const completedItem = completedLists[index];

        // find the index which matches with the task
        const originalIndex = todoList.findIndex(
            (item: any) => item.task === completedItem.task
        )

        // update its status to pending so that it can be remmoved from completed lists
        const addBack = todoList?.map((i: any, idx: number) => idx === originalIndex ? { ...i, status: 'pending' } : i);
        dispatch(setTodoList(addBack))

    }
    const completedLists = todoList.filter((i: any) => i.status !== 'pending');

    return (
        <div>
            <p>Add Todo</p>
            {/* <input type="text" onChange={(e) => handleAddTodo(e)} />   */}
            {/* this form of input is uncontrolled when we pass the value we can controll it */}
            <input type="text" onChange={(e) => handleAddTodo(e)} value={todoText} />

            <button onClick={() => handeSubmit()}>Submit</button>
            {
                todoList?.map((item: any, index: number) => (
                    <div>
                        {index + 1}. <span style={{ textDecoration: item?.status === 'completed' ? 'line-through' : '' }}>{item?.task}</span> --- <button onClick={() => handleDelete(index)}>DELETE</button>
                        <button onClick={() => handleMarkComplete(index)}>{item?.status === 'completed' ? "COMPLETED" : 'MARK COMPLETED'}</button>
                    </div>
                ))
            }

            <p>Completed Lists:</p>
            {
                completedLists?.map((item: any, index: number) => (
                    <div>
                        {item?.task} -- {item.status}
                        <button onClick={() => handleAddBackToPending(index)}>Add Back to todo</button>
                    </div>
                ))
            }

        </div>
    )
}

export default Todo