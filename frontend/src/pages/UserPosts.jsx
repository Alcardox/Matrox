import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePosts } from '../contexts/PostContext'

const UserPosts = () => {
  const { userId } = useParams()
  const { fetchUserPosts, loading, error } = usePosts()
  const [userPosts, setUserPosts] = useState([])
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    loadUserPosts()
  }, [userId])

  const loadUserPosts = async () => {
    const posts = await fetchUserPosts(userId)
    setUserPosts(posts)
    if (posts.length > 0) {
      setUserInfo(posts[0].author)
    }
  }

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
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded-lg font-bold shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 min-h-screen">
      {/* User Profile Header */}
      {userInfo && (
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-black font-bold text-3xl">
                {userInfo.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-green-400 mb-2">
              {userInfo.username}'s Digital Realm
            </h1>
            <p className="text-gray-300 mb-4">
              Digital storyteller and matrix explorer
            </p>
            <div className="text-sm text-gray-400">
              {userPosts.length} digital {userPosts.length === 1 ? 'story' : 'stories'} shared
            </div>
          </div>
        </div>
      )}

      {/* User Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
          Digital Stories & Matrix Tales
        </h2>
        
        {userPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-400 mb-2">No digital stories yet</h3>
            <p className="text-gray-400 mb-6">
              This matrix explorer hasn't shared any stories yet.
            </p>
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded-lg font-bold shadow-lg"
            >
              Explore Other Realms
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <article
                key={post._id}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-green-500/20 transition-shadow duration-300 overflow-hidden border border-gray-700 hover:border-green-500"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-black font-medium text-sm">
                          {userInfo?.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        {userInfo?.username}
                      </span>
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
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Back to All Posts */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-black px-6 py-3 rounded-lg font-bold shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to All Digital Stories</span>
        </Link>
      </div>
    </div>
  )
}

export default UserPosts
