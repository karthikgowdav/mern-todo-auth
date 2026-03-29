# 🚀 MERN Todo App with Authentication

A full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js) with JWT-based authentication.

🌍 Live Demo: https://mern-todo-auth-seven.vercel.app  
🔗 Backend API: https://mern-backenddd.onrender.com  

---

## ✨ Features

- User Registration & Login  
- JWT Authentication  
- Create, Update, Delete Todos  
- User-specific data  
- Responsive UI  
- Fully deployed  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- JWT  
- Bcrypt.js  

---

## 📁 Project Structure

mern-todo-auth/
│
├── backend/
├── frontend/
├── README.md

---

## ⚙️ Environment Variables

Create `.env` inside backend:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=5000  

---

## 🚀 Run Locally

### Clone Repository

git clone https://github.com/karthikgowdav/mern-todo-auth.git  
cd mern-todo-auth  

### Backend Setup

cd backend  
npm install  
npm start  

### Frontend Setup

cd frontend  
npm install  
npm start  

---

## 🌐 Deployment

- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 🔥 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Todo Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/todos | Get todos |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

---

## 🧠 How It Works

- User logs in / registers  
- Backend generates JWT  
- Token stored in browser  
- Requests authenticated using token  

---

## ⚠️ Notes

- Backend may take time to wake up (Render free tier)  
- Enable MongoDB IP access (0.0.0.0/0)  
- Do not expose `.env`  

---

## 👨‍💻 Author

Karthik Gowda  
https://github.com/karthikgowdav  

---

## ⭐ Support

If you like this project:

- Star the repository  
- Fork it  
- Share it  

---

## 📌 Future Improvements

- Drag & Drop Todos  
- Dark Mode  
- Refresh Tokens  
- Role-based authentication  