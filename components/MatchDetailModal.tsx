"use client";
import { X, Zap, Target, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MatchDetailModal({ match, onClose }: { match: any, onClose: () => void }) {
  if (!match) return null;

  const isWin = match.result === "Won";
  const containerVars = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 25, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop: High contrast blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Box: Transitions from obsidian to pure white */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-2xl overflow-hidden shadow-2xl transition-colors duration-500
                   dark:bg-[#0f111a] bg-white border dark:border-white/10 border-slate-200 rounded-[2.5rem] flex flex-col max-h-[90vh]"
      >
        {/* Animated Accent Glow: Pulsing gaming energy */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`absolute top-0 inset-x-0 h-40 blur-3xl pointer-events-none transition-colors ${isWin ? 'bg-emerald-500' : 'bg-rose-600'}`}
        />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full z-20 transition-all duration-300
                     dark:bg-black/40 bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-rose-500 hover:rotate-90 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="relative p-6 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* Header Info: High-contrast headings */}
          <motion.div variants={itemVars} className="flex flex-col items-center text-center space-y-2">
            <p className={`text-xs font-black uppercase tracking-[0.3em] ${isWin ? 'text-emerald-400' : 'text-rose-500'}`}>
              Match {match.match_number} — {match.result}
            </p>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter transition-colors duration-500
                           dark:text-white text-slate-900 leading-none">
              {match.map}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest
                            dark:text-slate-500 text-slate-400">
              <Zap size={12} className="text-amber-500" /> {match.agent} • {match.date_and_time}
            </div>
          </motion.div>

          {/* Performance Tiles: Elevated surfaces */}
          <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatTile label="Combat Score" value={match.ACS} icon={Zap} color="text-amber-400" />
            <StatTile label="K/D Ratio" value={match.kd_ratio} icon={Target} color="text-rose-500" />
            <StatTile label="Headshot %" value={`${match.headshot_percentage}%`} icon={Hash} color="text-emerald-400" />
          </motion.div>

          {/* Detailed Statistics Box: Nested card design */}
          <motion.div variants={itemVars} className="rounded-[2rem] p-8 border transition-all duration-500
                                                     dark:bg-black/40 bg-slate-50 dark:border-white/5 border-slate-200">
            <div className="grid grid-cols-3 gap-8 text-center">
              <StatItem label="Kills" value={match.kills} />
              <StatItem label="Deaths" value={match.deaths} />
              <StatItem label="Assists" value={match.assists} />
            </div>
            
            <div className="mt-8 pt-8 border-t dark:border-white/5 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataRow label="Damage Made" value={match.damage_made} />
              <DataRow label="Total Rounds" value={match.total_rounds} />
            </div>
          </motion.div>

          <motion.div variants={itemVars} className="text-center">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl
                         dark:bg-white dark:text-black bg-slate-900 text-white hover:bg-rose-600 hover:text-white cursor-pointer"
            >
              Close Record
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

//Helper Components
function StatTile({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-4 rounded-2xl border transition-all duration-500
                    dark:bg-white/5 bg-white dark:border-white/5 border-slate-200 flex items-center gap-4">
      <div className={`p-2 rounded-lg shadow-sm dark:bg-black/40 bg-slate-50 ${color}`}><Icon size={18} /></div>
      <div>
        <p className="text-[9px] dark:text-slate-500 text-slate-400 font-black uppercase tracking-tighter mb-1 leading-none">{label}</p>
        <p className="text-xl font-black dark:text-white text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div>
      <p className="text-[10px] dark:text-slate-500 text-slate-400 font-black uppercase mb-1">{label}</p>
      <p className="text-3xl font-black dark:text-white text-slate-900 transition-colors duration-500">{value}</p>
    </div>
  );
}

function DataRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center px-6 py-4 rounded-2xl border transition-all duration-500
                    dark:bg-white/5 bg-white dark:border-white/5 border-slate-100 shadow-sm">
      <span className="text-[10px] dark:text-slate-500 text-slate-500 font-bold uppercase">{label}</span>
      <span className="text-sm font-bold dark:text-slate-200 text-slate-800">{value}</span>
    </div>
  );
}