import { useGameStore } from "@/store/gameStore";
import { Web3Login, SayGMButton } from "@/components/Web3Components";
import { Button } from "@/components/ui/Button";
import { useAccount } from "wagmi";
import { motion } from "motion/react";

export function TitleScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const { isConnected } = useAccount();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0510] text-white p-4 font-sans">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7000ff] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff00ff] rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#00f3ff] rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-md w-full gap-8 bg-black/40 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            MIRROR
            <br />
            WARS
          </h1>
          <p className="text-[#00f3ff] mt-2 font-mono text-[10px] tracking-widest uppercase">
            Symmetrical Cyber-Fantasy
          </p>
        </motion.div>

        <div className="w-full space-y-4 flex flex-col items-center">
          <Web3Login />

          <Button 
            size="lg" 
            variant="neon"
            disabled={!isConnected}
            className="w-full sm:w-80 mt-4 h-16 text-xl hover:scale-105 cursor-pointer relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            onClick={() => setScreen("realm_select")}
          >
            {isConnected ? "Enter the Realm" : "Connect to Play"}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>

          <div className="flex gap-4 w-full sm:w-80 opacity-50 pt-4">
             <Button variant="outline" className="flex-1 text-[10px] tracking-widest rounded-full" disabled>Armory</Button>
             <Button variant="outline" className="flex-1 text-[10px] tracking-widest rounded-full" disabled>Codex</Button>
          </div>
          
          <div className="w-full sm:w-80 text-white/40 text-center opacity-50 text-[10px] tracking-widest uppercase" >
             Daily Mirror Challenge (Locked)
          </div>
          
          <div className="mt-8">
            <SayGMButton />
          </div>
        </div>
      </div>
    </div>
  );
}
