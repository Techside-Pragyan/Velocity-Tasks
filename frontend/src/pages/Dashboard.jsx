import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post('http://localhost:5000/api/tasks', taskData, config);
      fetchTasks();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {tasks.filter(t => t.status !== 'completed').length} tasks for today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Create Task
        </button>
      </header>

      <section className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search tasks..." style={{ paddingLeft: '40px' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="glass" style={{ display: 'flex', padding: '4px', borderRadius: '10px' }}>
            <button 
              onClick={() => setView('grid')}
              style={{ background: view === 'grid' ? 'var(--primary)' : 'transparent', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              style={{ background: view === 'list' ? 'var(--primary)' : 'transparent', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className={view === 'grid' ? 'task-grid' : 'task-list'}>
        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No tasks found. Time to relax! 🌴</p>
          </div>
        )}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateTask} 
      />
    </div>
  );
};

export default Dashboard;
