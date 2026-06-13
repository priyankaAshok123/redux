
import './App.css'
import Layout from './components/Layout';
import PostCardFrom from './components/PostCard/PostCardFrom';
import PostCardLists from './components/PostCard/PostCardLists';
import { Routes, Route } from 'react-router-dom';
import SinglePostPage from './components/PostCard/singlePostPage';
import EditPostForm from './components/PostCard/EditPostForm';
import UsersLists from './components/Users/UsersLists';
import UserPage from './components/Users/UserPage';

function App() {

  return (
    // <main>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<PostCardLists />}></Route>
        <Route path='post'>
            <Route index element={<PostCardFrom />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
            <Route index element={<UsersLists />} />
            <Route path=":userId" element={<UserPage />}/>
        </Route>
        </Route>
      </Routes>
    // </main>
  )
}

export default App
