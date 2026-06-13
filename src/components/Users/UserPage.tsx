/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers, selectAllUsersById } from '../../state/slices/usersSlice'
import { Link, useParams } from 'react-router-dom';
import { selectAllPosts } from '../PostCard/PostCardSlice';
import { selectPostsByUserId } from '../PostCard/PostCardSlice';

const UserPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const user = useSelector(state => selectAllUsersById(state, Number(userId)));

    const postsUser = useSelector(state => selectPostsByUserId(state, Number(userId)))

    // useSlelctor is running eveythime a action dispatced increasae count ->forcing the component to re render:fix using memoized seelctor

    const PostTitle = postsUser.map((post: any) => (
        <li>
            <Link to={`/post/${post.id}`}>{post.title}
            </Link>        </li>
    ))
    return (
        <section>
            {user.name}
            <ol>{PostTitle}</ol>
        </section>

    )
}

export default UserPage