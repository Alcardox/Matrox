# MatroxBlog Frontend

A modern, responsive blog application built with React and Tailwind CSS v4, designed to work with the MatroxBlog backend API.

## Features

### 🚀 Core Features
- **User Authentication**: Register, login, and logout functionality
- **Blog Posts**: Create, read, update, and delete blog posts
- **User Dashboard**: Manage your posts and profile
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, clean interface with smooth animations

### 📱 Pages
- **Home**: Browse all blog posts with search functionality
- **Login/Register**: User authentication forms
- **Dashboard**: User's personal space to manage posts
- **Create Post**: Rich text editor for creating new posts
- **Edit Post**: Update existing posts
- **Post Detail**: Full post view with author information
- **Profile**: User profile management

### 🎨 Design Features
- **Tailwind CSS v4**: Latest version with modern styling
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation with helpful feedback

## Tech Stack

- **React 19**: Latest React with hooks and modern patterns
- **React Router**: Client-side routing
- **Tailwind CSS v4**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Setup

Make sure your backend server is running on `http://localhost:3000` (default). If your backend runs on a different port, update the axios base URL in `src/contexts/AuthContext.jsx`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Navigation component
├── contexts/           # React contexts for state management
│   ├── AuthContext.jsx # Authentication state
│   └── PostContext.jsx # Posts state and operations
├── pages/              # Page components
│   ├── Home.jsx        # Home page with post listing
│   ├── Login.jsx       # Login form
│   ├── Register.jsx    # Registration form
│   ├── Dashboard.jsx   # User dashboard
│   ├── CreatePost.jsx  # Create new post
│   ├── EditPost.jsx    # Edit existing post
│   ├── PostDetail.jsx  # Individual post view
│   └── Profile.jsx     # User profile management
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind import
```

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get current user profile
- `PUT /api/users` - Update user profile
- `DELETE /api/users` - Delete user account

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue in the repository.
