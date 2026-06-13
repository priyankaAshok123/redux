/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { setDecrement, setIncrement } from "../../state/slices/counterSlice";

const Counter = () => {
    const count = useSelector((state:any) => state.counter.count);
    const isClicked = useSelector((state: any) => state.counter.isPaymentButtonClicked);
     const appDispatch = useDispatch();
    
    const increment = () => {
        appDispatch(setIncrement(true))
    }

    const decrement = () => {
        appDispatch(setDecrement(false));
    }
    return (
        <div>
            <p>Count : {count} : Increment button clicked : {isClicked ? "Yes" : "No"}</p>
            <button onClick={() => increment()}>Increment</button>

            <button onClick={() => decrement()}>Decrement</button>

        </div>
    )
}

export default Counter;