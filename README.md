# Milking Tracker

A full-stack web application to track and manage milking sessions for cows. The application allows users to start a milking session, record milk quantity, track duration, and view historical sessions.

---

A web application designed to efficiently track cow milking sessions, featuring a timer, milk quantity logging, and a detailed session history.

## Features

-   **Session Timer**: Start, pause, and stop milking sessions with an easy-to-use timer.
-   **Duration Tracking**: Automatically calculates and records the duration of each session.
-   **Milk Quantity Logging**: Input the amount of milk collected for each session.
-   **Session History**: View a paginated list of all past milking sessions with formatted start times, end times, and durations.
-   **Responsive Design**: A clean and intuitive interface built with Tailwind CSS that works on all devices.
-   **Full-Stack Architecture**: Backend built with Node.js, Express, and MongoDB, and a modern frontend built with Next.js.

## Technologies Used

-   **Frontend**: Next.js, React, TypeScript, Tailwind CSS
-   **Backend**: Node.js, Express, MongoDB, Mongoose
-   **Deployment**: Vercel (Frontend), Render (Backend)

---

## Live Demo

- Frontend: [[Your Vercel/Netlify URL](https://milking-tracker-five.vercel.app/)]  
- Backend: [[Your Render URL](https://milking-tracker-1nio.onrender.com)]

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)
-   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YourUsername/Milking-Tracker.git
    cd Milking-Tracker
    ```

2.  **Set up the Backend:**

    -   Navigate to the backend directory:
        ```bash
        cd milking-tracker-backend
        ```
    -   Install dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `milking-tracker-backend` root directory and add your environment variables:
        ```env
        MONGODB_URI=your_mongodb_connection_string
        PORT=5000
        ```
    -   Run the backend server:
        ```bash
        npm start
        ```
    -   The backend will be running at `http://localhost:5000`.

3.  **Set up the Frontend:**

    -   Navigate to the frontend directory from the root folder:
        ```bash
        cd milking-tracker-frontend
        ```
    -   Install dependencies:
        ```bash
        npm install
        ```
         -   Create a `.env` file in the `milking-tracker-frontend` root directory and add your environment variables:
        ```env
        NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
        
        ```
    -   Run the frontend development server:
        ```bash
        npm run dev
        ```
    -   The frontend will be running at `http://localhost:3000`.

## Usage

1.  Open `http://localhost:3000` in your browser.
2.  Use the controls on the main page to **Start** a new milking session.
3.  You can **Pause** and **Resume** the timer as needed.
4.  Once the session is complete, enter the **Milk Quantity** (in liters).
5.  Click **Stop** to save the session to the database.
6.  Navigate to the "Sessions" page to view the complete history of all recorded milking sessions.

## API Endpoints

The backend server exposes the following REST API endpoints:

| Method | Endpoint                       | Description                               |
| :----- | :----------------------------- | :---------------------------------------- |
| `POST` | `/api/milking-sessions`        | Creates a new milking session.            |
| `GET`  | `/api/milking-sessions`        | Gets a paginated list of milking sessions. |

**Query Parameters for `GET /api/milking-sessions`:**

-   `page`: The page number to retrieve (e.g., `1`).
-   `limit`: The number of sessions per page (e.g., `5`).

**Example:** `GET http://localhost:5000/api/milking-sessions?page=1&limit=5`

## Deployment

### Backend (Render)

1.  Push your code to a GitHub repository.
2.  Create a new "Web Service" on [Render](https://render.com/) and connect it to your repository.
3.  Configure the following settings:
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
4.  Go to the "Environment" tab and add your `MONGODB_URI` from your `.env` file.
5.  Deploy the service.
6.  Ensure your MongoDB Atlas cluster allows connections from all IP addresses (`0.0.0.0/0`) or add Render's specific IP addresses to the allowlist.

### Frontend (Vercel)

1.  Push your code to a GitHub repository.
2.  Import your project into [Vercel](https://vercel.com/).
3.  Vercel will automatically detect that it's a Next.js project and configure the build settings.
4.  Add an environment variable to point to your deployed backend API:
    -   `NEXT_PUBLIC_BACKEND_URL`: `https://your-render-backend-url.onrender.com`
5.  Deploy the project. Your milking tracker will now be live.
