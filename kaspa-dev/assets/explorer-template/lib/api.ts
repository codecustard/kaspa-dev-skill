import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_KASPA_API_URL || 'https://api.kaspa.org'
const API_KEY = process.env.NEXT_PUBLIC_KASPA_API_KEY

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': API_KEY ? `Bearer ${API_KEY}` : '',
    'Content-Type': 'application/json'
  }
})

export interface Block {
  hash: string
  version: number
  timestamp: number
  txCount: number
  blueScore: number
  daaScore: number
}

export interface Transaction {
  transactionId: string
  version: number
  inputs: any[]
  outputs: any[]
  blockTime: number
  isAccepted: boolean
}

export interface NetworkStats {
  blockCount: number
  headerCount: number
  difficulty: number
  pastMedianTime: number
  virtualDaaScore: number
}

export async function getLatestBlocks(limit: number = 10): Promise<Block[]> {
  const response = await apiClient.post('/api/v1/rpc/get-blocks', {
    lowHash: '0000000000000000000000000000000000000000000000000000000000000000',
    includeBlocks: true,
    includeTransactions: false
  })
  return response.data.blocks?.slice(0, limit) || []
}

export async function getBlockByHash(hash: string): Promise<Block | null> {
  try {
    const response = await apiClient.post('/api/v1/rpc/get-block', {
      hash,
      includeTransactions: true
    })
    return response.data.block
  } catch {
    return null
  }
}

export async function getTransaction(txId: string): Promise<Transaction | null> {
  try {
    const response = await apiClient.get(`/api/v1/transactions/${txId}`)
    return response.data
  } catch {
    return null
  }
}

export async function getAddressTransactions(address: string, limit: number = 10) {
  const response = await apiClient.get(`/api/v1/addresses/${address}/transactions`, {
    params: { limit }
  })
  return response.data
}

export async function getNetworkStats(): Promise<NetworkStats> {
  const response = await apiClient.post('/api/v1/rpc/get-block-dag-info', {})
  return response.data
}

export async function getCoinSupply() {
  const response = await apiClient.post('/api/v1/rpc/get-coin-supply', {})
  return response.data
}
