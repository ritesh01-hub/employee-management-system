# Employee Management System

A frontend-only task management app where an admin assigns tasks and employees accept and complete them. Built with React, Vite and Tailwind CSS.

**Live demo:** <your-vercel-link>

## Features

- Login with separate admin and employee views
- Admin dashboard to create and assign tasks to employees
- Employee dashboard to view assigned tasks, accept them and mark them complete
- Task status tracking (new, accepted, completed)
- Data persisted in the browser using localStorage
- Responsive UI styled with Tailwind CSS

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Context API for auth and task state
- localStorage for data persistence

## Demo Credentials

| Role     | Email   | Password   |
| -------- | ------- | ---------- |
| Admin    | <email> | <password> |
| Employee | <email> | <password> |

## Screenshots

<add screenshots of the login page, admin dashboard and employee dashboard>

## Getting Started

```bash
git clone https://github.com/ritesh01-hub/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Auth/            # Login
│   ├── Dashboard/       # Admin and Employee dashboards
│   └── TaskList/        # NewTask, AcceptTask, CompleteTask
├── context/             # AuthContext, TaskContext
├── utils/               # localStorage helpers
└── pages/
```

## Notes

This project has no backend. All data lives in the browser's localStorage, so it is not shared across browsers or devices.

## Author

Ritesh Tiwari
[GitHub](https://github.com/ritesh01-hub) · [LinkedIn](https://www.linkedin.com/in/ritesh-tiwari-0a917737a/)