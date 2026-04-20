import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import axios from 'axios';

const Calendar = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Padding for first day of week
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Calendar View</h1>
          <p style={{ color: 'var(--text-muted)' }}>Visualize your schedule and deadines.</p>
        </div>
        <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRadius: '12px' }}>
          <button onClick={prevMonth} className="btn-ghost" style={{ padding: '8px', borderRadius: '8px' }}><ChevronLeft size={20} /></button>
          <span style={{ fontWeight: '600', minWidth: '140px', textAlign: 'center' }}>{monthName} {year}</span>
          <button onClick={nextMonth} className="btn-ghost" style={{ padding: '8px', borderRadius: '8px' }}><ChevronRight size={20} /></button>
        </div>
      </header>

      <div className="glass" style={{ padding: '1.5rem', borderRadius: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '10px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', padding: '10px' }}>{day}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
          {days.map((day, idx) => {
            const dayTasks = day ? tasks.filter(t => {
              if (!t.dueDate) return false;
              const d = new Date(t.dueDate);
              return d.getDate() === day.getDate() && d.getMonth() === day.getMonth() && d.getFullYear() === day.getFullYear();
            }) : [];

            return (
              <div 
                key={idx} 
                className={day ? 'glass' : ''} 
                style={{ 
                  minHeight: '120px', 
                  padding: '10px', 
                  borderRadius: '12px', 
                  border: day && day.toDateString() === new Date().toDateString() ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                  background: day && day.toDateString() === new Date().toDateString() ? 'rgba(99, 102, 241, 0.05)' : 'transparent'
                }}
              >
                {day && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: day.getMonth() !== currentDate.getMonth() ? 0.3 : 1 }}>{day.getDate()}</span>
                      {dayTasks.length > 0 && <span style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }}></span>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {dayTasks.slice(0, 3).map(task => (
                        <div 
                          key={task._id} 
                          style={{ 
                            fontSize: '0.7rem', 
                            padding: '4px 6px', 
                            background: task.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', 
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: task.priority === 'high' ? '#ef4444' : 'var(--text-main)',
                            borderLeft: `2px solid ${task.priority === 'high' ? '#ef4444' : 'var(--primary)'}`
                          }}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>+ {dayTasks.length - 3} more</span>}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
