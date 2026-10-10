# Taskboard — MERN Task Manager

Taskboard is a small full-stack task manager built with MongoDB, Express, React, and Node.js. It lets users create and maintain tasks, track progress, set priorities and due dates, and find tasks with search and filters.

## Features

- Create, edit, and delete tasks
- Track task status: **To do**, **In progress**, and **Done**
- Set **Low**, **Medium**, or **High** priority and an optional due date
- Search task titles and filter by status and priority
- Highlight overdue tasks that are not marked done
- Validate task data on the server and return consistent JSON errors
- Roll back an optimistic status change if the API request fails
- API integration tests using Jest, Supertest, and an in-memory MongoDB server

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API testing | Jest, Supertest, mongodb-memory-server |

## Project structure

```text
taskboard/
├── client/
│   ├── src/
│   │   ├── components/       # Task form, task item, and filters
│   │   ├── services/api.js   # API requests
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Task request handlers
│   │   ├── middleware/       # Async wrapper and error handling
│   │   ├── models/           # Mongoose Task model
│   │   ├── routes/           # REST API routes
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/tasks.test.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer (Node.js 20+ recommended)
- npm
- A MongoDB instance, either local MongoDB or MongoDB Atlas

## Setup

Clone your public repository and enter the project directory:

```bash
git clone https://github.com/yuvika028/taskboard-mern.git
cd taskboard-mern
```

### 1. Configure and start the backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and set `MONGO_URI` to your local or Atlas connection string. Keep credentials private; never commit `.env`.

```bash
# macOS/Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

### 2. Configure and start the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Copy `client/.env.example` to `client/.env` if you need to change the API URL. The default is `http://localhost:5000/api`.

```bash
# macOS/Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Tests and production build

Run the backend API tests (from the `server` directory):

```bash
npm test
```

The tests use `mongodb-memory-server`; the first run may need to download a compatible MongoDB binary. A network-restricted environment can prevent that download.

Check that the frontend compiles (from the `client` directory):

```bash
npm run build
```

## REST API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API health check |
| `GET` | `/api/tasks` | List tasks; optional `status`, `priority`, and `q` query parameters |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

Example task payload:

```json
{
  "title": "Prepare project demo",
  "description": "Check the main task flows",
  "status": "todo",
  "priority": "medium",
  "dueDate": null
}
```

Allowed statuses are `todo`, `in-progress`, and `done`. Allowed priorities are `low`, `medium`, and `high`.

## AI-assisted development disclosure

**Important:** The evaluation instructions ask candidates to use **Kiro or Code0** and to describe their actual AI-assisted work. Do not claim to have used either tool unless you have done so. In this review pass, ChatGPT was used to inspect the supplied code, identify and fix error-handling issues, improve API validation, strengthen tests, and update this documentation. Before submitting, open the project in the required tool (Kiro or Code0), use it for genuine project work, and update the section below with your real tool and prompts/results.

### Required Kiro/Code0 session record — complete before submission

- **Tool actually used:** `[Kiro or Code0 — fill in after using it]`
- **What I asked it to do:** `[Summarize your real prompts and the changes you accepted or rejected]`
- **What I verified manually:** `[Record the commands/tests you actually ran and their results]`

Suggested tasks to work through in Kiro or Code0 (only report tasks you really performed):

1. Review the task form's save flow and make sure it does not clear user input when the API save fails.
2. Review server-side validation for status and priority filters and suggest edge cases.
3. Add or improve API tests for filtering, invalid input, and missing task IDs.
4. Review the API error responses and frontend handling of a server/network failure.
5. Explain the changes you accepted, changed yourself, or rejected, and run the build/tests.

## Before submitting

- [x] Public repository URL: https://github.com/yuvika028/taskboard-mern
- [ ] Confirm `.env` files and database credentials are not committed.
- [ ] Use Kiro or Code0 as required by the evaluation and complete the AI session record honestly.
- [ ] Run `npm test` in `server` and `npm run build` in `client`; record the real results.
- [ ] Start both apps locally and manually verify create, edit, delete, status change, search, and filters.
