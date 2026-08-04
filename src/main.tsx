import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { Provider } from 'react-redux'
// import store from './state/store.ts'
import ErrorBoundary from './errorBoundry.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Nested Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
    {/* </Provider> */}
  </StrictMode>,
)
