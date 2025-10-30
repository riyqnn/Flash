"use client"

import { useState } from "react"
import { ChevronDown, MoreHorizontal, Check, Copy, ExternalLink, LogOut } from "lucide-react"
import Image from "next/image"
import { useAccount, useDisconnect, useSwitchChain } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/navigation"
import { useNetwork } from "./NetworkContext" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export const flowEVM = {
  id: 747,
  name: "Flow EVM Mainnet",
  network: "flow-evm",
  rpcUrls: { default: { http: ["https://mainnet.evm.nodes.onflow.org"] } },
  blockExplorers: { default: { url: "https://evm.flowscan.io" } },
} as const

export const flowEVMTestnet = {
  id: 545,
  name: "Flow EVM Testnet",
  network: "flow-evm-testnet",
  rpcUrls: { default: { http: ["https://testnet.evm.nodes.onflow.org"] } },
  blockExplorers: { default: { url: "https://evm.testnet.flowscan.io" } },
} as const

export function Header() {
  const router = useRouter()
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { selectedGroup, setSelectedGroup } = useNetwork() // Use context instead of local state

  const flowNetworks = [
    { icon: "", name: "Flow Testnet", chainId: 545 },
    { icon: "", name: "Flow Mainnet", chainId: 747 },
  ]
  const evmNetworks = [
    { icon: "", name: "EVM on Flow Testnet", chainId: 545 },
    { icon: "", name: "EVM on Flow Mainnet", chainId: 747 },
  ]
  const networkGroups = [
    { id: "flow", name: "Flow" },
    { id: "evm", name: "EVM on Flow" },
  ]

  const rpcEndpoints = [
    { label: "EVM Mainnet RPC", url: "https://mainnet.evm.nodes.onflow.org" },
    { label: "EVM Testnet RPC", url: "https://testnet.evm.nodes.onflow.org" },
  ]

  const handleNetworkSwitch = (chainId: number) => switchChain?.({ chainId })
  const formatAddress = (addr: string | undefined) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "")
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1500)
  }

  const currentNetworks = selectedGroup === "flow" ? flowNetworks : evmNetworks
  const currentExplorer = selectedGroup === "flow" ? "https://flowscan.io" : "https://evm.flowscan.io"

  const goTo = (path: string) => {
    router.push(path)
  }

  return (
    <header className="w-full border-b-4 border-black bg-white font-brutal">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white">
              <Image src="/logo.png" alt="Logo" width={24} height={24} className="invert" />
            </div>
            <span className="text-xl font-black tracking-tight">FLASH</span>
          </div>

          <nav className="flex items-center space-x-4 text-sm font-bold">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition rounded-sm shadow-[3px_3px_0_0_#000] text-sm font-bold">
                  <span>BLOCKCHAIN</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-44 p-2 bg-white border-2 border-black shadow-[4px_4px_0_0_#000]">
                <DropdownMenuLabel className="font-black text-sm mb-1">Explore</DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => goTo("/blocks")}
                  className="p-2 text-sm font-bold cursor-pointer rounded-sm hover:bg-black hover:text-white"
                >
                  Blocks
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => goTo("/transactions")}
                  className="p-2 text-sm font-bold cursor-pointer rounded-sm hover:bg-black hover:text-white"
                >
                  Transactions
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => goTo("/events")}
                  className="p-2 text-sm font-bold cursor-pointer rounded-sm hover:bg-black hover:text-white"
                >
                  Events
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => goTo("/staking-rewards")}
                  className="p-2 text-sm font-bold cursor-pointer rounded-sm hover:bg-black hover:text-white"
                >
                  Staking Rewards
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="flex items-center space-x-1 px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition rounded-sm shadow-[3px_3px_0_0_#000] text-sm font-bold">VALIDATORS</button>
          </nav>
        </div>

        {/* RIGHT: Network selector, Wallet, More */}
        <div className="flex items-center space-x-2">
          {isConnected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 border-2 border-black px-3 py-1.5 text-sm bg-white hover:bg-black hover:text-white transition font-bold shadow-[3px_3px_0_0_#000]">
                  <span>{selectedGroup === "flow" ? "Flow" : "EVM on Flow"}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] font-bold">
                {networkGroups.map((group) => (
                  <DropdownMenuItem
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id as "flow" | "evm")}
                    className={`p-2 text-sm rounded-sm cursor-pointer ${
                      selectedGroup === group.id ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {group.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 border-2 border-black px-3 py-1.5 text-sm bg-white hover:bg-black hover:text-white transition font-mono shadow-[3px_3px_0_0_#000]">
                  <div className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold rounded-sm">
                    {address?.slice(2, 4).toUpperCase()}
                  </div>
                  <span>{formatAddress(address)}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] font-mono">
                <DropdownMenuLabel className="font-black text-sm mb-1">MY WALLET</DropdownMenuLabel>
                <p className="text-xs break-all mb-2 text-gray-600">{address}</p>
                <DropdownMenuSeparator className="border-t-2 border-black my-2" />
                <DropdownMenuItem
                  onClick={() => address && handleCopy(address, "address")}
                  className="flex items-center space-x-2 p-1 text-sm font-bold cursor-pointer hover:bg-black hover:text-white rounded-sm"
                >
                  <Copy size={14} />
                  <span>{copiedField === "address" ? "COPIED!" : "COPY ADDRESS"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="flex items-center space-x-2 p-1 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white rounded-sm"
                >
                  <LogOut size={14} />
                  <span>DISCONNECT</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="border-2 border-black bg-black text-white px-4 py-1.5 text-sm font-black hover:bg-white hover:text-black transition shadow-[3px_3px_0_0_#000]"
                >
                  CONNECT
                </button>
              )}
            </ConnectButton.Custom>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 bg-white border-2 border-black rounded-sm hover:bg-black hover:text-white transition shadow-[3px_3px_0_0_#000]">
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-3 bg-white border-2 border-black shadow-[5px_5px_0_0_#000] font-mono text-sm">
              <DropdownMenuLabel className="font-black text-base mb-2">
                {selectedGroup === "flow" ? "FLOW NETWORK" : "EVM ON FLOW"}
              </DropdownMenuLabel>

              {currentNetworks.map((net) => (
                <DropdownMenuItem
                  key={net.chainId}
                  onClick={() => handleNetworkSwitch(net.chainId)}
                  className="flex items-center justify-between p-2 font-bold cursor-pointer hover:bg-black hover:text-white rounded-sm"
                >
                  <span>{net.icon} {net.name}</span>
                  {chain?.id === net.chainId && <Check size={14} />}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="border-t-2 border-black my-3" />

              <div className="space-y-2">
                {rpcEndpoints.map((endpoint) => (
                  <div key={endpoint.label}>
                    <p className="text-xs font-bold mb-1">{endpoint.label}</p>
                    <div className="flex items-center border-2 border-black p-1 rounded-sm bg-gray-50 shadow-[2px_2px_0_0_#000]">
                      <input
                        type="text"
                        readOnly
                        value={endpoint.url}
                        className="bg-transparent outline-none flex-1 text-xs"
                      />
                      <button
                        onClick={() => handleCopy(endpoint.url, endpoint.label)}
                        className="ml-2 p-1 hover:bg-black hover:text-white rounded-sm"
                      >
                        {copiedField === endpoint.label ? (
                          <Check size={12} className="text-green-600" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={currentExplorer}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase hover:underline"
              >
                VIEW ON FLOWSCAN <ExternalLink size={12} />
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}