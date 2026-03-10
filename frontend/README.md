Mannsathi Project Guide

Mannsathi is a mood tracking and emotional wellness web app.
It helps users:
- create an account
- log in
- log daily mood details
- answer reflection questions
- get personalized suggestions

Project Parts

1. Frontend
The frontend is built with React and Vite.
It handles:
- signup and login screens
- mood logging UI
- question forms
- personalized suggestions page

2. Backend
The backend is built with Node.js and Express.
It handles:
- user registration and login
- authentication
- mood and answer APIs
- database communication
- ML service communication

3. ML Service
The ML service is built with Python and Flask.
It handles:
- loading the trained model
- receiving mood-related input
- predicting a label
- returning the result to the backend

ML Services Used in the App

The app uses these ML-related tools:
- Flask
- scikit-learn
- joblib
- pandas

How ML works in this app:
- the backend sends data to the ML service
- the ML service combines fields like emoji, sleep quality, productivity, notes, and feeling
- the model predicts a label
- the backend converts that label into user-friendly suggestions

The model is based on:
- TfidfVectorizer
- RandomForestClassifier
- make_pipeline

Project Structure

frontend/
- public/
- src/
- index.html
- package.json
- README.md

backend/
- config/
- controllers/
- middleware/
- models/
- routes/
- utils/
- package.json
- server.js

ml-service/
- data.csv
- model.pkl
- predict_api.py
- train_model.py

Tech Stack

Frontend
- React
- Vite
- React Router DOM
- Axios
- React Toastify

Backend
- Node.js
- Express
- Mongoose
- CORS
- dotenv
- validator
- bcryptjs

ML Service
- Python
- Flask
- scikit-learn
- joblib
- pandas

Requirements

Frontend and Backend
- Node.js 18 or 20 recommended
- npm

ML Service
- Python 3.9+
- pip

Default Local URLs

- Frontend: http://127.0.0.1:5173
- Backend: http://localhost:4000
- ML Service: http://localhost:5000

How the App Works

1. The user opens the frontend.
2. The frontend sends requests to the backend.
3. The backend handles login, signup, mood logs, and answers.
4. For suggestions, the backend sends data to the ML service.
5. The ML service predicts a label.
6. The backend returns matching suggestions to the frontend.

Frontend Setup

Go to the frontend folder:
cd /Users/dhruvgohil/Developer/MoJo/frontend

Install dependencies:
npm install

Run the frontend:
npm run dev -- --host 127.0.0.1

Build the frontend:
npm run build

Backend Setup

Go to the backend folder:
cd /Users/dhruvgohil/Developer/MoJo/backend

Install dependencies:
npm install

Run the backend:
npm run start

Backend notes:
- runs on port 4000
- needs a JWT secret
- needs a working MongoDB connection for signup, login, and saved data

Example environment values:
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string_here

ML Service Setup

Go to the ML service folder:
cd /Users/dhruvgohil/Developer/MoJo/ml-service

Install Python packages:
python3 -m pip install flask joblib scikit-learn pandas

Run the ML service:
python3 predict_api.py

ML service notes:
- runs on port 5000
- needs model.pkl to be present
- may show warnings if scikit-learn version differs from the training version

Run the Full Project

Use 3 terminals.

Terminal 1:
cd /Users/dhruvgohil/Developer/MoJo/ml-service
python3 -m pip install flask joblib scikit-learn pandas
python3 predict_api.py

Terminal 2:
cd /Users/dhruvgohil/Developer/MoJo/backend
npm install
npm run start

Terminal 3:
cd /Users/dhruvgohil/Developer/MoJo/frontend
npm install
npm run dev -- --host 127.0.0.1

Then open:
http://127.0.0.1:5173/

Main Backend Routes

- POST /api/user/register
- POST /api/user/login
- POST /api/mood/log
- GET /api/mood/weekly
- GET /api/mood/today/:userId
- GET /api/mood/get-answers/:userId
- POST /api/questions/save-answers
- POST /api/suggestions

Common Issues

Blank screen
- make sure the frontend is running
- refresh the page
- check the browser console

Unable to create account
- make sure the backend is running
- make sure MongoDB is connected
- make sure JWT secret is set

Suggestions not loading
- make sure backend is running
- make sure ML service is running
- make sure model.pkl exists

Important Notes

- Signup and login need MongoDB to work
- Personalized suggestions need the ML service to work
- Node.js 18 or 20 is recommended
- Keep secrets in environment variables, not in code

Author

Mannsathi project for mood journaling and personalized emotional wellness support.