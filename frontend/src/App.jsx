import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'
import UserPosts from './pages/UserPosts'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { PostProvider } from './contexts/PostContext'

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/user/:userId" element={<UserPosts />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

export default App
