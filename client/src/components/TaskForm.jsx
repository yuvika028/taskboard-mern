import { useState } from 'react';

const empty = { title: '', description: '', priority: 'medium', dueDate: '' };

export default function TaskForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial ? { ...initial, dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '' } : empty
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const set = (k) => (e) => setForm((current) => ({ ...current, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Please enter a task title.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const saved = await onSave({
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        dueDate: form.dueDate || null,
      });
      if (saved && !initial) setForm(empty);
      if (!saved) setFormError('Task was not saved. Check the error message below.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <label className="field-label">Task title
        <input placeholder="What needs doing?" value={form.title} onChange={set('title')} maxLength={120} required />
      </label>
      <label className="field-label">Description (optional)
        <textarea placeholder="Add a few details" value={form.description} onChange={set('description')} rows={2} maxLength={500} />
      </label>
      <div className="row">
        <select value={form.priority} onChange={set('priority')} aria-label="Priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" value={form.dueDate} onChange={set('dueDate')} aria-label="Due date" />
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : initial ? 'Save changes' : 'Add task'}</button>
        {initial && <button type="button" className="ghost" onClick={onCancel} disabled={saving}>Cancel</button>}
      </div>
      {formError && <p className="form-error" role="status">{formError}</p>}
    </form>
  );
}
