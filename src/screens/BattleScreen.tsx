import { useGameStore } from "@/store/gameStore";
import { GameCanvas } from "@/game/GameCanvas";
import { Button } from "@/components/ui/Button";

export function BattleScreen() {
  const mana = useGameStore((s) => s.mana);
  const score = useGameStore((s) => s.score);
  const baseHp = useGameStore((s) => s.baseHp);
  const enemyBaseHp = useGameStore((s) => s.enemyBaseHp);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0510] text-white font-sans touch-none flex flex-col">
      {/* Mesh Gradient Background (behind canvas) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7000ff] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff00ff] rounded-full blur-[120px]"></div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 p-4 sm:p-6 flex justify-between items-center bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00f3ff] to-[#ff00ff] rounded-lg rotate-45 flex items-center justify-center border border-white/30 truncate">
            <span className="-rotate-45 font-black text-lg sm:text-xl">M</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic">Mirror Wars</h1>
            <div className="flex items-center gap-2 text-[10px] text-[#00f3ff] font-mono tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse"></span>
              Base Mainnet Connected
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3 pointer-events-auto">
          {/* Enemy Base HP */}
          <div className="px-3 sm:px-4 py-1 sm:py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md flex flex-col items-center">
            <span className="text-[8px] sm:text-[9px] uppercase opacity-60 tracking-widest">Mirror Lord</span>
            <div className="w-16 sm:w-24 h-1.5 sm:h-2 mt-1 sm:mt-0 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-[#ff00ff] transition-all" style={{ width: `${enemyBaseHp}%` }}></div>
            </div>
          </div>
          
          <div className="px-3 sm:px-4 py-1 sm:py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md flex flex-col items-center">
            <span className="text-[8px] sm:text-[9px] uppercase opacity-60 tracking-widest">Score</span>
            <span className="text-sm font-bold text-[#00f3ff]">{score.toString().padStart(6, '0')}</span>
          </div>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
         <GameCanvas />
         
         {/* The Central Mirror Hint */}
         <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_0_10px_white] z-20 pointer-events-none flex items-center justify-center -translate-y-1/2">
             <div className="px-4 py-0.5 bg-black text-white text-[10px] font-mono tracking-widest border border-white/20 uppercase rounded-full opacity-50">VS</div>
         </div>
      </div>

      {/* Bottom Control Bar */}
      <footer className="relative z-20 p-4 sm:p-8 pt-0 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between shadow-2xl pointer-events-auto gap-4">
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div className="flex flex-col gap-1 min-w-max">
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Abilities</div>
              <div className="flex gap-2 sm:gap-3">
                 <button className="w-10 h-10 sm:w-14 sm:h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors" onClick={() => useGameStore.getState().addMana(-5)}>
                   <span className="text-lg">☄️</span><span className="text-[8px] font-mono text-white absolute bottom-0 truncate opacity-50 leading-tight pb-0.5">Swap</span>
                 </button>
                 <button className="w-10 h-10 sm:w-14 sm:h-14 bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-xl flex items-center justify-center relative hover:bg-[#00f3ff]/20 transition-colors" onClick={() => useGameStore.getState().damageMirror(20)}>
                   <span className="text-lg">⚡</span><span className="text-[8px] font-mono text-[#00f3ff] absolute bottom-0 truncate opacity-70 leading-tight pb-0.5 mt-2">Shatter</span>
                 </button>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 sm:px-12 w-full">
            <div className="flex justify-between mb-1 sm:mb-2 text-[10px] font-mono text-white/40 uppercase">
              <span>Energy ({mana})</span>
              <span>cost: 10</span>
            </div>
            <div className="h-2 sm:h-3 bg-white/10 rounded-full relative overflow-hidden flex gap-0.5">
               {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-full flex-1 transition-all ${i < Math.floor(mana/10) ? 'bg-gradient-to-t from-[#00f3ff] to-white/50' : 'bg-white/5'}`}
                  />
                ))}
            </div>
            <div className="mt-2 text-center text-[8px] sm:text-[10px] opacity-80 uppercase tracking-widest text-[#00f3ff]">Tap your side to deploy unit</div>
          </div>

          <div className="flex gap-4 items-center w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex flex-col items-end sm:text-right">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00f3ff]">Base HP</div>
              <div className="text-[10px] text-white/70 tracking-widest uppercase">Integrity</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center overflow-hidden bg-black/50">
               <div className="h-full bg-[#00f3ff] w-full mt-auto transition-all" style={{ height: `${baseHp}%` }}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
