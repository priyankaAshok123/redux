/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../../state/slices/postsSlice';
import PostForm from './PostForm';
import PostAuthor from './PostsAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';
import { useEffect } from 'react';
import { fetchPosts } from '../../state/slices/postsSlice';

const PostsLists = () => {
    const posts = useSelector((state: any) => state.posts?.posts);
    const names = useSelector((state: any) => state.posts.names);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts())
    },[])

    const orderedPosts = posts.slice().sort((a:any,b:any) => b.date.localeCompare(a.date));
    
    const renderedPosts = orderedPosts?.map((item: any) => (
        <article key={item?.id}>
            <h3>{item?.title}</h3>
            <p>{item?.body}</p>
            <div>
                <PostAuthor userId={item.userId}/>
                <TimeAgo timeStamp={item.date}/>
                <ReactionsButton post={item}/>
            </div>
        </article>
    ))

    const handleBadPush = () => {
        console.log("Before push:", names);
        // Not allowed at all push returns the length not array item
        // const h = names.push("❌ Added from component (WRONG)");

        const newItem = ["priya"]
        const h1 = [...names, ...newItem]
        dispatch(setText(h1)) // dispacth happens but react has not re-rendered yet

        // Redux state does not update immediately inside the same function.
        // namescomes fromstore so React does NOT re-render immediately after dispatch.
        console.log("After push:", names); // still old value will update on second click for 1st instance

        // React will update it immedately but componet only receives on re-render
    };

    return (
        <div>
            <h3>Posts</h3>
            <button onClick={handleBadPush}>Push in Component ❌</button>
            -----------------------------
            <PostForm />

            {renderedPosts} 

        </div>

    )
}

export default PostsLists