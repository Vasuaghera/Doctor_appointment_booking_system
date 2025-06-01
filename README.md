# Healthcare Management System

A full-stack healthcare management system built with React and Node.js.

## Features

- User Authentication (Login/Register)
- Email Notifications
- Admin Dashboard
- Patient Management
- Doctor Management
- Appointment Scheduling

## Tech Stack

### Frontend
- React.js
- Material-UI
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer

## Setup Instructions

1. Clone the repository
```bash
git clone <your-repo-url>
cd Hospital-Mang-Full-Stack-main
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
Create a `.env` file in the backend directory with the following variables:
```
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_USER=your_gmail
SMTP_PASS=your_app_specific_password
```

4. Run the application
```bash
# Start backend server
cd backend
npm run server

# Start frontend development server
cd frontend
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) Atlas account
- MongoDB Compass installed (optional for local database management)
- Git installed

---

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vasuaghera/Hospital-Mang-Full-Stack.git
   cd Hospital-Mang-Full-Stack
   ```

2. **Install Dependencies**
   Run the following command in all three folders (`admin`, `backend`, and `frontend`):
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Each folder (`admin`, `backend`, and `frontend`) must have a `.env` file. Add the appropriate configurations:

4. **Create a MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/).
   - Create a new project and set up a database cluster.
   - Obtain the connection string (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`).

5. **Connect MongoDB with Compass (Optional)**
   - Open [MongoDB Compass](https://www.mongodb.com/products/compass).
   - Paste your MongoDB connection string to connect to the database.
   - Create a collection to store your app data.

6. **Run the Application**
   - Navigate to each folder and start the servers:
     - **Admin & Frontend**:
       ```bash
       npm run dev
       ```
     - **Backend**:
       ```bash
       npm run server
       ```

---

### Access the Application
- **Admin Panel**: `http://localhost:<port_for_admin>`
- **Frontend**: `http://localhost:<port_for_frontend>`
- **Backend API**: `http://localhost:5000`

---

## Folder Structure
```
Hospital-Mang-Full-Stack/
│
├── admin/           # Admin panel (React, Tailwind CSS)
├── backend/         # Backend server (Node.js, Express)
├── frontend/        # Frontend client (React, Tailwind CSS)
└── README.md        # Project documentation
```

---

