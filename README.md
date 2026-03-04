# Kabsat La Union - Resort Reservation System

A full-stack resort reservation system for Kabsat La Union, a surf resort in La Union, Philippines. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Guest Features
- Browse available rooms and accommodations
- View room details with images, amenities, and pricing
- Real-time availability checking with date picker
- Online booking with guest information form
- Email confirmation with booking receipt
- PDF receipt generation and download

### Admin Features
- Secure admin authentication (JWT-based)
- Dashboard with booking statistics
- Manage rooms (add, edit, delete)
- View and manage bookings
- Update booking status (pending, confirmed, cancelled)

## Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **date-fns** for date handling
- **jsPDF** & **html2canvas** for PDF generation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests

## Project Structure

```
├── backend/
│   ├── config/          # Database & constants
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Email service, seed scripts
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── layouts/     # Page layouts (Header, Footer)
│       ├── lib/         # Utilities (PDF generator)
│       ├── pages/       # Page components
│       ├── services/    # API service layer
│       └── store/       # Zustand stores
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RabbitDaCoder/Kabsat-La-Union.git
   cd Kabsat-La-Union
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/kabsat_launion
   JWT_SECRET=your_secure_secret_key
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM="Kabsat La Union <noreply@kabsatlaunion.com>"
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Seed the Database**
   ```bash
   cd backend
   npm run seed:admin   # Create admin user
   npm run seed:rooms   # Add sample rooms
   ```

### Running the Application

**Development mode:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Login: http://localhost:5173/admin/login

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get room by ID |
| GET | `/api/rooms/:id/availability` | Check room availability |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/:id` | Get booking by ID |
| GET | `/api/health` | Health check |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/bookings` | All bookings |
| PATCH | `/api/admin/bookings/:id` | Update booking |
| POST | `/api/admin/rooms` | Create room |
| PUT | `/api/admin/rooms/:id` | Update room |
| DELETE | `/api/admin/rooms/:id` | Delete room |

## Deployment

### Backend (Render)
The backend is configured for Render deployment via `render.yaml`. Set environment variables in the Render dashboard.

### Frontend (Vercel)
The frontend is configured for Vercel deployment via `vercel.json`. Set `VITE_API_URL` to your production backend URL.

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password/app password |
| `EMAIL_FROM` | Sender email address |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_WEBSITE_URL` | Production website URL |

## License

ISC

## Author

Developed for Kabsat La Union Surf Resort
