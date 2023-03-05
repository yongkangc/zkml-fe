// This page is for uploading a ONNX file to the server
// Wallet connection is using https://wagmi.sh/

import Header from '@/components/Header'
import { Magic } from 'magic-sdk'
import { magic } from '@/lib/magic'

import styles from '@/styles/Home.module.css'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { use, useEffect } from 'react'

export default function Upload() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  useEffect(() => {
    try {
      const connectWallet = async () => {
        await magic.wallet.connectWithUI()
      }
      connectWallet()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const uploadONNXModel = () => {
    // Upload the ONNX model to the server
  }

  return (
    <>
      {/* Connect wallet component */}
      <Header isConnected={isConnected} />
      <main className={styles.main}>
        <div className="flex flex-row space-x-4">
          {/* Upload Box */}
          <div className="flex flex-col">
            {/* A box with another square button icon inside with a plus */}
            <div
              className="box-border border-2 border-black w-96 h-96 flex flex-col justify-center items-center"
              onClick={uploadONNXModel}
            >
              <p className="my-5">Upload your ONNX Model</p>
              <div className="box-border border-2 border-black w-32 h-32 flex flex-col justify-center items-center">
                <p className="text-6xl">+</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between mb-1">
              <span className="text-base font-large text-bold">
                45% complete ...
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              {/* Set this to dynamically load progress */}
              <div
                className="bg-yellow-600 h-2.5 rounded-full"
                style={{ width: '45%' }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
