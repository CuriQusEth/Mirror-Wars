import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";
import { useSendTransaction, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { generateOnchainTransactionProps } from "@/lib/erc8021";
import { useState } from "react";
import { motion } from "motion/react";

export function GameOverScreen() {
  const score = useGameStore((s) => s.score);
  const baseHp = useGameStore((s) => s.baseHp);
  const resetGame = useGameStore((s) => s.resetGame);
  const setScreen = useGameStore((s) => s.setScreen);
  const { address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: (txHash as `0x${string}`) || undefined,
  });

  const isVictory = baseHp > 0;

  const handleRecordOnchain = async () => {
    if (!address) return;
    setIsSubmitting(true);
    try {
      const txProps = generateOnchainTransactionProps("RECORD_SCORE", { score, victory: isVictory });
      // Self tx with 0 value to record the score via transaction data payload
      const hash = await sendTransactionAsync({
        to: address,
        value: 0n,
        data: ("0x" + Buffer.from(JSON.stringify(txProps)).toString("hex")) as `0x${string}`,
      });
      setTxHash(hash);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0510] text-white p-4 relative overflow-hidden font-sans">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] bg-[#ff00ff] rounded-full blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 flex flex-col items-center max-w-md w-full bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl text-center"
      >
        <h1 className={`text-5xl font-black uppercase tracking-tighter italic mb-2 ${isVictory ? 'text-[#00f3ff]' : 'text-[#ff00ff]'}`}>
          {isVictory ? "Realm Purified" : "Realm Shattered"}
        </h1>
        
        <p className="text-white/50 font-mono mb-8 uppercase tracking-widest text-sm">
          Final Score: <span className="text-white font-bold text-2xl ml-2">{score}</span>
        </p>

        {txHash ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center mb-6 w-full backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${isConfirmed ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
              <p className="text-emerald-400 font-bold text-sm">
                {isConfirmed 
                  ? "Confirmed on Base Denim Mainnet (200ms Block)!" 
                  : isConfirming 
                    ? "Inscribing on Base Denim (200ms blocks)..." 
                    : "Transaction Broadcast"}
              </p>
            </div>
            <a 
              href={`https://basescan.org/tx/${txHash}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-[10px] font-mono text-emerald-300 hover:text-emerald-200 underline break-all block"
            >
              {txHash}
            </a>
          </div>
        ) : (
          <Button 
            variant="neon" 
            size="lg" 
            className="w-full mb-6 relative overflow-hidden group border-0 text-xl shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            onClick={handleRecordOnchain}
            disabled={!address || isSubmitting}
          >
            {isSubmitting ? "Broadcasting..." : "Record On Base Denim Mainnet"}
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        )}

        <div className="flex gap-4 w-full">
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl"
            onClick={() => {
               resetGame();
               setScreen("title");
            }}
          >
            Nexus
          </Button>
          <Button 
            className="flex-1 bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-white border border-[#00f3ff]/50 rounded-xl shadow-none"
            onClick={() => {
               resetGame();
               setScreen("battle");
            }}
          >
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
