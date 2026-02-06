'use client'

import { useKaspaWallet } from './hooks/useKaspaWallet'

export default function Home() {
  const { address, balance, connected, loading, connect, disconnect } = useKaspaWallet()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Kaspa dApp Template</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
          
          {!connected ? (
            <button
              onClick={connect}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div>
              <p className="mb-2">
                <span className="font-semibold">Address:</span> {address}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Balance:</span>{' '}
                {balance ? `${Number(balance) / 100000000} KAS` : 'Loading...'}
              </p>
              <button
                onClick={disconnect}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Wallet connection via browser extension</li>
            <li>Balance fetching</li>
            <li>Transaction building (implement in hooks/useKaspaWallet.ts)</li>
            <li>KRC20 token support (implement as needed)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
