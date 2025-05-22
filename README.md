# MERN Task Manager App

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

A functional task management application built using the MERN (MongoDB, Express, React, Node.js) stack. The app allows users to manage tasks with features like user authentication (JWT & Google OAuth), task creation, task arrangement using drag-and-drop, and much more.

![Task Manager App Dashboard](Images/image1.png)
![Task Manager App Pending Task](Images/image2.png)
![Task Manager App Completed Task](Images/image3.png)
![Task Manager App Login](Images/image4.png)
![Task Manager App Register](Images/image5.png)
![Task Manager App Profile](Images/image6.png)

## 🌟 Features

- **User Authentication**: Secure login, registration, and logout using JWT (HttpOnly cookies) for protection against XSS attacks. Google OAuth is also integrated.
- **Task Management**: Users can create, search, update, and delete tasks.
- **Drag-and-Drop**: Easily manage tasks between "To Do", "In Progress", and "Done" columns.
- **Protected Routes**: Only authenticated users can access protected pages, and already logged-in users cannot access login or signup pages.
- **Optimistic Updates**: React Query is used for server-side caching and optimistic UI updates.
- **Responsive UI**: Developed with React Beautiful DnD and customized UI components.

## 🛠️ Technologies Used

### Frontend:

- **React** (v18.3.1)
- **Redux Toolkit** for global state management
- **React Router** for routing
- **React Query** for handling server data and caching
- **React Hook Form** (with Zod validation)
- **React Beautiful DnD** for drag-and-drop interactions
- **Axios** for HTTP requests
- **Flowbite-React** for UI components
- **React Toastify** for user notifications

### Backend:

- **Node.js** (v18.x)
- **Express.js** (v4.19.2) for the API
- **MongoDB** with **Mongoose** for the database
- **JWT** for user authentication
- **Bcrypt.js** for password hashing
- **Cookie-Parser** for handling JWT cookies

## 🚀 Live Demo

Check out the live deployed version [here](https://taskmanger-4sy5.onrender.com).

## 🏁 Getting Started Locally

To get this project running on your local machine, follow these steps:

### Prerequisites

- **Node.js** (v18.x or later)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ravikumar9519/TASK_MANAGER.git
   ```

2. Navigate into the project directory:
   ```bash
   cd mern_task_manager_app
   ```

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder and set the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start at `http://localhost:4000`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` folder and add the backend URL:

   ```env
   REACT_APP_API_URL=http://localhost:5173
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

The app will be running at `http://localhost:5173`.

## 🧪 Testing Locally

Once both servers (backend and frontend) are running, you can test the application by navigating to `http://localhost:3000` in your browser.

## 📜 Available Scripts

In the project directories, you can run:

- `npm start`: Starts the development server.
- `npm build`: Builds the app for production.

## 🚀 Future Enhancements

- **User Avatar**: Implement profile avatars for users.
- **Notifications**: Add real-time notifications for task updates.
- **Improved UI**: Align UI elements like search button and filters with a more polished design.

## 🐛 Known Issues

- Minor alignment issues with the search button and add task button.
- A small bug with cookies in production when using JWT (will be fixed soon).

## 🤝 Contributing

Feel free to fork the repository, submit issues, or make pull requests. Any contributions are welcome!

## 👨‍💻 Author

**Ravi Bharti** - [GitHub](https://github.com/ravikumar9519)

---

⭐️ If you found this project helpful, please give it a star on GitHub! ⭐️
