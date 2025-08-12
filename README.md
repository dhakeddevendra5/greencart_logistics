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
   - Connect your GitHub repo.
   - Set environment variables (```DATABASE_URL```, ```JWT_SECRET```, etc.) in Render dashboard.
   - Build command:
     ```npm install```
   - Start command:
     ```node src/server.js or npm run dev```
   - Auto deploys on push to ```main``` branch.
   - Use cloud PostgreSQL instance (Neon, Supabase, etc.).
- **Frontend:** Deployed on Vercel
   - Connect GitHub repo.
   - Select React framework preset.
   - Build command: ```npm run build```
   - Output directory: ```build```
   - Add environment variables (e.g. ```REACT_APP_API_URL```) in Vercel dashboard.
   - Auto deploys on push to ```main```.

# Project Structure
   ```
   greencart_logistics/
   ├── backend/            # Node.js Express backend code
   ├── frontend/           # React.js frontend code
   ├── README.md
   └── ...
   ```

# Live Check
   Frontend Link:
   ```
   https://greencart-logistics-git-main-devendra-dhakeds-projects.vercel.app?_vercel_share=1TR7Ifhc0YwIj6cyDaV1O8kjvDy4Jwk0
   ```

## Live Deployment Links

| Application       | URL                                                                                     |
|-------------------|-----------------------------------------------------------------------------------------|
| Frontend (React)  | [https://greencart-logistics-git-main-devendra-dhakeds-projects.vercel.app](https://greencart-logistics-git-main-devendra-dhakeds-projects.vercel.app?_vercel_share=1TR7Ifhc0YwIj6cyDaV1O8kjvDy4Jwk0) |
| Backend API       | [https://greencart-logistics-sssg.onrender.com/api](https://greencart-logistics-sssg.onrender.com/api)                           |
| Database          | Cloud PostgreSQL (Neon or equivalent)                                                  |

---

## API Documentation

| Endpoint              | Method | Description                     | Request Body / Headers                                 | Response Example                         |
|-----------------------|--------|---------------------------------|-------------------------------------------------------|-----------------------------------------|
| `/api/auth/login`     | POST   | Authenticate user, returns JWT   | `{ "username": "manager", "password": "password123" }` | `{ "token": "jwt-token" }`               |
| `/api/drivers`        | GET    | Get list of drivers (auth req.)  | Header: `Authorization: Bearer <token>`                | `[ { "id": 1, "name": "John Doe", ...} ]` |
| `/api/drivers`        | POST   | Create a new driver              | `{ "name": "John Doe", "shiftHours": 8 }`              | Created driver object                    |
| `/api/routes`         | CRUD   | Manage delivery routes           | See schema for route properties                         | Created/updated/deleted route            |
| `/api/orders`         | CRUD   | Manage delivery orders           | `{ "orderId": "...", "value": 1200, "routeId": 5 }`    | Created/updated/deleted order            |
| `/api/simulations/run`| POST   | Run a delivery simulation        | `{ "numDrivers": 5, "startTime": "09:00", "maxHours": 8 }` | Simulation KPIs and details             |

> **Note:** All protected routes require a valid JWT token in the `Authorization` header.

---


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Author

Devendra Dhaked – August 2025  
[GitHub](https://github.com/dhakeddevendra5)




