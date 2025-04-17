# Instadesk

**Instadesk** is a full-stack MERN application that allows Instagram Business Account users to log in via Meta's OAuth, view their profile details, and explore recent posts, reels, and media. Built with a sleek, responsive glassmorphism design using Vite + React + Tailwind CSS.

**🚀 Deployed application is available at [https://instadesk.vercel.app](https://instadesk.vercel.app), deployed using Vercel.**

**This application uses sessionStorage and runs on your local browser during development.**

---

## Features

- **Instagram Login**: Authenticate via Instagram Graph API using Meta App credentials.
- **User Profile Viewer**: Display profile name, bio, followers, following, account type, profile picture, and more.
- **Media Feed Viewer**: Fetch and display recent posts, reels, and media.
- **Comment Interaction**: View and reply to comments on your business posts.
- **Responsive Design**: Glassmorphism UI with TailwindCSS styling.
- **Session Storage**: Uses `sessionStorage` to persist tokens and user IDs across pages.

---

## Snapshots

| ![Login Page](https://github.com/user-attachments/assets/9baac6e3-9cd4-48fe-b9d2-9a70c809fd97) | ![Profile Page](https://github.com/user-attachments/assets/eb9b7888-155c-458a-99d6-cf3c24666336) |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| ![Feed Page](https://github.com/user-attachments/assets/b23323ca-8b11-4e6c-84a5-88871f92ba54) | ![Post Viewer](https://github.com/user-attachments/assets/41b69a34-5649-4a5b-8c05-d64682e06f10) |

---

## Demo Video

**Watch a walkthrough of the app in action: [Loom Video](https://www.loom.com/share/fc096d5cb6dc4ef1af1166154d0843bd?sid=15bd167a-0235-4dae-9904-d70eb2ccc674)**

---

## Tech Stack

- **Frontend**: React.js, Vite, Javascript, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **External Database**: None  
- **API**: Instagram Graph API (Business accounts only)  
- **Browser Storage**: sessionStorage  
- **Developer Tools**: Meta for Developers (Instagram App)

---

## Getting Started

### Prerequisites

- A Facebook Developer Account  
- An Instagram Business Account linked to a Facebook Page  
- Node.js and npm installed

### 🛠️ Installation

Follow these steps to run **Instadesk** locally on your machine:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/instadesk.git
```
```bash
cd instadesk
```
### 2. Setup Backend (Express)
```bash
cd backend-express
```
Create a .env file in the backend-express folder using the provided .env.example
```bash
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/authorize
SESSION_SECRET=your_secret_key
```
```bash
npm install
```
### 3. Setup Frontend (Vite + React)
```bash
cd frontend-vite
```
```bash
npm install
```
Create a .env file in the frontend-vite folder using the .env.example file:
```bash
VITE_BACKEND_URL=http://localhost:3000
```
```bash
npm run dev
```

---

## **Contribute and Get in Touch**

**Like the project? Give it a star!** ⭐️ **It helps a lot!**

**Got questions or want to chat? Hit me up here:** [https://linktr.ee/rohitroy_r](https://linktr.ee/rohitroy_r)

---



