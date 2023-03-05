import { Magic } from 'magic-sdk'

const createMagic = (key) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  return typeof window !== 'undefined' && new Magic(key)
}

// Pass in your publishable key from your .env file
export const magic = createMagic('pk_live_A6D8857DE8AB2A69', {
  network: {
    // Mantle
    rpcUrl: 'https://rpc.testnet.mantle.xyz',
    chainId: 5001,
  },
})
