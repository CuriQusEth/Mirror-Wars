import { useGameStore } from "./store/gameStore";
import { Web3Provider } from "./providers/Web3Provider";
import { TitleScreen } from "./screens/TitleScreen";
import { RealmSelectScreen } from "./screens/RealmSelectScreen";
import { BattleScreen } from "./screens/BattleScreen";
import { GameOverScreen } from "./screens/GameOverScreen";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Sun } from "lucide-react";

function GMButton() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  if (!isConnected) return null;

  const sendGMTransaction = () => {
    sendTransaction({
      to: "0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3",
      value: parseEther("0"),
      data: "0x"
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun size={16} />
        Say GM
      </button>
    </div>
  );
}

function AppContent() {
  const screen = useGameStore((s) => s.screen);

  return (
    <>
      <GMButton />
      {screen === "title" && <TitleScreen />}
      {screen === "realm_select" && <RealmSelectScreen />}
      {screen === "battle" && <BattleScreen />}
      {screen === "game_over" && <GameOverScreen />}
    </>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}
