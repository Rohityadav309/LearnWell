# 📚 LearnWell — Full Stack MERN Learning Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-orange?style=for-the-badge)

**LearnWell** is a full-stack educational platform built with the MERN stack that enables students to browse and enroll in courses while allowing administrators to manage content securely. The platform focuses on scalable architecture, secure authentication, and a responsive user experience.

---

## 👨‍💻 Author

**Rohit Yadav**
🌐 GitHub: https://github.com/Rohityadav309

---

## ✨ Key Features

* 🔐 **Secure Authentication:** JWT-based authentication with protected routes
* 📖 **Course Management:** Full CRUD operations for courses and user data
* 👥 **Role-Based Access Control:** Separate capabilities for students and administrators
* ⚡ **Centralized State Management:** Redux Toolkit for consistent global state
* ☁️ **Cloud Media Handling:** Integrated Cloudinary for image and video storage
* 📱 **Responsive UI:** Mobile-first design for seamless cross-device usage
* 🔄 **RESTful APIs:** Efficient communication between frontend and backend

---

## 🚀 Tech Stack

### 🌐 Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS / Modern CSS
* React Icons
* React Hot Toast

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT Authentication
* Bcrypt.js (Password Hashing)

### ☁️ Cloud & Tools

* Cloudinary (Media storage & delivery)
* Concurrently (Run frontend & backend together)

---

## 📂 Project Structure

```id="b1ksq9"
LearnWell/
├── backend/            # Express server, models, controllers, routes
├── frontend/           # React client, Redux slices, components
├── package.json        # Root scripts for managing both apps
└── .env                # Environment variables (not committed)
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash id="h0i0tm"
git clone https://github.com/Rohityadav309/LearnWell.git
cd LearnWell
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash id="9c2a9u"
cd backend
npm install
```

#### Frontend

```bash id="f8qvng"
cd ../frontend
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the backend folder:

```id="f0d8ml"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4️⃣ Run the Application

#### Start Backend Server

```bash id="slc3i7"
npm start
```

#### Start Frontend

```bash id="sgt60a"
npm start
```

---

## 📜 License

No license specified. This project is intended for educational and portfolio purposes.

---

## ⭐ Support

If you found this project helpful, consider giving it a star ⭐ on GitHub.
