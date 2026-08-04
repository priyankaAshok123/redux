
import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div>
      <Cart cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  );
}

export default App;

