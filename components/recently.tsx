"use client"

import { useEffect, useState } from "react"
import { Activity, Calendar, Hash, Wallet } from "lucide-react"
import { useNetwork } from "./NetworkContext" // Import context

export default function Recently() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedGroup } = useNetwork() // Get selected network from context

  const API_BASE = "https://api.find.xyz"
  const TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6ImstMjAyNC0xMC12MSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5maW5kbGFicy5pby8iLCJhdWQiOlsiaHR0cHM6Ly9mbG93c2Nhbi5pby8iXSwiZXhwIjoxNzYxNzQ3MzcxLCJuYmYiOjE3NjE3NDAxNzEsImlhdCI6MTc2MTc0MDE3MSwianRpIjoiYWQyYjY3ZmItYjRjNi00NmI0LTg0ZmUtYTRlZTBlZjhmZjFhIiwic2NvcGUiOiJmbG93L3YxIGF1dGgvdjEgbmZ0LzAgcHVibGljLzEgc2ltcGxlL3YxIHN0YWtpbmcvdjEgc3RhdHVzL3YxIHdhbGxldC92MSIsInRva2VuX3R5cGUiOiJCZWFyZXIifQ.WpvElVXEsLTYIiZfm8wMZu2M5htFfPKEbSjvczdK6b4"

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Pilih endpoint berdasarkan selectedGroup
        const endpoint = selectedGroup === "evm" 
          ? `${API_BASE}/flow/v1/evm/transaction?limit=20`
          : `${API_BASE}/flow/v1/transaction?limit=20`

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
        })

        if (!res.ok) throw new Error(`API Error ${res.status}`)
        const data = await res.json()

        if (Array.isArray(data?.data)) setTransactions(data.data)
        else setError("No transaction data found")
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [selectedGroup]) // Re-fetch ketika selectedGroup berubah

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 20)

  if (loading)
    return (
      <div className="p-10 text-center font-black text-lg border-4 border-black shadow-[6px_6px_0_0_#000] rounded-xl bg-white">
        Loading transactions...
      </div>
    )

  if (error)
    return (
      <div className="p-10 text-center font-black text-lg border-4 border-black shadow-[6px_6px_0_0_#000] rounded-xl bg-white text-red-600">
        Error: {error}
      </div>
    )

  return (
    <div className="w-full border-4 border-black bg-white rounded-xl shadow-[8px_8px_0_0_#000] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-3 text-black">
          <Activity className="w-7 h-7" />
          {selectedGroup === "evm" ? "EVM on Flow Transactions" : "Flow Transactions"}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000]">
        <table className="w-full border-collapse">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-black uppercase border-r border-white/30">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Timestamp
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-black uppercase border-r border-white/30">
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" /> Tx ID
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-black uppercase border-r border-white/30">
                <div className="flex items-center gap-1">
                  <Wallet className="w-4 h-4" /> Payer
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-black uppercase border-r border-white/30">
                Block
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-black uppercase">Status</th>
            </tr>
          </thead>

          <tbody>
            {displayedTransactions.map((tx: any, idx: number) => (
              <tr
                key={tx.id || idx}
                className={`border-t-2 border-black transition hover:bg-gray-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 text-xs md:text-sm font-semibold border-r border-black/20">
                  {tx.timestamp || "—"}
                </td>
                <td className="px-4 py-3 font-mono text-xs md:text-sm border-r border-black/20">
                  {tx.id ? tx.id.slice(0, 16) + "..." : "—"}
                </td>
                <td className="px-4 py-3 text-xs md:text-sm font-mono border-r border-black/20">
                  {tx.payer || tx.from || "—"}
                </td>
                <td className="px-4 py-3 text-xs md:text-sm font-semibold border-r border-black/20">
                  {tx.block_id ? tx.block_id.slice(0, 10) + "..." : tx.block_number || "—"}
                </td>
                <td className="px-4 py-3 text-xs md:text-sm font-black uppercase">
                  <span
                    className={`px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0_0_#000] ${
                      tx.status === "SEALED" || tx.status === "SUCCESS"
                        ? "bg-white text-black"
                        : tx.status === "PENDING"
                        ? "bg-gray-200 text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {tx.status || "Unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button */}
      {transactions.length > 20 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 border-4 border-black bg-white text-black font-black rounded-lg shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-all uppercase text-sm"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  )
}