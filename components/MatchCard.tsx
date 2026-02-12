import { ChevronRight } from 'lucide-react';

export default function MatchCard({ match }: { match: any }) {
  const isWin = match.result === "Won";
  
  return (
    <div className={`group glass-morphism rounded-2xl p-4 border-l-4 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 cursor-pointer ${isWin ? 'border-emerald-500' : 'border-rose-600'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase">{match.agent}</p>
            <p className={`text-lg font-black italic uppercase ${isWin ? 'text-emerald-400' : 'text-rose-500'}`}>{match.result}</p>
          </div>
          <div>
            <h4 className="font-bold text-white">{match.map}</h4>
            <p className="text-[10px] text-slate-500 uppercase">{match.date_and_time}</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:block text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase">K/D/A</p>
                <p className="font-mono text-sm">{match.kills}/{match.deaths}/{match.assists}</p>
            </div>
            <ChevronRight className="text-slate-600 group-hover:text-rose-500 transition-colors" size={20} />
        </div>
      </div>
    </div>
  );
}