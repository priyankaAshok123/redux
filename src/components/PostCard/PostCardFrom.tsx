/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, setAddNewPost } from './PostCardSlice';
import { selectAllUsers } from "../../state/slices/usersSlice";
import { useNavigate } from 'react-router-dom';

const PostCardFrom = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
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
        setUserId(value)
    }

    console.log(requestStatus, 're..?')
    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';
    console.log(canSave, 'hh')
 const navigate = useNavigate()
    const handleSavePost = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                // Here i have to add post to posts state
                //  dispatch(setAddNewPost(title, content))
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }
            catch (err) {
                console.error("Failed to save the data")
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
            <select onChange={(e) => { handleAuthorChange(e) }} value={userId}>
                <option value="Choose Author">Choose Author</option>
                {renderOptions}
            </select>
            <button onClick={() => handleSavePost()} className='postBtn' disabled={!canSave}>  {!canSave ? "🔒 Save Post" : "Save Post"}</button>
        </div>
    )
}

export default PostCardFrom