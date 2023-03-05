// This page is for uploading a ONNX file to the server
// Wallet connection is using https://wagmi.sh/

import Header from '@/components/Header'
import { Magic } from 'magic-sdk'
import { magic } from '@/lib/magic'
import { useState } from 'react'

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
  const [time, setTime] = useState(0)

  // Set progress bar with 5 different stages
  const [progress, setProgress] = useState(0)

  // Time counter for progress bar
  // after every 45 seconds, progress bar increases by 1

  useEffect(() => {
    setProgress(0)
    try {
      const connectWallet = async () => {
        await magic.wallet.connectWithUI()
      }
      connectWallet()
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    // after every 1 second, time increases by 1
    const timer = setInterval(() => {
      setTime(time + 1)
    }, 1000)

    // after every 45 seconds, progress bar increases by 1
    if (time != 0 && time % 27 === 0) {
      // check if progress is less than 5
      if (progress < 5) {
        setProgress(progress + 1)
      }
    }
    console.log(time, progress)

    return () => {
      clearInterval(timer)
    }
  }, [time])

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
                {20 * progress} % complete ...
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              {/* Set this to dynamically load progress */}
              <div
                className="bg-yellow-600 h-2.5 rounded-full"
                style={{ width: `${20 * progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
