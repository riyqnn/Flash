"use client"

import { useState } from "react"
import { Search, Clock, X } from "lucide-react"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Recently from "./recently"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export function Hero() {
  const { isConnected } = useAccount()
  const [searchValue, setSearchValue] = useState("")
  const [history, setHistory] = useState([
    "0x3a40...46ab",
    "0x09fb...ef0b",
    "0xf65f...c631",
    "0x6440...1724",
    "0x11f3...c12b",
    "0x7512...81c1",
  ])

  const handleSearch = () => {
    if (searchValue.trim()) {
      // Add to history (avoid duplicates)
      if (!history.includes(searchValue.trim())) {
        setHistory([searchValue.trim(), ...history].slice(0, 10)) // Keep max 10 items
      }
      
      // Perform search action here
      console.log("Searching for:", searchValue)
      
      // Clear search input
      setSearchValue("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleHistoryClick = (item) => {
    setSearchValue(item)
    console.log("Selected from history:", item)
  }

  const removeHistoryItem = (itemToRemove, e) => {
    e.stopPropagation()
    setHistory(history.filter(item => item !== itemToRemove))
  }

  const clearHistory = () => setHistory([])

  // Sample data buat chart
  const txnData = [
    { name: "Mon", value: 250 },
    { name: "Tue", value: 310 },
    { name: "Wed", value: 280 },
    { name: "Thu", value: 400 },
    { name: "Fri", value: 360 },
    { name: "Sat", value: 450 },
    { name: "Sun", value: 390 },
  ]

  const stakeData = [
    { name: "Epoch 895", value: 5.8 },
    { name: "896", value: 6.1 },
    { name: "897", value: 6.2 },
    { name: "898", value: 6.4 },
    { name: "899", value: 6.5 },
    { name: "900", value: 6.6 },
    { name: "901", value: 6.86 },
  ]

  return (
    <section className="w-full bg-white border-b-4 border-black font-brutal py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* TITLE */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Explore <span className="bg-black text-white px-2 py-1 rounded-sm">Flow</span> Blockchain
          </h1>
          <p className="text-base md:text-lg font-semibold text-gray-700">
            Search by <span className="underline">Account</span>, <span className="underline">Transaction</span>,{" "}
            <span className="underline">Event</span>, or <span className="underline">Block</span>
          </p>
        </div>

        {/* SEARCH + HISTORY */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex border-4 border-black rounded-md shadow-[4px_4px_0_0_#000] bg-white overflow-hidden">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search anything (e.g. 0x123...abc)"
              className="flex-1 px-4 py-3 outline-none font-mono text-sm"
            />
            <button 
              onClick={handleSearch}
              className="px-4 border-l-4 border-black bg-black text-white font-black hover:bg-white hover:text-black transition"
            >
              <Search size={16} />
            </button>
          </div>

          {history.length > 0 && (
            <div className="border-2 border-black bg-gray-50 p-3 rounded-sm shadow-[3px_3px_0_0_#000]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 font-black text-sm uppercase">
                  <Clock size={14} /> History
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs font-bold hover:underline hover:text-red-600 flex items-center gap-1"
                >
                  <X size={12} /> Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleHistoryClick(item)}
                    className="relative group text-xs font-mono px-2 py-1 border-2 border-black bg-white rounded-sm shadow-[2px_2px_0_0_#000] cursor-pointer hover:bg-gray-100 transition"
                  >
                    {item}
                    <button
                      onClick={(e) => removeHistoryItem(item, e)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center hover:bg-red-600"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CHART STATS */}
        <div className="w-full pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* TXN CHART */}
            <div className="border-2 border-black rounded-sm p-4 shadow-[3px_3px_0_0_#000] bg-white hover:shadow-[5px_5px_0_0_#000] transition-shadow">
              <p className="text-xs font-bold uppercase text-gray-600 mb-1">Total Txn Block</p>
              <p className="text-3xl font-black mb-3">2.99B</p>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={txnData}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        border: "2px solid black",
                        borderRadius: "0",
                        background: "white",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar dataKey="value" fill="#000000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* STAKE CHART */}
            <div className="border-2 border-black rounded-sm p-4 shadow-[3px_3px_0_0_#000] bg-white hover:shadow-[5px_5px_0_0_#000] transition-shadow">
              <p className="text-xs font-bold uppercase text-gray-600 mb-1">Total Stake</p>
              <p className="text-3xl font-black mb-3">6.86B FLOW</p>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stakeData}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        border: "2px solid black",
                        borderRadius: "0",
                        background: "white",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#000"
                      strokeWidth={2}
                      dot={{ fill: "#000", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* EPOCH INFO */}
            <div className="border-2 border-black rounded-sm p-4 shadow-[3px_3px_0_0_#000] bg-white hover:shadow-[5px_5px_0_0_#000] transition-shadow flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-gray-600 mb-1">Current Epoch</p>
                <p className="text-3xl font-black mb-3">901</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Started at</p>
                  <p className="font-mono text-sm font-bold">Oct 28, 04:22</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Remaining</p>
                  <p className="font-mono text-sm font-bold">9h 6m</p>
                </div>
              </div>
            </div>

            {/* NETWORK STATUS */}
            <div className="border-2 border-black rounded-sm p-4 shadow-[3px_3px_0_0_#000] bg-white hover:shadow-[5px_5px_0_0_#000] transition-shadow flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-gray-600 mb-1">Network Status</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xl font-black">HEALTHY</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Block Height</p>
                  <p className="font-mono text-sm font-bold">87,542,319</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Avg Block Time</p>
                  <p className="font-mono text-sm font-bold">~2.5s</p>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="pt-10">
          <Recently />
        </div>
      </div>
    </section>
  )
}

export default Hero