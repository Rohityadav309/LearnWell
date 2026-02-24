# 📚 LearnWell — Full Stack MERN Learning Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-orange?style=for-the-badge)

**LearnWell** is a robust, full-stack educational platform designed to streamline course management. Built with the MERN stack, it offers a seamless experience for students to browse courses and for administrators to manage content securely.

---

## 👨‍💻 Author

**Rohit** 🌐 [GitHub Profile](https://github.com/Rohityadav309)

---

## ✨ Key Features

- 🔐 **Secure Authentication:** Implementation of JWT (JSON Web Tokens) for protected routes and secure login/signup.
- 📖 **Course Management:** Full CRUD operations for browsing, searching, and managing educational content.
- ⚡ **State Management:** Centralized state handling using **Redux Toolkit** for consistent user data and course lists.
- 📱 **Responsive Design:** A mobile-first UI built with modern CSS principles to ensure accessibility across all devices.
- 🔄 **Real-time Interaction:** Fast API responses using Node.js and Express.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React.js
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI/UX:** React Icons, React Hot Toast (for sleek notifications)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Security:** JWT Authentication, Bcrypt.js (Password Hashing)
- **Tooling:** Concurrently (to run Frontend & Backend together)

---

## 📂 Project Structure

```text
LearnWell/
├── backend/            # Express Server, Models, Controllers, Routes
├── frontend/           # React Client, Redux Slices, Components
├── package.json        # Root scripts to manage both environments
└── .env                # Environment variables (Internal use)
