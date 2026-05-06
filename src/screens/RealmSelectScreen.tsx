import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";

export function RealmSelectScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectFaction = useGameStore((s) => s.selectFaction);

  const handleSelect = (faction: "neon_knights" | "void_behemoths") => {
    selectFaction(faction);
    setScreen("battle");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0510] text-white p-4 font-sans overflow-hidden relative">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7000ff] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-[#00f3ff] rounded-full blur-[100px]"></div>
      </div>

      <h2 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8 uppercase tracking-tighter text-center z-10">
        Select Your Faction
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-1 bg-black/40 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl cursor-pointer hover:bg-white/5 transition-all flex flex-col items-center group relative overflow-hidden text-center"
          onClick={() => handleSelect("neon_knights")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f3ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="h-24 w-24 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/30 mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            <span className="text-3xl text-[#00f3ff]">⬡</span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tighter italic text-white mb-2">Neon Knights</h3>
          <p className="text-center text-white/50 text-sm mt-2 font-mono uppercase tracking-wider text-[10px]">
            Masters of precise reflection and rapid shard strikes.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-1 bg-black/40 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl cursor-pointer hover:bg-white/5 transition-all flex flex-col items-center group relative overflow-hidden text-center"
          onClick={() => handleSelect("void_behemoths")}
        >
           <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="h-24 w-24 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/30 mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.2)]">
            <span className="text-3xl text-[#ff00ff]">⬢</span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tighter italic text-white mb-2">Void Behemoths</h3>
          <p className="text-center text-white/50 text-sm mt-2 font-mono uppercase tracking-wider text-[10px]">
            Corruptors of space, unleashing heavy dimensional distortion.
          </p>
        </motion.div>
      </div>

      <Button variant="ghost" className="mt-12 z-10" onClick={() => setScreen("title")}>
        Back
      </Button>
    </div>
  );
}
