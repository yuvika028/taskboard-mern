const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

module.exports = app;
