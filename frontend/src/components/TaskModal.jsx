import { useState } from 'react';
import { X, Calendar, Flag, Tag, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskModal = ({ isOpen, onClose, onSave }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Work',
    dueDate: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(taskData);
    setTaskData({ title: '', description: '', priority: 'medium', category: 'Work', dueDate: '' });
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card" 
          style={{ width: '100%', maxWidth: '600px', padding: '2rem', cursor: 'default' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Create New Task</h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="What needs to be done?" 
                style={{ fontSize: '1.25rem', fontWeight: '500', padding: '12px 0', background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', borderRadius: 0 }}
                value={taskData.title}
                onChange={e => setTaskData({...taskData, title: e.target.value})}
                required
                autoFocus
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <textarea 
                placeholder="Add description..." 
                rows="3"
                value={taskData.description}
                onChange={e => setTaskData({...taskData, description: e.target.value})}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <Calendar size={14} /> Due Date
                </label>
                <input 
                  type="date" 
                  value={taskData.dueDate}
                  onChange={e => setTaskData({...taskData, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <Flag size={14} /> Priority
                </label>
                <select 
                  value={taskData.priority}
                  onChange={e => setTaskData({...taskData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <Tag size={14} /> Category
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Work, Personal"
                  value={taskData.category}
                  onChange={e => setTaskData({...taskData, category: e.target.value})}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                <CheckSquare size={18} />
                Save Task
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;
