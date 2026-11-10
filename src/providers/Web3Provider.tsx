import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Base Denim Mainnet (activated Nov 5, 2026: 200ms canonical blocks replacing Flashblocks)
export const baseDenim = {
  ...base,
  name: "Base Mainnet (Denim)",
  blockTime: 200, // 200ms native canonical blocks
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: ["https://mainnet.base.org"],
    },
  },
} as const;

export const config = createConfig({
  chains: [baseDenim],
  transports: {
    [baseDenim.id]: http("https://mainnet.base.org", {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000,
      staleTime: 200, // 200ms block freshness
    },
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

