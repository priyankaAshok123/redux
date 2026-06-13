/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../../state/slices/usersSlice';
import { addNewPost, deletePost, selectPostById, updatePost } from './PostCardSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditPostForm = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate()
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const handleTitleChange = (e: any) => {
        const value = e?.target?.value;
        setTitle(value)
    }
    const handleContentChange = (e: any) => {
        const value = e?.target?.value;
        setContent(value)
    }
    const handleAuthorChange = (e: any) => {
        const value = e?.target?.value;
        setUserId(Number(value))
    }

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const handleSavePost = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                // Here i have to add post to posts state
                //  dispatch(setAddNewPost(title, content))
                dispatch(updatePost({ id: post?.id, title, body: content, userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }
            catch (err) {
                console.error("Failed to save the data")
            }
            finally {
                setRequestStatus('idle')
            }

        }
    }


    const handleDeletePost = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                // Here i have to add post to posts state
                //  dispatch(setAddNewPost(title, content))
                dispatch(deletePost({ id: post?.id })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/`)
            }
            catch (err) {
                console.error("Failed to delete the Post")
            }
            finally {
                setRequestStatus('idle')
            }

        }
    }

    const renderOptions = users?.map((item: any) => <option key={item?.id} value={item?.id}>{item?.name}</option>)


    return (
        <div className="form">
            <input type="text" value={title} onChange={(e) => { handleTitleChange(e) }} placeholder='Add title' />
            <input type="text" value={content} onChange={(e) => { handleContentChange(e) }} placeholder='Add Content' />
            <select onChange={(e) => { handleAuthorChange(e) }} defaultValue={userId}>
                <option value="Choose Author">Choose Author</option>
                {renderOptions}
            </select>
            <button onClick={() => handleDeletePost()} className='postBtn'>Delete Post</button>

            <button onClick={() => handleSavePost()} className='postBtn' disabled={!canSave}>  {!canSave ? "🔒 Save Post" : "Save Post"}</button>
        </div>
    )
}

export default EditPostForm