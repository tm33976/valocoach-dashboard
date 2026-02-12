"use client";
import { X, Zap, Target, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MatchModal({ match, onClose }: { match: any, onClose: () => void }) {
  if (!match) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay (Fades in/out) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* 2. Modal Content Box (Pops and Scales) */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-xl bg-[#0f111a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] custom-scrollbar"
      >
        {/* Animated Background Glow */}
        <div className={`absolute top-0 inset-x-0 h-32 opacity-20 blur-3xl pointer-events-none ${match.result === 'Won' ? 'bg-emerald-500' : 'bg-rose-600'}`}></div>

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-slate-500 hover:text-white hover:rotate-90 transition-all duration-300 z-10"
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${match.result === 'Won' ? 'text-emerald-400' : 'text-rose-500'}`}>
              MATCH {match.match_number} — {match.result}
            </p>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none mb-2">
              {match.map}
            </h2>
            <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <Zap size={12} className="text-amber-500" /> {match.agent} • {match.date_and_time}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <DetailTile label="Combat Score" value={match.ACS} icon={Zap} color="text-amber-400" />
            <DetailTile label="K/D Ratio" value={match.kd_ratio} icon={Target} color="text-rose-500" />
            <DetailTile label="Headshot %" value={`${match.headshot_percentage}%`} icon={Hash} color="text-emerald-400" />
          </div>

          <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Kills</p>
                <p className="text-3xl font-black text-white">{match.kills}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Deaths</p>
                <p className="text-3xl font-black text-white">{match.deaths}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Assists</p>
                <p className="text-3xl font-black text-white">{match.assists}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 px-6 py-4 rounded-2xl flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Damage Made</span>
                <span className="text-sm font-bold text-slate-200">{match.damage_made}</span>
              </div>
              <div className="bg-white/5 px-6 py-4 rounded-2xl flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Total Rounds</span>
                <span className="text-sm font-bold text-slate-200">{match.total_rounds}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-xl"
            >
              Close Record
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DetailTile({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
      <div className={`p-2 rounded-lg bg-black/40 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] uppercase font-bold text-slate-500 mb-1 leading-none">{label}</p>
        <p className="text-xl font-black text-white leading-none">{value}</p>
      </div>
    </div>
  );
}