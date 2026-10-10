import { useCallback, useEffect, useState } from 'react';
import { api } from './services/api.js';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';
import Filters from './components/Filters.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ q: '', status: '', priority: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setError('');
      setTasks(await api.list(filters));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(load, 250); // debounce search typing
    return () => clearTimeout(t);
  }, [load]);

  const save = async (data) => {
    setError('');
    try {
      if (editing) await api.update(editing._id, data);
      else await api.create(data);
      setEditing(null);
      await load();
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  };

  const changeStatus = async (task, status) => {
    setError('');
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status } : t)));
    try {
      await api.update(task._id, { status });
    } catch (e) {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status: task.status } : t)));
      setError(e.message);
    }
  };

  const remove = async (id) => {
    setError('');
    try {
      await api.remove(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const done = tasks.filter((t) => t.status === 'done').length;

  return (
    <main className="app">
      <header>
        <h1>Taskboard</h1>
        <p>{tasks.length - done} open, {done} done</p>
      </header>

      <TaskForm key={editing?._id || 'new'} initial={editing} onSave={save} onCancel={() => setEditing(null)} />
      <Filters filters={filters} onChange={setFilters} />

      {error && <div role="alert" className="error">{error}</div>}
      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks match. Add one above to get started.</p>
      ) : (
        <ul className="list">
          {tasks.map((t) => (
            <TaskItem key={t._id} task={t} onStatus={changeStatus} onEdit={setEditing} onDelete={remove} />
          ))}
        </ul>
      )}
    </main>
  );
}
