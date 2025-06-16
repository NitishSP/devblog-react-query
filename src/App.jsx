import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPost from './pages/EditPost';

import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import PaginatedPostList from './components/PaginatedPostList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />
        <Route path="/paginated" element={<PaginatedPostList />} />
      </Routes>
    </Router>
  )
}

export default App
