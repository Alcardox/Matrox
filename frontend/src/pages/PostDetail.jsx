import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usePosts } from '../contexts/PostContext'
import { useAuth } from '../contexts/AuthContext'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { fetchPost, deletePost } = usePosts()
  
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    setLoading(true)
    setError('')
    
    const postData = await fetchPost(id)
    
    if (postData) {
      setPost(postData)
    } else {
      setError('Post not found')
    }
    
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!user || post.author?._id !== user._id) {
      return
    }

    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setDeleteLoading(true)
      const result = await deletePost(id)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message)
      }
      
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-red-600 text-xl mb-4">
            {error || 'Post not found'}
          </div>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const isAuthor = user && post.author?._id === user._id

  return (
    <div className="max-w-4xl mx-auto">
      {/* Post Header */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {post.author?.username?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="font-medium">{post.author?.username || 'Anonymous'}</span>
                </div>
                
                <span>•</span>
                
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                
                {post.updatedAt !== post.createdAt && (
                  <>
                    <span>•</span>
                    <span className="text-sm text-gray-500">
                      Updated {new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {isAuthor && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/edit-post/${post._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.description}
            </div>
          </div>
        </div>
      </div>

      {/* Post Footer */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-gray-600">
                  Written by {post.author?.username || 'Anonymous'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                ← Back to Posts
              </Link>
              
              {isAuthor && (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-700 font-medium text-sm"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Suggestion */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Want to share your thoughts?</h3>
        <p className="text-blue-800 mb-4">
          Join our community and start writing your own blog posts. Share your knowledge, experiences, and ideas with readers from around the world.
        </p>
        <div className="flex space-x-3">
          {user ? (
            <Link
              to="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Post
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Join Now
            </Link>
          )}
          <Link
            to="/"
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Browse More Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostDetail 