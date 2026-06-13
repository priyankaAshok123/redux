import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCount, increaseCount } from './PostCard/PostCardSlice'

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount)
  return (
    
   <header>
    <h1>Redux Posts Blog</h1>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="post">Post</Link></li>
            <li><Link to="user">User</Link></li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
    </nav>
   </header>
  )
}

export default Header