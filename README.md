# HyreAI Candidate Management Portal

## Project Overview

This project is a simple full stack Candidate Management Portal developed as part of the HyreAI technical assignment.

The application helps in managing candidate details using a clean dashboard interface. Admin can login, add candidates, update candidate information, view details, delete records, and search candidates.

The project is built using React for frontend, Node.js and Express.js for backend, and MongoDB for database.

---

## Features

* Admin Login (Hardcoded Authentication)
* Add Candidate
* View Candidate Details
* Edit / Update Candidate
* Delete Candidate
* Search Candidates
* Candidate Dashboard UI
* MongoDB Database Integration

### Login Credentials

Email:

```txt
admin@hyreai.com
```

Password:

```txt
Admin123
```

---

## Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

---

## Project Structure

```txt
hyreai-candidate-portal/
│── backend/
│── frontend/
│── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-link>
```

Move into project folder:

```bash
cd hyreai-candidate-portal
```

---

### 2. Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal.

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## How to Use

1. Login using admin credentials.
2. Add candidate details from dashboard.
3. Edit candidate information if required.
4. View candidate details.
5. Delete candidate records.
6. Search candidates using search bar.

---

## Notes

* MongoDB Atlas is used for storing candidate data.
* Environment variables are added using `.env`.
* `node_modules` and `.env` are ignored using `.gitignore`.

---

## Author

Sathvika Mamidala
