import { useGameStore } from "./store/gameStore";
import { Web3Provider } from "./providers/Web3Provider";
import { TitleScreen } from "./screens/TitleScreen";
import { RealmSelectScreen } from "./screens/RealmSelectScreen";
import { BattleScreen } from "./screens/BattleScreen";
import { GameOverScreen } from "./screens/GameOverScreen";

function AppContent() {
  const screen = useGameStore((s) => s.screen);

  return (
    <>
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
