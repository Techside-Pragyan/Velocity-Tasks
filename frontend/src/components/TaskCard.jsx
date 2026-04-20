import { CheckCircle2, Circle, Clock, Tag, MoreVertical } from 'lucide-react';

const TaskCard = ({ task }) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          color: priorityColors[task.priority],
          padding: '4px 8px',
          background: `${priorityColors[task.priority]}15`,
          borderRadius: '6px'
        }}>
          {task.priority}
        </span>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <MoreVertical size={18} />
        </button>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
        {task.status === 'completed' ? (
          <CheckCircle2 size={20} color="var(--accent)" />
        ) : (
          <Circle size={20} color="var(--text-muted)" />
        )}
        <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', opacity: task.status === 'completed' ? 0.6 : 1 }}>
          {task.title}
        </span>
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.description || 'No description provided.'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Clock size={14} />
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Tag size={14} />
          {task.category}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
