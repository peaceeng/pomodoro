# Pomodoro Timer

## Overview

The Pomodoro Timer is a web-based application that helps users manage their time using the Pomodoro Technique. It includes features for tracking work and break periods, session history, and real-time updates.

## Setup Instructions

### 1. Backend Setup

Navigate to the Backend Directory:

```
cd backend
```

Install Dependencies:

```
npm install
```

Start the Server:

```
npm start
```

## 2. Frontend Setup

Navigate to the Frontend Directory:

```
cd frontend
```

Install Dependencies:

```
npm install
```

Start the Development Server:

```
npm start
```

The frontend will be accessible at http://localhost:3000.

3. Database Setup

Install MongoDB:
Follow the MongoDB installation guide for your operating system.

Start MongoDB:
Ensure MongoDB is running on the default port (27017).

## Design Choices

### Backend

- Framework: Express.js is used for setting up the server and handling HTTP requests due to its simplicity and robustness.
- Authentication: Implemented using JSON Web Tokens (JWT) for secure user sessions.
- Database: MongoDB is used for its flexibility with schema design and ease of integration with Node.js.
- WebSockets: socket.io is employed for real-time updates between the frontend and backend, allowing instant synchronization of timer states.

### Frontend

- Framework: React is used for building the user interface due to its component-based architecture and efficient updates.
- State Management: Local component state is used for managing timer states and settings, which is sufficient for this application's requirements.
- UI Library: Material-UI is used for its rich set of components and styling capabilities, providing a clean and responsive design.

## Special Features and Tech

- Duration Formatting: The duration of each Pomodoro session is calculated in hours, minutes, and seconds. This is done using a utility function that converts the total seconds into a readable format (h m s).

- Session History: Session data, including start and end times and durations, is displayed in a Material-UI table. This table dynamically updates with data fetched from the backend.

- Real-time Updates: WebSocket communication using socket.io ensures that timer updates are reflected in real time across different clients.

- Sound Notifications: Sound alerts are played to signal transitions between work and break periods, enhancing user experience.
