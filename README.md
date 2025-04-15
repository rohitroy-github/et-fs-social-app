# Cohere Chatbot

**Cohere Chatbot** is a FastAPI-based chatbot application that integrates Cohere's AI API to generate intelligent responses. It maintains a short-term conversation history for a more contextual chat experience.

**This app can be tested locally !**

---

## Features

- **Chat Functionality**: Communicate with the AI model via a RESTful API.
- **Conversation History**: Stores the last five messages to provide context-aware responses.
- **FastAPI Integration**: A lightweight, high-performance backend.
- **Environment Variable Support**: API keys are securely managed using a `.env` file.
- **Pydantic Validation**: Ensures that user input is correctly formatted.
- **Minimal Memory Usage**: Maintains only recent messages to optimize performance.

---

## Snapshots

| ![Login Page](https://github.com/user-attachments/assets/9baac6e3-9cd4-48fe-b9d2-9a70c809fd97) | ![Profile Page](https://github.com/user-attachments/assets/eb9b7888-155c-458a-99d6-cf3c24666336) |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![Feed Page](https://github.com/user-attachments/assets/b23323ca-8b11-4e6c-84a5-88871f92ba54) | ![Post Viewer](https://github.com/user-attachments/assets/41b69a34-5649-4a5b-8c05-d64682e06f10)           |

---

## Tech Stack

- **Backend**: FastAPI  
- **AI Integration**: Cohere API  
- **Environment Management**: dotenv  
- **Validation**: Pydantic  
- **Server**: Uvicorn  

---

## Getting Started

### Prerequisites

- **Python**: 3.10 or higher  
- **FastAPI**: Installed  
- **Cohere API Key**: Get from [Cohere's official website](https://cohere.com/)  
- **Postman or Curl**: To test API requests  

---

## Installation

### Running the main server
```sh
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

### Running the chat client (on the terminal)
```sh
python chat_terminal.py
```

### Running the frontend (frontend application / Chatbot)
```sh
npm run dev
```