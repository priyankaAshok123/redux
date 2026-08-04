import type { FC } from "react"


interface HeaderProps {
    cartCount: number,
    cartItems: [],
    setOpenModal:any
}

const Header: FC<HeaderProps> = ({ cartCount, cartItems, setOpenModal }) => {
   {console.log(cartItems, 'cartItems')}
  return (
    <div>
        <p>Logo</p>
       
        <div>
            <div onClick={() => setOpenModal(true)}>{cartCount}Cart Items</div>
        </div>
    </div>
  )
}

export default Header