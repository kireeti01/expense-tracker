📁 Expense Tracker Frontend

Frontend-only project – no backend required.
All data is stored in localStorage. Authentication is simulated and accepts any dummy values.
🌐 Live Demo: https://expense-tracker-hjcf.vercel.app/

✅ All routes work properly and navigate as expected.

🗂 Mandatory Folder Structure (Follow Strictly)
client/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Dashboard/
│   │   └── UI/
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ExpenseContext.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TransactionHistory.jsx
│   │   ├── AddTransaction.jsx
│   │   ├── EditTransaction.jsx
│   │   ├── CategoryManagement.jsx
│   │   ├── BudgetManagement.jsx
│   │   ├── Reports.jsx
│   │   └── ProfileSettings.jsx
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
🧭 Routing Requirements
🌐 Public Routes
Path	Component
/	Landing Page
/login	Login
/register	Register
🔐 Protected Routes

(Redirect simulated unauthenticated users to /login)

Path	Component
/dashboard	Dashboard
/transactions	TransactionHistory
/add-transaction	AddTransaction
/edit-transaction/:id	EditTransaction
/categories	CategoryManagement
/budgets	BudgetManagement
/reports	Reports
/profile	ProfileSettings

✅ All routes are tested and working properly.

🏠 Landing Page

Full-screen background image

App name + tagline

“Explore” button → /login or /register

Smooth entrance animations (Framer Motion)

🔐 Authentication (Frontend Only / Dummy Values)

Accepts any username/email and password

Context-based simulated session in localStorage

Session persists on refresh

Logout clears session

No backend or real authentication involved

📊 Dashboard

Summary cards:

Total Income

Total Expenses

Balance (₹ INR)

Recent transactions list

Simple charts using Recharts

Smooth animations

Responsive layout

💸 Transactions

Add, Edit, Delete transactions

Filter & sort (date, category, amount)

Static sample data initially

Persist all data in localStorage

Routes:

/transactions

/add-transaction

/edit-transaction/:id

🗂️ Category Management

CRUD UI for categories

Stored in localStorage

Route: /categories

💰 Budget Management

Set budgets per category

Simple progress indicators

Stored in localStorage

Route: /budgets

📈 Reports

Category-wise and monthly charts (Recharts)

Uses existing transaction data

Route: /reports

👤 Profile & Settings

View & update user info

Logout option

Route: /profile

🎨 UI / UX Guidelines

Modern, clean design

Glassmorphism cards

Gradient backgrounds

Framer Motion animations

Fully responsive (mobile + desktop)

🧠 Code Quality Rules

Functional components only

Clean imports & exports

Context for global state

Custom hooks where helpful

No console errors

Easy to replace localStorage with real APIs later

🚀 Final Output Expectations

Fully working frontend

Strict folder structure

Smooth animations

INR currency (₹)

No backend required

Accepts any dummy login credentials

All routes fully functional

Live Demo: https://expense-tracker-hjcf.vercel.app/
