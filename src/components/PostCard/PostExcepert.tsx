/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../state/slices/usersSlice';
import { Link } from 'react-router-dom';
import React from 'react';

let PostExcepert = ({post}) => {
      const users = useSelector(selectAllUsers);
  return (
    <div> <div className="postcard">
            <h4>{post?.title}</h4>
            <p>{post?.body}</p>
            <p>by {users?.find((item: any) => item?.id === post?.userId)?.name}</p> {post?.date}
            <Link to={`post/${post.id}`}>View Post</Link>
          </div></div>
  )
}
PostExcepert = React.memo(PostExcepert)

// Not re render if the prop POST we passed dsnt not change

export default PostExcepert