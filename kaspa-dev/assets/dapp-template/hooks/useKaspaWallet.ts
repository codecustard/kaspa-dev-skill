'use client'

import { useState, useEffect } from 'react'
import { RpcClient, NetworkType } from 'kaspa-wasm'

export function useKaspaWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<bigint | null>(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  const connect = async () => {
    setLoading(true)
    try {
      // Check if Kaspa wallet extension is available
      if (typeof window !== 'undefined' && (window as any).kaspa) {
        const kaspa = (window as any).kaspa
        const accounts = await kaspa.connect()
        setAddress(accounts[0])
        setConnected(true)
        
        // Fetch balance
        await fetchBalance(accounts[0])
      } else {
        alert('Please install Kaspa wallet extension')
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    if (typeof window !== 'undefined' && (window as any).kaspa) {
      await (window as any).kaspa.disconnect()
    }
    setAddress(null)
    setBalance(null)
    setConnected(false)
  }

  const fetchBalance = async (addr: string) => {
    try {
      const rpc = new RpcClient({
        url: 'wss://api.kaspa.org',
        network: NetworkType.Mainnet
      })
      await rpc.connect()
      
      const response = await rpc.getBalanceByAddress({ address: addr })
      setBalance(response.balance)
      
      await rpc.disconnect()
    } catch (error) {
      console.error('Balance fetch error:', error)
    }
  }

  const sendTransaction = async (recipient: string, amount: bigint) => {
    // Implementation for sending transactions
    // This would require the wallet to sign the transaction
    console.log('Sending', amount, 'to', recipient)
  }

  return {
    address,
    balance,
    connected,
    loading,
    connect,
    disconnect,
    sendTransaction,
    refreshBalance: () => address && fetchBalance(address)
  }
}
