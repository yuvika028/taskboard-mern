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

## AI-assisted development

ChatGPT was used as a development assistant during the review and improvement of this project. It helped review the existing implementation, suggest fixes for error handling and input validation, improve API test coverage, and make the setup documentation clearer. The generated suggestions were reviewed before being incorporated; the project still needs local build and test verification.

### AI-assisted tasks

The following tasks were supported with AI assistance:

1. **Debugging and error handling:** Reviewed how the frontend responds when a task save or status update fails.
2. **API validation:** Reviewed validation for task status and priority values, including invalid inputs.
3. **Testing:** Helped improve API test coverage for task operations and error cases.
4. **Refactoring and maintainability:** Reviewed the separation of routes, controllers, model, and error-handling middleware.
5. **Documentation:** Improved the README with project structure, setup steps, API endpoints, and testing commands.

### Kiro or Code0 requirement

The evaluation instructions specifically request use of **Kiro or Code0**. ChatGPT use does not replace that requirement. If Kiro or Code0 is required for submission, use the selected tool on real project tasks and update this section with the tool, prompts, changes accepted or rejected, and checks actually performed. Do not claim to have used a tool or run tests unless that is true.

## Submission checklist

- Public repository: https://github.com/yuvika028/taskboard-mern
- Confirm that no `.env` files, secrets, or database credentials are committed.
- If required by the evaluator, complete a genuine Kiro or Code0 development session and document it above.
- From the `server` directory, run `npm test`.
- From the `client` directory, run `npm run build`.
- Start both applications and manually check task creation, editing, deletion, status updates, search, and filters.

