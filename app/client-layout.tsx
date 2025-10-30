"use client"

import React from "react"
import { WagmiProvider } from "wagmi"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia, polygon } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NetworkProvider } from "@/components/NetworkContext"
import "@rainbow-me/rainbowkit/styles.css"

// Konfigurasi wagmi + rainbowkit
const config = getDefaultConfig({
  appName: "Blockchain Landing",
  projectId: "YOUR_PROJECT_ID", // <- isi dengan ID dari walletconnect.com
  chains: [mainnet, sepolia, polygon],
})

const queryClient = new QueryClient()

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <NetworkProvider>
          {children}
              </NetworkProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
