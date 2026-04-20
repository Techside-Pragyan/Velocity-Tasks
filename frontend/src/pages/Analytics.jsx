import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Analytics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/tasks/analytics', config);
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        // Mock data for demo if backend isn't ready
        setStats({
          total: 25,
          completed: 18,
          pending: 5,
          inProgress: 2,
          priorityStats: { high: 8, medium: 12, low: 5 },
          categoryStats: { Work: 10, Personal: 8, Health: 4, Finance: 3 }
        });
        setLoading(false);
      }
    };
    fetchStats();
  }, [user.token]);

  if (loading) return <div>Loading insights...</div>;

  const pieData = [
    { name: 'Completed', value: stats.completed, color: '#10b981' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'In Progress', value: stats.inProgress, color: '#6366f1' },
  ];

  const priorityData = [
    { name: 'High', value: stats.priorityStats.high, color: '#ef4444' },
    { name: 'Medium', value: stats.priorityStats.medium, color: '#f59e0b' },
    { name: 'Low', value: stats.priorityStats.low, color: '#10b981' },
  ];

  const categoryData = Object.keys(stats.categoryStats).map(key => ({
    name: key,
    value: stats.categoryStats[key]
  }));

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Productivity Insights</h1>
        <p style={{ color: 'var(--text-muted)' }}>Visualize your progress and optimize your workflow.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Tasks" value={stats.total} icon={<TrendingUp color="#6366f1" />} />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle color="#10b981" />} />
        <StatCard title="Pending" value={stats.pending} icon={<Clock color="#f59e0b" />} />
        <StatCard title="Efficiency" value={`${Math.round((stats.completed / (stats.total || 1)) * 100)}%`} icon={<AlertCircle color="#8b5cf6" />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Tasks by Category</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Status Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.8rem' }}>
            {pieData.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color }}></span>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{title}</p>
      <h4 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</h4>
    </div>
  </div>
);

export default Analytics;
