import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configure axios defaults
  axios.defaults.baseURL = '/api'
  axios.defaults.withCredentials = true

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/users')
      setUser(response.data)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password })
      if (response.data.message === 'login successfully!') {
        await checkAuthStatus()
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/auth/signup', { username, email, password })
      if (response.data._id) {
        setUser(response.data)
        return { success: true, user: response.data }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      await axios.post('/auth/logout')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/users', userData)
      if (response.data) {
        setUser(response.data)
        return { success: true, user: response.data }
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Update failed' }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 