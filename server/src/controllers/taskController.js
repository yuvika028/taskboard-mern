const Task = require('../models/Task');

// Only these fields may be set by clients (prevents mass-assignment)
const pick = (body = {}) => {
  const source = body && typeof body === 'object' ? body : {};
  const allowed = ['title', 'description', 'status', 'priority', 'dueDate'];
  return Object.fromEntries(
    allowed
      .filter((k) => Object.prototype.hasOwnProperty.call(source, k))
      .map((k) => [k, source[k]])
  );
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
exports.list = async (req, res) => {
  const { status, priority, q } = req.query;
  const validStatuses = ['todo', 'in-progress', 'done'];
  const validPriorities = ['low', 'medium', 'high'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json( { message: 'Invalid status filter' });
  }
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Invalid priority filter' });
  }
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (q) filter.title = { $regex: escapeRegex(String(q)), $options: 'i' };
  res.json(await Task.find(filter).sort({ createdAt: -1 }));
};

exports.create = async (req, res) => {
  const task = await Task.create(pick(req.body));
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,
    runValidators: true,
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

exports.remove = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(204).end();
};
