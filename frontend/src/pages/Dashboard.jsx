import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePosts } from '../contexts/PostContext'

const Dashboard = () => {
  const { user } = useAuth()
  const { posts, loading, error, fetchPosts, deletePost } = usePosts()
  const [userPosts, setUserPosts] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (posts && user) {
      const filtered = posts.filter(post => post.author?._id === user._id)
      setUserPosts(filtered)
    }
  }, [posts, user])

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeleteLoading(postId)
      const result = await deletePost(postId)
      if (result.success) {
        // Posts will be refreshed automatically by the context
      }
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Manage your posts and profile from your personal dashboard.
            </p>
          </div>
          <Link
            to="/create-post"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create New Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{userPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Member Since</p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Your Posts</h2>
          <p className="text-gray-600 mt-1">Manage and edit your published posts</p>
        </div>

        {error && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {userPosts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Start writing your first blog post to share your thoughts with the world.</p>
            <Link
              to="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {userPosts.map((post) => (
              <div key={post._id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.updatedAt !== post.createdAt && (
                        <span className="ml-4">Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/post/${post._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      disabled={deleteLoading === post._id}
                      className="text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50"
                    >
                      {deleteLoading === post._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 