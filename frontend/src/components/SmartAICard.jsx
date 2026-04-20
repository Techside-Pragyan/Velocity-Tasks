import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartAICard = ({ tasks }) => {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  
  const getSuggestions = () => {
    if (pendingTasks.length === 0) return ["Plan your next big project", "Set a fitness goal for the week"];
    
    const suggested = [];
    if (pendingTasks.some(t => t.priority === 'high')) {
      suggested.push("Focus on your high-priority tasks first to clear your mental bandwidth.");
    }
    if (pendingTasks.length > 5) {
      suggested.push("Consider breaking down your larger tasks into smaller subtasks.");
    }
    if (!pendingTasks.some(t => t.category === 'Health')) {
      suggested.push("Don't forget to schedule some 'me time' or a quick workout today.");
    }
    
    return suggested.slice(0, 2);
  };

  const suggestions = getSuggestions();

  return (
    <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <Sparkles size={18} color="#8b5cf6" />
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#a78bfa' }}>Smart Suggestions</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {suggestions.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}
          >
            <div style={{ marginTop: '2px' }}><Zap size={14} color="#8b5cf6" /></div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>{s}</p>
          </motion.div>
        ))}
      </div>

      <button className="btn-ghost" style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.8rem', padding: '8px', borderRadius: '8px', color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.2)' }}>
        Get more AI insights <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default SmartAICard;
