import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './state/store.ts'
import ErrorBoundary from './errorBoundry.tsx'
import { fetchUsers } from './state/slices/usersSlice.tsx'
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import { fetchPosts } from './components/PostCard/PostCardSlice.tsx'

// using it here as we want users to load when page is loaded immediately 

store.dispatch(fetchUsers())
store.dispatch(fetchPosts());

// Store is a {} to see the states inside use store.getState() => a
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            {/* Nested Routes */}
            <Route path= "/*" element={<App />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
