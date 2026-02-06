'use client'

import { useState, useEffect } from 'react'
import { getLatestBlocks, getNetworkStats, getCoinSupply, Block, NetworkStats } from './lib/api'
import { format } from 'date-fns'

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [stats, setStats] = useState<NetworkStats | null>(null)
  const [supply, setSupply] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [blocksData, statsData, supplyData] = await Promise.all([
        getLatestBlocks(10),
        getNetworkStats(),
        getCoinSupply()
      ])
      setBlocks(blocksData)
      setStats(statsData)
      setSupply(supplyData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Kaspa Block Explorer</h1>
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Kaspa Block Explorer</h1>
        
        {/* Network Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Block Count</h3>
              <p className="text-2xl font-bold">{stats.blockCount.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Difficulty</h3>
              <p className="text-2xl font-bold">{(stats.difficulty / 1e12).toFixed(2)}T</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">DAA Score</h3>
              <p className="text-2xl font-bold">{stats.virtualDaaScore.toLocaleString()}</p>
            </div>
            {supply && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Circulating Supply</h3>
                <p className="text-2xl font-bold">
                  {(supply.circulatingSupply / 1e8).toFixed(2)} KAS
                </p>
              </div>
            )}
          </div>
        )}

        {/* Latest Blocks */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Latest Blocks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Hash</th>
                  <th className="text-left py-2">Blue Score</th>
                  <th className="text-left py-2">DAA Score</th>
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Tx Count</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr key={block.hash} className="border-b">
                    <td className="py-2 font-mono text-sm">
                      {block.hash.slice(0, 16)}...
                    </td>
                    <td className="py-2">{block.blueScore.toLocaleString()}</td>
                    <td className="py-2">{block.daaScore.toLocaleString()}</td>
                    <td className="py-2">
                      {format(block.timestamp, 'yyyy-MM-dd HH:mm:ss')}
                    </td>
                    <td className="py-2">{block.txCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Search</h2>
          <p className="text-gray-600">
            Search functionality to be implemented. Supports:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Block hash</li>
            <li>Transaction ID</li>
            <li>Address</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
