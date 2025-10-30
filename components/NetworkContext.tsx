"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type NetworkType = "flow" | "evm"

interface NetworkContextType {
  selectedGroup: NetworkType
  setSelectedGroup: (group: NetworkType) => void
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [selectedGroup, setSelectedGroup] = useState<NetworkType>("flow")

  return (
    <NetworkContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error("useNetwork must be used within NetworkProvider")
  }
  return context
}