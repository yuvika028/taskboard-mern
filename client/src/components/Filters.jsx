export default function Filters({ filters, onChange }) {
  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value });
  return (
    <div className="filters">
      <input type="search" placeholder="Search titles" value={filters.q} onChange={set('q')} />
      <select value={filters.status} onChange={set('status')} aria-label="Filter by status">
        <option value="">All statuses</option>
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <select value={filters.priority} onChange={set('priority')} aria-label="Filter by priority">
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
