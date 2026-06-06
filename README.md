# DSAbuds

**Version:** V1.0.0.1

DSAbuds is a full-stack, web-based DSA (Data Structures and Algorithms) accountability platform designed to help students and developers maintain consistency in their LeetCode practice. By leveraging social motivation and a dynamic group-based fine system, DSAbuds ensures that you and your friends stay on track with your coding goals.

## 🚀 Features

* **User Authentication:** Secure user registration, login, and session management.
* **Secure LeetCode Integration:** Link your LeetCode profile with strict account-ownership verification (users verify ownership by pasting a unique code into their LeetCode "About Me" section).
* **Group Management:** Create private accountability groups or join existing ones using unique invite codes.
* **Automated Activity Tracking:** A robust backend cron service automatically syncs real-time LeetCode activity daily to track practice streaks.
* **Dynamic Fine System:** Automatically calculates financial penalties for users who miss their daily practice, adding the penalty to a collective group fund.
* **Live Leaderboards:** A dynamic UI displaying real-time member progress, current streaks, and group fund contributions.
* **Profile Customization:** User avatar uploads and profile management.

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS, Vite (Deployed on Vercel)
* **Backend:** Node.js, Express.js (Deployed on Railway)
* **Database:** MongoDB
* **APIs:** GraphQL (for fetching LeetCode user data)

## 📦 Project Structure

The project is structured as a monorepo containing both the frontend and backend environments:

```text
DSAbuds/
├── backend/       # Node.js/Express backend server
│   ├── models/    # MongoDB database schemas (User, Group, etc.)
│   ├── routes/    # API endpoints (auth, leetcode, cron logic, etc.)
│   └── ...
├── frontend/      # React frontend application
│   ├── src/       # UI Components, Pages, and Tailwind styles
│   └── ...
└── README.md
```

## ⚙️ Local Development Setup

To run this project locally on your machine, follow these steps:

### Prerequisites

* Node.js installed on your machine.
* A MongoDB database connection string (Local or MongoDB Atlas).

### 1. Clone the repository

```bash
git clone https://github.com/nikhils00d/DSAbuds.git
cd DSAbuds
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory. You will need to supply your own variables (do not use the production secrets!):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_random_secret_string
# Add any other required keys (e.g., Cloudinary for avatars)
```

Start the backend development server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will typically be accessible at `http://localhost:5173`. 

---

*Stay consistent, track your progress, and hold your friends accountable with DSAbuds!*
