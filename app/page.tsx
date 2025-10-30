"use client"

import { useAccount, useChainId } from "wagmi"
import { Header } from "../components/header"
import Hero from "../components/hero"

export default function Home() {
  const { isConnected } = useAccount()
  const chainId = useChainId()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
    </main>
  )
}
