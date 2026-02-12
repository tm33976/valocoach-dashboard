"use client";
import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, animate, motion } from "framer-motion";
import { Target, Swords, Trophy, Activity, Crown, Star, TrendingUp } from 'lucide-react';

export default function StatsGrid({ data }: { data: any }) {
  const primaryStats = [
    { label: 'Headshot %', value: data.overall_headshot_percentage, icon: Target, color: 'text-emerald-400', suffix: '%' },
    { label: 'K/D Ratio', value: data.overall_kd_ratio, icon: Swords, color: 'text-rose-500', decimals: 2 },
    { label: 'Win Rate', value: data.overall_win_percent, icon: Trophy, color: 'text-amber-400', suffix: '%' },
    { label: 'Avg. ACS', value: data.overall_ACS, icon: Activity, color: 'text-blue-400' },
  ];

  const advancedStats = [
    { label: 'Peak Rank', value: data.peak_rank, icon: Star, color: 'text-purple-400' },
    { label: 'Leaderboard', value: `#${data.leaderboard_placement}`, icon: Crown, color: 'text-yellow-500' },
    { label: 'Top Agent', value: data.top_agent, icon: TrendingUp, color: 'text-rose-400' },
    { label: 'Best Map', value: data.best_map, icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Grid - Cards are static, only numbers animate */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {primaryStats.map((s) => (
          <div 
            key={s.label}
            className="p-5 glass-morphism rounded-2xl relative overflow-hidden bg-[#161922] border border-white/5 shadow-sm group"
          >
            <div className="flex justify-between items-center mb-2 relative z-10">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                {s.label}
              </span>
              <s.icon size={16} className={`${s.color} opacity-70 group-hover:scale-110 transition-transform`} />
            </div>
            
            <div className="text-2xl font-black text-white italic relative z-10 flex">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </div>

            <div className={`absolute -bottom-4 -right-4 w-12 h-12 blur-2xl opacity-10 rounded-full transition-opacity ${s.color.replace('text', 'bg')}`}></div>
          </div>
        ))}
      </div>

      {/* Advanced Info Grid - Static cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {advancedStats.map((s) => (
          <div 
            key={s.label}
            className="p-4 rounded-2xl border border-white/5 flex items-center gap-4 bg-white/5"
          >
            <div className={`p-2 rounded-lg bg-black/40 shadow-sm ${s.color}`}>
              <s.icon size={16} />
            </div>
            <div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter leading-none mb-1">
                {s.label}
              </p>
              <p className="text-sm font-bold text-slate-200">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ value, decimals = 0, suffix = "" }: { value: any, decimals?: number, suffix?: string }) {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 60, damping: 20 });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, numericValue, { duration: 2, ease: "circOut" });
    }
  }, [count, numericValue, isInView]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
      }
    });
  }, [rounded, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}