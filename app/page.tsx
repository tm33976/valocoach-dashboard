"use client";
import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import playerFileData from '@/data/player.json';
import ProfileCard from '@/components/ProfileCard';
import StatsGrid from '@/components/StatsGrid';
import MatchCard from '@/components/MatchCard';
import MapChart from '@/components/MapChart';
import MatchDetailModal from '@/components/MatchDetailModal';
import { Search } from 'lucide-react';

export default function Dashboard() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const filteredMatches = useMemo(() => {
    return playerFileData.matches.filter((m: any) => {
      const statusMatch = filter === 'All' || m.result === filter;
      const searchMatch = m.map.toLowerCase().includes(search.toLowerCase()) || 
                         m.agent.toLowerCase().includes(search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [filter, search]);

  return (
    <div className="dark bg-[#0b0d12] text-white">
      <main className="min-h-screen p-4 md:p-10 max-w-7xl mx-auto space-y-10">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center font-bold text-white italic text-xl shadow-lg shadow-rose-600/20">V</div>
            <span className="font-black uppercase tracking-[0.2em] text-sm italic">ValoCoach</span>
          </div>
        </div>

        {/* Stats Section */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileCard data={playerFileData} />
          </div>
          <div className="lg:col-span-2">
            <StatsGrid data={playerFileData} />
          </div>
        </section>

        {/* Map Analytics */}
        <section>
          <MapChart matches={playerFileData.matches} />
        </section>

        {/* Match History Section */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass-morphism p-5 rounded-2xl border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-rose-600 rounded-full"></div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Match History</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search Agent or Map..." 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-rose-500/50 transition-all placeholder:text-slate-600 text-white"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Bonus: Sliding Filter Animation */}
              <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 relative">
                {['All', 'Won', 'Lost'].map((type) => {
                  const isActive = filter === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`relative px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer z-10 ${
                        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span className="relative z-20">{type}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeFilter"
                          className="absolute inset-0 bg-rose-600 rounded-xl shadow-lg shadow-rose-600/30"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bonus: Staggered Match List Entry */}
          <motion.div 
            layout
            className="grid gap-4 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar scroll-smooth"
          >
            <AnimatePresence mode='popLayout'>
              {filteredMatches.length > 0 ? (
                filteredMatches.map((m: any, index: number) => (
                  <motion.div 
                    layout
                    key={m.match_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => setSelectedMatch(m)} 
                    className="cursor-pointer"
                  >
                    <MatchCard match={m} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 glass-morphism rounded-[2rem] border-2 border-dashed border-white/5"
                >
                  <p className="text-slate-600 font-black uppercase italic tracking-widest text-xl">No Data Found</p>
                  <button 
                    onClick={() => {setFilter('All'); setSearch('')}} 
                    className="mt-4 text-rose-500 text-xs font-bold uppercase underline hover:text-rose-400"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedMatch && (
          <MatchDetailModal 
            match={selectedMatch} 
            onClose={() => setSelectedMatch(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}