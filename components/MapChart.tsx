"use client";
import { motion, circOut } from 'framer-motion';
export default function MapChart({ matches }: { matches: any[] }) {
  const mapData = matches.reduce((acc: any, match: any) => {
    if (!acc[match.map]) acc[match.map] = { wins: 0, total: 0 };
    acc[match.map].total++;
    if (match.result === "Won") acc[match.map].wins++;
    return acc;
  }, {});
  const barVariants = {
    hidden: { width: 0 },
    visible: (customWinRate: number) => ({
      width: `${customWinRate}%`,
      transition: { 
        duration: 1.5, 
        ease: circOut, 
        delay: 0.2 
      }
    })
  };

  return (
    <div className="glass-morphism p-6 rounded-3xl border border-white/5 shadow-2xl bg-[#161922]/50">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
        <div className="w-1 h-3 bg-rose-600 rounded-full"></div>
        Map Win Rates
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {Object.entries(mapData).slice(0, 6).map(([name, stats]: [string, any]) => {
          const winRate = Math.round((stats.wins / stats.total) * 100);
          
          return (
            <div key={name} className="space-y-2 group">
              <div className="flex justify-between text-[10px] font-bold uppercase italic tracking-tight">
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  {name}
                </span>
                <span className="text-rose-500 font-black">
                  {winRate}%
                </span>
              </div>

              {/* Progress Bar Container - Static */}
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                {/* Filler - Animates on Scroll */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={winRate}
                  variants={barVariants}
                  className="h-full bg-linear-to-r from-rose-600 to-purple-600 shadow-[0_0_15px_rgba(225,70,85,0.3)]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}