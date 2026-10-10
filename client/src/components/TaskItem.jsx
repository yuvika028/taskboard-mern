export default function TaskItem({ task, onStatus, onEdit, onDelete }) {
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dueDate) dueDate.setHours(0, 0, 0, 0);
  const overdue = dueDate && task.status !== 'done' && dueDate < today;
  return (
    <li className={`task p-${task.priority} ${task.status === 'done' ? 'done' : ''}`}>
      <div className="body">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <small className={overdue ? 'overdue' : ''}>
          {task.priority} priority
          {task.dueDate && `, due ${new Date(task.dueDate).toLocaleDateString()}`}
          {overdue && ' (overdue)'}
        </small>
      </div>
      <div className="actions">
        <select value={task.status} onChange={(e) => onStatus(task, e.target.value)} aria-label="Status">
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <button className="ghost" onClick={() => onEdit(task)}>Edit</button>
        <button className="ghost danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
}
