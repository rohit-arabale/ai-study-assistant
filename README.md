# AI Study Assistant

An AI-powered study companion designed to help students learn more efficiently through intelligent chat assistance, note management, subject organization, and personalized study support.

## Features

### Authentication & User Management

* Secure user registration and login
* JWT-based authentication
* Protected routes and user sessions

### AI Study Assistant

* AI-powered question answering
* Interactive study chat interface
* Context-aware responses for learning support

### Subject Management

* Create and manage study subjects
* Organize learning materials by topic
* Structured academic workflow

### Notes Management

* Create, edit, and delete notes
* Organize notes by subject
* Quick access to study materials

### Dashboard

* Centralized student workspace
* Subject overview
* Notes and study progress management

---

## Tech Stack

### Frontend

* React.js
* Vite
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### AI Integration

* OpenRouter API

---

## Project Structure

```text
AI-STUDY-ASSISTANT
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   └── vite.config.js
│
└── docs
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/rohit-arabale/ai-study-assistant.git
cd ai-study-assistant
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_api_key
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Screenshots

Add screenshots here after deployment.

### Login Page

![Login Screenshot](screenshots/login.png)

### Dashboard

![Dashboard Screenshot](screenshots/dashboard.png)

### AI Chat

![AI Chat Screenshot](screenshots/chat.png)

---

## Future Enhancements

* AI-generated study summaries
* Quiz generation
* Flashcard creation
* Study progress analytics
* Dark mode
* PDF upload and analysis
* Voice-based AI assistant

---

## Learning Outcomes

This project was developed to gain practical experience with:

* Full Stack Web Development
* React.js
* Node.js & Express.js
* MongoDB Database Design
* REST API Development
* Authentication & Authorization
* AI API Integration
* Git & GitHub Workflow

---

## Author

**Rohit Arabale**

B.Tech Computer Science Student

---

## License

This project is developed for educational and learning purposes.
