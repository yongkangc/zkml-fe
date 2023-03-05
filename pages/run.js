// This page is for uploading a ONNX file to the server
// Wallet connection is using https://wagmi.sh/

import Header from '@/components/Header'
import { Magic } from 'magic-sdk'
import { magic } from '@/lib/magic'
import { useState } from 'react'

import styles from '@/styles/Home.module.css'
import bananaGif from '@/public/banana-dance.gif'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { use, useEffect } from 'react'
import Image from 'next/image'

export default function Run() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const [time, setTime] = useState(0)

  // Set progress bar with 5 different stages
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)

  const [isUploading, setIsUploading] = useState(false)

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
    if (isUploading) {
      // after every 1 second, time increases by 1
      const timer = setInterval(() => {
        setTime(time + 1)
      }, 1000)

      // after every 45 seconds, progress bar increases by 1
      if (time != 0 && time % 16 === 0) {
        // check if progress is less than 5
        if (progress < 5) {
          setProgress(progress + 1)
        }
      }

      return () => {
        clearInterval(timer)
      }
    }
  }, [time])

  const uploadONNXModel = () => {
    // Upload the ONNX model to the server
    console.log('Upload ONNX Model')
    const formData = new FormData()
    formData.append('file', selectedFile)

    // Post the file to the server
    // setIsUploading(true)
  }

  const selectFile = (event) => {
    // Allow user to select a ONNX file to upload
    console.log('Select File')
    setSelectedFile(event.target.files[0])
  }

  return (
    <>
      {/* Connect wallet component */}
      <Header isConnected={isConnected} />
      <main className={styles.main}>
        <div className="flex flex-row space-x-16">
          {/* Upload Box */}
          <div className="flex flex-col">
            {/* A box with another square button icon inside with a plus to upload files*/}
            <div className="box-border border-2 border-black w-96 h-96 flex flex-col justify-center items-center">
              {/* <div className="flex flex-col justify-center items-center"> */}
              {/* </div> */}
              <form>
                <div className="flex flex-col w-full h-screen items-center justify-center bg-grey-lighter">
                  <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      {selectedFile ? selectedFile.name : 'Select a file'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={selectFile}
                    />
                  </label>
                  {/* yellow button to submit file */}
                  <div className="my-4">
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                      onClick={uploadONNXModel}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Banana Dance GIF */}
          {!isUploading && (
            <div className="flex flex-col">
              <Image
                src={bananaGif}
                alt="Banana Dance GIF"
                className="w-96 h-96"
              />
            </div>
          )}

          {/* Progress Bar */}
          {isUploading && (
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
          )}
        </div>
      </main>
    </>
  )
}
