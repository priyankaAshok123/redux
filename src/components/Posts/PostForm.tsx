/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, setPostAdded } from "../../state/slices/postsSlice";
import { selectAllUsers } from "../../state/slices/usersSlice";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // Alt + down arrow to copy 
    const [userId, setUserId] = useState('');
    const [requestStatus, setRequestStatus] = useState('idle');
    const dispatch = useDispatch();

    // const users = useSelector((state:any) => state?.users);
    // since i have already sent selectAllUsers
        const users = useSelector(selectAllUsers);

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle';


    const handleSave = () => {
        // const newData = {
        //     id: nanoid(),
        //     title: title,
        //     content: content
        // }
        // dispatch(setPostAdded(newData))
        // Now lets move this part of code to slice using prepare

        // if(title && content) {
        //     dispatch(setPostAdded(title, content, userId))
        //     setTitle('')
        //     setContent('')
        // }

        if(canSave) {
            try{
                setRequestStatus('pending')
                dispatch(addNewPost({title, body: content, userId}))
                  console.log("SUCCESS");
                setTitle('')
                setContent('')
                setUserId('')
            } catch(err) {
                console.error('Failed to save the post', err)
            }finally{
                setRequestStatus('idle')
            }
        }
    }

    const handleOnchangeContent = (e: any) => {
        const val = e?.target?.value;
        setContent(val)
    }

    const handleOnchangeTitle = (e: any) => {
        const val = e?.target?.value;
        setTitle(val)
    }

    const handleOnAuthorChanged = (e: any) => {
        const val = e?.target?.value;
        setUserId(val)
    }

    const userOptions = users?.map((user:any) => (
        <option key={user?.id} value={user?.id}>{user.name}</option>
    ))

    return (
        <div>
            <form>
                {/* defaut form submit trggers page refresh so add e.preventDefault() */}
                <label>Add Posts</label>
                <input placeholder="Add title" value={title} onChange={(e) => handleOnchangeTitle(e)} />
                <input placeholder="Add Content" value={content} onChange={(e) => handleOnchangeContent(e)} />
                <select onChange={(e) => handleOnAuthorChanged(e)} value={userId}>
                    <option value="Choose Author">Choose Author</option>
                    {userOptions}
                </select>
                <button  disabled={!canSave} onClick={(e) => { e.preventDefault(); handleSave(); }}>
                    Save Post
                </button>
            </form>
        </div>
    )
}

export default PostForm