import React, { useEffect, useRef } from "react";
import { useGameStore, Unit } from "@/store/gameStore";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Zustand actions (safe to use in effect hooks because they are stable)
  const addScore = useGameStore((s) => s.addScore);
  const damageBase = useGameStore((s) => s.damageBase);
  const addMana = useGameStore((s) => s.addMana);
  
  // We'll manage units locally in a ref for fast simulation, and sync loosely if needed
  const gameStateRef = useRef({
    units: [] as (Unit & { dx: number; dy: number; radius: number, color: string })[],
    lastTime: 0,
    manaAccumulator: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    
    // Resize handler
    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Main Game Loop
    const loop = (timestamp: number) => {
      const state = gameStateRef.current;
      const deltaTime = (timestamp - state.lastTime) / 1000; // seconds
      state.lastTime = timestamp;
      
      if (deltaTime > 0.1) {
        // Skip huge jumps (e.g. tab was inactive)
        animFrame = requestAnimationFrame(loop);
        return;
      }

      const CW = canvas.width;
      const CH = canvas.height;
      
      // Clear
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Trail effect
      ctx.fillRect(0, 0, CW, CH);
      
      // Draw mirror line
      ctx.beginPath();
      ctx.moveTo(0, CH / 2);
      ctx.lineTo(CW, CH / 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Logic & Draw Units
      for (let i = state.units.length - 1; i >= 0; i--) {
        const u = state.units[i];
        
        // Move
        // Player moves UP (dy < 0), Enemy moves DOWN (dy > 0)
        u.x += u.dx * deltaTime * CW;
        u.y += u.dy * deltaTime * CH;
        
        // Boundaries (Base hit)
        if (u.y < 0 && u.owner === "player") {
          damageBase(10, true);
          addScore(100);
          state.units.splice(i, 1);
          continue;
        } else if (u.y > 1 && u.owner === "enemy") {
          damageBase(10, false);
          state.units.splice(i, 1);
          continue;
        }

        // Draw
        ctx.beginPath();
        const pxX = u.x * CW;
        const pxY = u.y * CH;
        ctx.arc(pxX, pxY, u.radius, 0, Math.PI * 2);
        ctx.fillStyle = u.color;
        ctx.shadowColor = u.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Mana gen
      state.manaAccumulator += deltaTime;
      if (state.manaAccumulator > 1) {
        addMana(1);
        state.manaAccumulator = 0;
      }

      animFrame = requestAnimationFrame(loop);
    };
    
    animFrame = requestAnimationFrame((t) => {
      gameStateRef.current.lastTime = t;
      loop(t);
    });

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', updateSize);
    };
  }, [addScore, damageBase, addMana]);

  // Click to spawn
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    // Only allow spawning on player's side (bottom half)
    if (y < 0.5) return;

    // Check MANA
    const currentMana = useGameStore.getState().mana;
    if (currentMana < 10) return;
    
    useGameStore.getState().addMana(-10);

    const newUnit = {
      id: Math.random().toString(),
      type: "basic",
      x,
      y,
      owner: "player" as const,
      hp: 10,
      maxHp: 10,
      damage: 2,
      dx: 0,
      dy: -0.1, // Moving up 10% of screen per second
      radius: 8,
      color: "#00f3ff" // Cyan
    };
    
    const mirrorUnit = {
      ...newUnit,
      id: newUnit.id + "_mirror",
      y: 1 - y, // Symmetrical reflection across y=0.5
      owner: "enemy" as const,
      dy: 0.1, // Moving down
      color: "#ff00ff" // Magenta
    };

    gameStateRef.current.units.push(newUnit, mirrorUnit);
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block bg-black"
      onClick={handleCanvasClick}
    />
  );
}
