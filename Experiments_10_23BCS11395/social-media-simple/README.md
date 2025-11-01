# Social Media App (Simple) - Local MongoDB

## Features
- Backend: Express + MongoDB (Mongoose) + JWT + Bcrypt
- Frontend: React (Vanilla CSS), simpler manual-token flow
- Local MongoDB connection: `mongodb://localhost:27017/social_app`

## Run Backend
1. Start MongoDB locally (e.g., `mongod`).
2. Open terminal:
   ```bash
   cd backend
   npm install
   npm start
   ```

## Run Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000 and calls backend at http://localhost:5000 via proxy `/api`.

## Notes
- Frontend expects you to obtain a JWT token (from `/api/auth/register` or `/api/auth/login`) and paste it into the input to perform protected actions.
