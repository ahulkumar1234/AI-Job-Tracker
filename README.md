# Job Tracker (Frontend)

AI-powered Job Tracking Platform (Frontend) built using **React + Vite + Tailwind CSS**.

This frontend allows users to:
- Search jobs from Adzuna API (via backend)
- Apply filters using Sidebar
- Track job applications
- Upload resume (PDF)
- View resume
- Use AI Assistant (chat) to control filters in real-time
- See AI match score between Resume & Job

---

## 🚀 Tech Stack

- React (Vite)
- Tailwind CSS
- React Router DOM
- React Icons
- React Hot Toast

---

## 📌 Features

### ✅ Job Search
- Search jobs by:
  - Job title / keywords
  - Location

### ✅ Sidebar Filters
- Skills selection
- Date posted
- Job type (Full-time, Internship, etc.)
- Work mode (Remote, Hybrid, On-site)

### ✅ Job Details Page
- View full job description
- Apply on company website
- Save job application

### ✅ Applications Tracker
- Track applications status:
  - Applied
  - Interview
  - Offer
  - Rejected
- Update status
- Remove application

### ✅ Resume Upload
- Upload resume (PDF only)
- Only **one resume stored** (new upload replaces old)
- Resume is served via backend `/uploads/...`

### ✅ AI Match Score
- AI reads resume + job description
- Returns:
  - Match score (0-100)
  - Missing skills
  - Summary

### ✅ Floating AI Assistant (Bottom Right Chat)
User can type commands like:
- "React jobs only"
- "Remote jobs in Bangalore"
- "Show internships only"
- "Clear filters"

Assistant will apply filters instantly and show reply like:
> Applied filters: React + Remote + Bangalore

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone <your-repo-url>
cd job-tracker/client
```
### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Run Frontend
```
npm run dev

```
### npm run dev
```
http://localhost:5173
```
## 🔗 Backend API Requirements
### Frontend expects backend running on:

```
http://localhost:8000

```
### Jobs

- GET /api/v1/jobs

- GET /api/v1/jobs/:id

### Applications

- GET /api/v1/applications

- POST /api/v1/applications

- PATCH /api/v1/applications/:id/status

- DELETE /api/v1/applications/:id

### Resume

- GET /api/v1/resume

- POST /api/v1/resume/upload

### AI Assistant

- POST /api/v1/assistant

### AI Match Score

- POST /api/v1/match-score

## 🧠 Folder Structure
```
src/
 ├── components/
 │    ├── JobCard.jsx
 │    ├── FiltersSidebar.jsx
 │    ├── FloatingAssistant.jsx
 │    ├── Navbar.jsx
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── JobDetails.jsx
 │    ├── Resume.jsx
 │    ├── Applications.jsx
 │
 ├── App.jsx
 ├── main.jsx
```

## 🧪 Example AI Commands

### Try these in the floating assistant:

- React jobs in Kolkata
- Remote MERN jobs
- Show internships only
- Jobs posted last week
- Clear

---
# 👤 Author

### Rahul Kumar
- 📧 Email: rahulkumar8340527941@gmail.com

- 🔗 LinkedIn: https://www.linkedin.com/in/rahul-kumar-3990b618b

- 💻 GitHub: https://github.com/ahulkumar1234

## ✅ Notes

- AI assistant depends on Gemini API.
- If Gemini quota is exceeded, assistant may fail.
- Resume match score works only when resume is uploaded.

## ⭐ Future Improvements

- Authentication (Login/Register)
- Save jobs feature
- Better AI scoring caching
- Pagination + infinite scroll
- Better resume parsing for scanned PDFs