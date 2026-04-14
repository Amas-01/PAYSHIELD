import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CofheProvider, createCofheConfig } from "@cofhe/react";
import { getChainById } from "@cofhe/sdk/chains";
import { arbitrumSepolia } from "viem/chains";
import { createConfig, http, usePublicClient, useWalletClient, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import App from "./App";
import { CHAIN_ID } from "./lib/config";
import "./styles.css";

const rpcUrl = import.meta.env.VITE_ARBITRUM_SEPOLIA_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc";

const wagmiConfig = createConfig({
  chains: [arbitrumSepolia],
  connectors: [injected()],
  transports: {
    [arbitrumSepolia.id]: http(rpcUrl),
  },
});

const queryClient = new QueryClient();
const cofheChain = getChainById(CHAIN_ID);

if (!cofheChain) {
  throw new Error("Missing CoFHE chain configuration for Arbitrum Sepolia");
}

const cofheConfig = createCofheConfig({
  environment: "react",
  supportedChains: [cofheChain],
});

function CofheBridge({ children }: { children: React.ReactNode }) {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return (
    <CofheProvider cofheClient={undefined} config={cofheConfig} walletClient={walletClient as any} publicClient={publicClient as any}>
      {children}
    </CofheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CofheBridge>
          <App />
        </CofheBridge>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
