import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../contexts/PostContext'

const Home = () => {
  const { posts, loading, error, fetchPosts } = usePosts()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort posts by release date (newest first)
  const sortedPosts = filteredPosts.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gray-900 min-h-screen">
        <div className="text-red-400 text-xl mb-4">Error: {error}</div>
        <button
          onClick={fetchPosts}
          className="bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded-lg font-bold shadow-lg"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
          Welcome to <span className="text-green-300">MatrixBlog</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover the digital realm, share your thoughts, and connect with hackers from around the matrix.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border-2 border-green-500 bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 shadow-lg"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Posts Grid - Sorted by Release Date */}
      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-4">
            {searchTerm ? 'No posts found matching your search.' : 'No posts available yet.'}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <article
              key={post._id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-green-500/20 transition-shadow duration-300 overflow-hidden border border-gray-700 hover:border-green-500"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-400 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-medium text-sm">
                        {post.author?.username?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <Link
                      to={`/user/${post.author?._id}`}
                      className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium"
                    >
                      {post.author?.username || 'Anonymous'}
                    </Link>
                  </div>
                  
                  <Link
                    to={`/post/${post._id}`}
                    className="text-green-400 hover:text-green-300 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
                
                <div className="pt-3 border-t border-gray-700">
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home 