import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './PostCardSlice';
import { useParams } from 'react-router-dom';
import { selectAllUsers } from '../../state/slices/usersSlice';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    // retrieve postID from URL: 
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <>
            <div className="postcard">
                <h4>{post?.title}</h4>
                <p>{post?.body}</p>
                <p>by {users?.find((item: any) => item?.id === post?.userId)?.name}</p> {post?.date}
                <Link to={`/post/edit/${post?.id}`} >Edit Post</Link>
            </div>

        </>

    )
}

export default SinglePostPage