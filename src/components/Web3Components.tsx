import { useAccount, useConnect, useDisconnect, useSendTransaction } from "wagmi";
import { generateOnchainTransactionProps } from "@/lib/erc8021";
import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";
import { Button } from "./ui/Button";

export function Web3Login() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const setWalletAddress = useGameStore((s) => s.setWalletAddress);

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [isConnected, address, setWalletAddress]);

  if (isConnected) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-[#00f3ff] text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse"></span>
          {address?.slice(0, 6)}...{address?.slice(-4)}
          <span className="ml-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Denim 200ms</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="w-full sm:w-80 h-14 bg-[#ff00ff]/20 hover:bg-[#ff00ff]/30 text-white border border-[#ff00ff]/50 shadow-[0_0_15px_rgba(255,0,255,0.3)] font-bold tracking-widest uppercase transition-all hover:scale-105 rounded-full"
        >
          Connect {connector.name}
        </Button>
      ))}
    </div>
  );
}

export function SayGMButton() {
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const handleSayGM = () => {
    if (!address) return;
    const txProps = generateOnchainTransactionProps("SAY_GM", { player: address });
    sendTransaction({
      to: address,
      value: 0n,
      data: "0x00"
    });
  };

  return (
    <Button 
      onClick={handleSayGM}
      className="bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-white border border-[#00f3ff]/50 shadow-[0_0_15px_rgba(0,243,255,0.3)] rounded-full px-6 py-2"
    >
      Say GM (On-chain)
    </Button>
  );
}
