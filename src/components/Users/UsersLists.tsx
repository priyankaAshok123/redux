/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../state/slices/usersSlice'
import { Link } from 'react-router-dom';

const UsersLists = () => {
  const users = useSelector(selectAllUsers);
  const renderedUsers = users.map((user:any) => (
    <li>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ))
  return (
    <ul>{renderedUsers}</ul>
  )
}

export default UsersLists