import Image from "next/image";

export default function ProfileCard({ data }: { data: any }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 glass-morphism rounded-3xl relative overflow-hidden group transition-colors duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-rose-500/20 transition-all duration-700"></div>

      {/* Avatar Section */}
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-500/30 p-1 bg-white/50 dark:bg-transparent">
          <Image
            src={data.player_card_link}
            alt="Avatar"
            width={96}
            height={96}
            className="w-full h-full rounded-xl object-cover shadow-sm"
          />
        </div>
        {/* Level Badge */}
        <span className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded border border-slate-900 italic shadow-lg">
          LVL {data.player_account_level}
        </span>
      </div>

      {/* Identity Section */}
      <div className="text-center md:text-left z-10">
        <h1 className="text-4xl font-black tracking-tighter italic uppercase leading-none dark:text-white text-slate-900 transition-colors duration-500">
          {data.player_name.split("#")[0]} {/* */}
          <span className="text-rose-500 opacity-80 text-2xl ml-1">
            #{data.player_name.split("#")[1]}
          </span>{" "}
          {/* */}
        </h1>
        {/* Rank & Pulse Indicator */}
        <p className="font-medium mt-1 flex items-center justify-center md:justify-start gap-2 dark:text-slate-400 text-slate-500 transition-colors duration-500">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          {data.current_rank} {/* */}
        </p>
      </div>
    </div>
  );
}
