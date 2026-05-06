import { create } from "zustand";

export type ScreenState = "title" | "realm_select" | "battle" | "game_over" | "leaderboard";
export type Faction = "neon_knights" | "void_behemoths";

export interface Unit {
  id: string;
  type: string;
  x: number;
  y: number;
  owner: "player" | "enemy";
  hp: number;
  maxHp: number;
  damage: number;
}

export interface GameState {
  screen: ScreenState;
  selectedFaction: Faction | null;
  walletAddress: string | null;
  mana: number;
  wave: number;
  score: number;
  mirrorIntegrity: number; // 0 to 100
  baseHp: number;
  enemyBaseHp: number;
  units: Unit[];
  
  // Actions
  setScreen: (screen: ScreenState) => void;
  setWalletAddress: (address: string | null) => void;
  selectFaction: (faction: Faction) => void;
  spawnUnit: (unitData: Omit<Unit, "id" | "owner">) => void;
  updateUnits: (updater: (units: Unit[]) => Unit[]) => void;
  damageMirror: (amount: number) => void;
  damageBase: (amount: number, isEnemy: boolean) => void;
  addScore: (points: number) => void;
  addMana: (amount: number) => void;
  resetGame: () => void;
}

const INITIAL_GAME_STATE = {
  mana: 10,
  wave: 1,
  score: 0,
  mirrorIntegrity: 100,
  baseHp: 100,
  enemyBaseHp: 100,
  units: [],
};

export const useGameStore = create<GameState>((set) => ({
  screen: "title",
  selectedFaction: null,
  walletAddress: null,
  
  ...INITIAL_GAME_STATE,

  setScreen: (screen) => set({ screen }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  selectFaction: (faction) => set({ selectedFaction: faction }),
  
  spawnUnit: (unitData) =>
    set((state) => {
      const id = Math.random().toString(36).substring(2, 9);
      const playerUnit: Unit = { ...unitData, id, owner: "player" };
      
      // Mirror counterpart (Assuming canvas height is handled elsewhere, we'll normalize y between 0 and 1, 0 being mirror, 1 being player baseline)
      // Actually, if we just mirror Y over a center line in the canvas component, we can store normalized coordinates.
      // Let's assume normalized coordinates (0 to 1 for both X and Y). Y=0.5 is mirror exact center.
      // Player puts unit at y=0.8 (bottom half). Clone goes to 1.0 - 0.8 = 0.2.
      const mirrorId = id + "_mirror";
      const enemyUnit: Unit = { ...unitData, id: mirrorId, owner: "enemy", y: 1 - unitData.y, x: unitData.x };
      
      return { units: [...state.units, playerUnit, enemyUnit], mana: state.mana - 2 }; // Assumed cost
    }),

  updateUnits: (updater) => set((state) => ({ units: updater(state.units) })),
  damageMirror: (amount) => set((state) => ({ mirrorIntegrity: Math.max(0, state.mirrorIntegrity - amount) })),
  damageBase: (amount, isEnemy) => set((state) => {
    if (isEnemy) {
      const newHp = Math.max(0, state.enemyBaseHp - amount);
      if (newHp === 0) return { enemyBaseHp: newHp, screen: "game_over" };
      return { enemyBaseHp: newHp };
    } else {
      const newHp = Math.max(0, state.baseHp - amount);
      if (newHp === 0) return { baseHp: newHp, screen: "game_over" };
      return { baseHp: newHp };
    }
  }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  addMana: (amount) => set((state) => ({ mana: Math.min(100, state.mana + amount) })),
  
  resetGame: () => set({ ...INITIAL_GAME_STATE }),
}));
