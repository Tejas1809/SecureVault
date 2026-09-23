# 🔐 SecureVault

A web-based password and secrets manager built with React, Node.js, Express, and MongoDB.

## Features
- User registration and login with JWT authentication
- Store, view, and delete encrypted credentials
- Password generator
- Search and filter vault entries
- Export vault data
- Admin panel for user management

## Tech Stack
- **Frontend:** React 18, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcryptjs
- **Validation:** Joi

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally or MongoDB Atlas URI

### Backend Setup
```bash
cd server
npm install
cp ../.env.example .env
# Fill in your .env values
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

### Environment Variables
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/securevault
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_32_char_encryption_key_here
CLIENT_URL=http://localhost:3000
```

## Project Structure
```
securevault/
├── client/          # React frontend
├── server/          # Node.js/Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

## Contributing
Please read our contributing guidelines before submitting issues or pull requests.

## License
MIT License
