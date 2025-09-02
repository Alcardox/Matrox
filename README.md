# MatrixBlog

A full‑stack blogging platform with a Matrix-inspired UI. Built with Node.js/Express, MongoDB (Mongoose), React 19, Vite, Tailwind CSS v4, and Axios. Users can register, authenticate, create posts, edit/delete their own posts, and browse posts by release date or author.

## ✨ Features

- Authentication with httpOnly JWT cookies (signup, login, logout)
- Profile: view and update username/email
- Posts: create, read, update, delete (CRUD) with ownership checks
- Browse posts by release date on the home page
- View posts by specific user via `/api/posts/user/:id` (frontend route: `/user/:userId`)
- Matrix theme (black + green) responsive UI with Tailwind v4
- CORS configured for frontend ↔ backend communication

## 🧱 Tech Stack

- Backend: Node.js, Express, Mongoose, JWT, Cookie Parser, Dotenv
- Frontend: React 19, Vite, React Router, Tailwind CSS v4, Axios
- Database: MongoDB (local or Atlas)

## 📁 Monorepo Structure

```
.
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── Routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── package.json
└── README.md  ← you are here
```

## 🔐 Backend Overview

- Server: `backend/server.js`
- Routes (mounted under `/api`):
  - `POST /api/auth/signup` – Register
  - `POST /api/auth/login` – Login
  - `POST /api/auth/logout` – Logout
  - `GET /api/users` – Get current user (auth required)
  - `PUT /api/users` – Update username/email (auth required)
  - `DELETE /api/users` – Delete current user (auth required)
  - `GET /api/posts` – Get all posts (populates author)
  - `GET /api/posts/:id` – Get post by id (populates author)
  - `GET /api/posts/user/:id` – Get posts for a specific user (populates author username)
  - `POST /api/posts` – Create post (auth required)
  - `PUT /api/posts/:id` – Update post (owner only)
  - `DELETE /api/posts/:id` – Delete post (owner only)

- Models:
  - User: `username`, `email`, `password`
  - Post: `title`, `description`, `author` (ref User)
  - Admin: `username`, `email`, `password`, `chefpass` (admin routes available)

- Auth & security:
  - Password hashing (bcrypt)
  - JWT httpOnly cookie via `tokenGenerator`
  - `authProtect` middleware guards protected endpoints

- CORS:
  - Should allow `http://localhost:5173` with `credentials: true`

### Backend Environment
Create `.env` (at repo root or in `backend/` depending on your setup) with:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/matroxblog
JWT_SECRET=replace-with-a-strong-secret
```

If using Docker for MongoDB:
```
docker run -d -p 27017:27017 --name mongodb mongo:latest
```
If your MongoDB runs on a different port/host, update `MONGO_URI` accordingly (e.g., `mongodb://localhost:7676/...`).

### Run Backend
```
cd backend
npm install
npm start
```
The server will start on `http://localhost:3000`.

## 🖥️ Frontend Overview

- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router routes:
  - `/` – Home (posts sorted by newest)
  - `/login`, `/register`
  - `/dashboard` (protected)
  - `/create-post` (protected)
  - `/edit-post/:id` (protected)
  - `/post/:id`
  - `/profile` (protected)
  - `/user/:userId` – Posts by a specific user

- Contexts:
  - `AuthContext`: login, signup, logout, session check, profile update
  - `PostContext`: fetch all posts, fetch post, fetch posts by user, create/update/delete

- Axios defaults:
  - `baseURL = http://localhost:3000/api`
  - `withCredentials = true` (sends JWT cookie)

### Run Frontend
```
cd frontend
npm install
npm run dev
```
Vite will serve on `http://localhost:5173`.

## 🚦 Quick Start

1) Configure environment (.env) for backend (MongoDB + secrets)
2) Start MongoDB (local/Docker/Atlas)
3) Start backend: `cd backend && npm install && npm start`
4) Start frontend: `cd frontend && npm install && npm run dev`
5) Visit `http://localhost:5173`

## 🧭 Usage Guide

- Sign up → Login → Create posts
- Home shows newest posts first
- Click an author to view `/user/:userId` with only their posts
- Edit/Delete only your own posts (ownership enforced server-side)
- Profile page lets you update `username` and `email`

## 🔍 API Reference (Summary)

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/users                 (auth)
PUT    /api/users                 (auth)
DELETE /api/users                 (auth)
GET    /api/posts
GET    /api/posts/:id
GET    /api/posts/user/:id
POST   /api/posts                 (auth)
PUT    /api/posts/:id             (owner)
DELETE /api/posts/:id             (owner)
```

## 🎨 UI/UX

- Matrix theme (black + green)
- Accessible color contrast, clear focus states
- Responsive layouts across desktop and mobile

## 🧪 Notes & Tips

- Ensure CORS is enabled on the backend with `credentials: true` and frontend origin allowed
- If requests fail from browser but work in Postman, check CORS and cookies
- Axios sends cookies only when `withCredentials: true` and CORS allows credentials

## 🛠️ Scripts

Backend:
```
cd backend
npm start
```

Frontend:
```
cd frontend
npm run dev      # Start dev server
npm run build    # Build production assets
npm run preview  # Preview production build
npm run lint     # ESLint
```

## 📦 Deployment

- Backend: Deploy Node/Express app (set env vars; ensure MongoDB connectivity)
- Frontend: Build with `npm run build` in `frontend/` and serve the static assets (e.g., Vercel, Netlify, Nginx)
- Update frontend Axios `baseURL` if backend is hosted on a different origin

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Push branch: `git push origin feature/amazing`
5. Open a Pull Request

## 📄 License

MIT License. Feel free to use, modify, and distribute.

---

If you run into issues (CORS, cookies, DB connectivity), open an issue with logs and steps to reproduce. Happy hacking in the Matrix! 🕶️💚