# GreenCart Logistics — Delivery Simulation & KPI Dashboard

## Project Overview

GreenCart Logistics is an eco-friendly delivery company tool designed to simulate delivery operations and calculate key performance indicators (KPIs).  
Managers can experiment with staffing, delivery schedules, and route allocations to evaluate their effects on profits and efficiency through real-time simulations and dashboards.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (cloud-hosted)  
- **Frontend:** React.js (Hooks)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Charts:** Chart.js  
- **Testing:** Jest, Supertest (backend)  
- **Deployment:** Render (backend), Vercel (frontend)  
- **Environment management:** dotenv  
- **Others:** Axios (frontend API calls), bcrypt (password hashing), nodemon (dev server)

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher) and npm  
- PostgreSQL database access  
- Git

---

### Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/dhakeddevendra5/greencart_logistics.git
   cd greencart-logistics/backend

2. Install dependencies:
   ```bash
   npm install

3. Configure environment variables:
   
   Create a .env file in the backend directory with:
   ```bash
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret

4. Run database migrations or setup scripts if any (add if applicable).

5. Start the backend server (development mode):
   ```bash
   npm run dev

# Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   
2. Install dependencies:
   ```bash
   npm install
   
3. Configure environment variables (if any):

   Create .env in frontend (example):
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api

4. Run the frontend development server:
   ```
   npm start
5. The frontend will be available at http://localhost:3000.

# Testing
- Backend tests use Jest and Supertest. Run tests with:

   ```
   cd backend
   npm test
- Add frontend tests here if applicable.

# Environment Variables
## Backend (backend/.env)
   ```
   PORT=4000
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
```
## Frontend (frontend/.env)
   ```
   REACT_APP_API_URL=http://localhost:4000/api
   ```   
# Deployment Instructions
- **Backend:** Deployed on Render.com
   - Connected to a cloud PostgreSQL instance
   - Environment variables configured via Render dashboard
   - Automatic deployments linked to GitHub repo
- **Frontend:** Deployed on Vercel
   - Connected to backend API URL
   - Continuous deployment from GitHub

# Project Structure
   ```
   greencart_logistics/
   ├── backend/            # Node.js Express backend code
   ├── frontend/           # React.js frontend code
   ├── README.md
   └── ...

