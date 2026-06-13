import React, { useEffect, useState, useMemo } from 'react'
import PostCardFrom from './PostCardFrom'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostsStatus, selectAllPosts } from './PostCardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from "../PostCard/PostCardSlice";
import { selectAllUsers } from '../../state/slices/usersSlice';
import { Link } from 'react-router-dom';
import Header from '../Header';
import PostExcepert from './PostExcepert';
import axios from 'axios';
interface postType {
  userId: any;
  id: number,
  title: string,
  body: string,
  date: number
}

const PostCardLists = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(getPostsStatus);
  console.log(status, 'staus..?')
// useEffect(() => {
//   if (status === 'idle') {
//     dispatch(fetchPosts())
//   }
// }, [status, dispatch])


  // .slice() without arguments creates a shallow copy of the array.
  // Now sort() will sort the copy, not the original Redux array.
  // Sort mutates the original Array so slice will crate a shallow copy so that orginal array is not mutated
const orderedPosts = posts
  ?.slice()
  .sort((a: any, b: any) => b.date.localeCompare(a.date));


  // we can use [...] to create a new Array and den sort as sort will create a original array muttaion!!
  const fetchOrdered = [...posts]?.sort((a: any, b: any) => new Date(b.date) - new Date(a.date))

let content;

if (status === 'loading') {
  content = <p>Loading...!!!</p>
} else if (status === 'succeeded') {
  content = orderedPosts.map((post: any) => (
    <PostExcepert key={post.id} post={post} />
  ))
} else if (status === 'failed') {
  content = <p>Failed to load posts</p>
}

const postsList = [
  { id: 1, title: "Learn JavaScript", author: "Asha" },
  { id: 2, title: "Learn React", author: "Ravi" },
  { id: 3, title: "Redux Toolkit Guide", author: "Asha" },
  { id: 4, title: "Advanced React", author: "Meena" },
];


const [order, setOrder] = useState([]);

const fetchPosts = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts"
  const response = await axios.get(URL)
  setOrder(response.data)
}

useEffect(() => {
  fetchPosts()
}, [])

const [searchValue, setSearchValue] = useState('');
  const orderedPostList = order?.filter((item:any) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

const handleSearch = (e:any) => {
  const value = e?.target?.value;
  console.log(value, 'al..')
  setSearchValue(value)
}
    const debounceInput = (Fn:any, delay:any) => {
        let timer:any;

        return function(this:any, ...args:any[]) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const context = this;
            clearTimeout(timer)

            timer = setTimeout(() => {
                Fn.apply(context, args)
            }, delay)
        }
    }

       const handleSearchInput = React.useMemo(() => debounceInput(handleSearch, 500), [])
  return (
  //   <div>
  //     {/* <div>
  //       {orderedPosts.map((post: any) => (
  //   <PostExcepert key={post.id} post={post} />
  // ))}
  //     </div> */}
  //     <input onChange={(e) => handleSearch(e)} value={searchValue}/>
  //     {searchValue && orderedPostList?.length === 0 ? <p>Not found</p> : orderedPostList?.map((item) => (
  //       <div>{item?.title}</div>
  //     ))}
  //   </div>


      // const handleSearchInput = debounceInput(handleSearch, 500)

      

    <div>
      <input onChange={(e) => handleSearchInput(e)} value={searchValue} />
      {searchValue} ---ahsbdjah
    </div>
  )
}

// POST STATUS 

export default PostCardLists