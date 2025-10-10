import { createPublicClient, http, PublicClient, Abi, Chain } from 'viem'
import { sepolia } from 'viem/chains'

/**
 * Creates a Viem public client for the specified chain
 * @param chain - The blockchain network to connect to
 * @returns A configured PublicClient instance
 */
export const createClient = (chain: Chain = sepolia): PublicClient => {
  return createPublicClient({
    chain,
    transport: http(),
  })
}

/**
 * Reads data from a smart contract with retry logic
 * @param params - Contract read parameters including address, ABI, function name, and args
 * @param chain - The blockchain network to read from (defaults to Sepolia)
 * @param retries - Number of retry attempts remaining (defaults to 3)
 * @returns The contract read result
 * @throws Error when max retries are exceeded
 */
export async function readContract<T>(
  {
    address,
    abi,
    functionName,
    args = [],
  }: {
    address: `0x${string}`
    abi: Abi
    functionName: string
    args?: unknown[]
  },
  chain: Chain = sepolia,
  retries = 3
): Promise<T> {
  const client = createPublicClient({
    chain,
    transport: http(),
  })

  try {
    return (await client.readContract({
      address,
      abi,
      functionName,
      args,
    })) as T
  } catch (error) {
    // If we have retries left, wait and try again
    if (retries > 0) {
      // Exponential backoff: wait longer on each retry
      const delay = (4 - retries) * 1000 // 1s, 2s, 3s
      await new Promise((resolve) => setTimeout(resolve, delay))
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Contract read failed, retrying... (${retries} attempts remaining)`)
      }
      
      return readContract(
        {
          address,
          abi,
          functionName,
          args,
        },
        chain,
        retries - 1
      )
    }
    
    // Max retries exceeded, throw error
    throw new Error(
      `Failed to read contract after 3 attempts: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
