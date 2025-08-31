import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const PostContext = createContext()

export const usePosts = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('/posts')
      if (response.data.message === 'no post find') {
        setPosts([])
      } else {
        setPosts(response.data)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserPosts = async (userId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/posts/user/${userId}`)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch user posts')
      return []
    } finally {
      setLoading(false)
    }
  }

  const fetchPost = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/posts/${id}`)
      return response.data
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch post')
      return null
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/posts', postData)
      if (response.data.message) {
        await fetchPosts()
        return { success: true, post: response.data.message }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post')
      return { success: false, message: error.response?.data?.message || 'Failed to create post' }
    } finally {
      setLoading(false)
    }
  }

  const updatePost = async (id, postData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.put(`/posts/${id}`, postData)
      if (response.data.message === 'updated successfullt') {
        await fetchPosts()
        return { success: true, post: response.data.info }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post')
      return { success: false, message: error.response?.data?.message || 'Failed to update post' }
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.delete(`/posts/${id}`)
      if (response.data.message === 'deleted!') {
        await fetchPosts()
        return { success: true }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete post')
      return { success: false, message: error.response?.data?.message || 'Failed to delete post' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    fetchUserPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
} 