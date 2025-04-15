# et-fs-social-app

**et-fs-social-app** is a full-stack MERN application that allows Instagram Business Account users to log in via Meta's OAuth, view their profile details, and explore recent posts, reels, and media. Built with a sleek, responsive glassmorphism design using Vite + React + Tailwind CSS.

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

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
  <img src="/snapshots/snap1.png" alt="App Snapshot 1" className="rounded-xl shadow-lg" />
  <img src="/snapshots/snap2.png" alt="App Snapshot 2" className="rounded-xl shadow-lg" />
  <img src="/snapshots/snap3.png" alt="App Snapshot 3" className="rounded-xl shadow-lg" />
  <img src="/snapshots/snap4.png" alt="App Snapshot 4" className="rounded-xl shadow-lg" />
</div>

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

---
