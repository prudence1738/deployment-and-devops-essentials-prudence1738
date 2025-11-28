A simple full-stack MERN application where users can submit short messages that are stored in MongoDB and displayed instantly on the
frontend.This project demonstrates a complete production-ready MERN workflow, including deployment, CI/CD, environment configuration, and monitoring.

##Features
•React frontend built with Vite
•Express.js backend with MongoDB
•Fully functional Create + Read message system
•Secure HTTP headers with Helmet
•Production logging using Morgan and Winston
•Environment-based configuration
•CI workflow using GitHub Actions
•Ready for deployment to Render (backend) and Vercel (frontend)

## Tech Stack

Frontend

React (Vite)
Fetch API
Environment variables (import.meta.env)
Lazy loading + code splitting
Backend
Node.js + Express.js
Mongoose (MongoDB ODM)
Helmet (security)
Morgan + Winston (logging)
Optional Sentry error tracking

## Database

•MongoDB Atlas
•Connection pooling enabled

DevOps

•GitHub Actions CI
•Production builds
•Environment-based configurations
•Health check endpoint /health

## Project Structure

root/
 ├── server/
 │    ├── server.js
 │    ├── models/
 │    ├── package.json
 │    └── .env.example
 ├── client/
 │    ├── src/
 │    ├── index.html
 │    ├── package.json
 │    └── .env
 └── .github/
      └── workflows/
           └── ci.yml
           
## Quick set up

 1.Clone the repository 
 git clone <your-repo-url>
 cd <repo-folder>
 
 
## Back end setup

 Install dependencies
cd server
npm install

Create Environment File
Copy .env.example:
cp .env.example .env


Fill in:

PORT=5000
MONGO_URI=your-mongodb-atlas-uri
NODE_ENV=development

Run the Backend
npm run dev

Backend will run on:
http://localhost:5000

Frontend Setup
Install Dependencies
cd client
npm install

Configure Environment Variables (client/.env
VITE_API_URL=http://localhost:5000

Run the front end
npm run dev

front end will run on:
http://localhost:5173

API Endpoints

GET /api/messages

Returns all messages.

POST /api/messages

Creates a new message.

Json
{
  "text": "Hello world"
}

Get /Health
Health check for uptime monitoring.

## Deployment

Backend Deployment (Render / Railway / Heroku)

You will need to:
1.Create a new service
2.Connect GitHub repository
3.Add environment variables (PORT, MONGO_URI)
4.Enable auto-deploy from GitHub
5.Deploy

## Frontend Deployment (Vercel / Netlify)

Steps:

1.Create new site
2.Select client/ folder
3.Set build command: npm run build
4.Set output directory: dist
5.Add env variable:

°VITE_API_URL=https://your-backend-url

6.Deploy
CI/CD Pipeline

## This project includes a GitHub Actions workflow that:
Installs dependencies
°Runs linter
°Builds the React app
°Validates project structure
°Workflow location:

.github/workflows/ci.yml

Monitoring & Logging

Logging
°Development: detailed logs (Morgan "dev")
°Production: combined logs + Winston

Health Monitoring

Use /health endpoint with:

*UptimeRobot
*BetterStack
*Pingdom

Optional Error Tracking

*Enable Sentry by adding SENTRY_DSN in:
*server/.env
*client/.env.production


