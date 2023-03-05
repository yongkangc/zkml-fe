// This page is for uploading a ONNX file to the server
// Wallet connection is using https://wagmi.sh/

import Header from '@/components/Header'
import { useState } from 'react'

import styles from '@/styles/Home.module.css'
import bananaGif from '@/public/banana-dance.gif'
import axios from 'axios'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { use, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Upload() {
  const router = useRouter()
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const [time, setTime] = useState(0)

  // Set progress bar with 5 different stages
  const [progress, setProgress] = useState(0)
  const [selectedONNXFile, setSelectedONNXFile] = useState(null)
  const [selectedJSONFile, setSelectedJSONFile] = useState(null)

  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const navigateToRun = () => {
    router.push('/run')
  }

  const uploadInputAndModel = async (e) => {
    e.preventDefault()
    console.log('Uploading input and model')
    try {
      setIsUploading(true)
      // Upload the ONNX model to the server
      const ONNXModel = new FormData()
      ONNXModel.append('onnxmodel', selectedONNXFile)
      console.log(ONNXModel.get('onnxmodel'))

      setProgress(1)
      // Post the ONNX to the server
      const ONNXRes = await axios.post(
        'https://backend.gelk.in/upload/onnxmodel',
        ONNXModel,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      console.log(ONNXRes.data.file)
      localStorage.setItem('onnxmodel', ONNXRes.data.file)
      setProgress(2)

      // Upload the JSON file to the server
      const jsonData = new FormData()
      jsonData.append('inputdata', selectedJSONFile)
      console.log(jsonData.get('inputdata'))

      // Post the JSON to the server
      const jsonRes = await axios.post(
        'https://backend.gelk.in/upload/inputdata',
        jsonData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setProgress(3)

      console.log(jsonRes.data.file)
      localStorage.setItem('inputdata', jsonRes.data.file)

      setProgress(4)

      // Get the UUID of the uploaded ONNX model and JSON file
      const ONNXUUID = ONNXRes.data.file
      const JSONUUID = jsonRes.data.file

      console.log('Initalise with: ', JSONUUID, ONNXUUID)
      setProgress(5)
      setIsUploaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  const selectONNXFile = (event) => {
    // Allow user to select a ONNX file to upload
    console.log('Select File')
    setSelectedONNXFile(event.target.files[0])
  }

  const selectJsonFile = (event) => {
    // Allow user to select a JSON file to upload
    console.log('Select File')
    setSelectedJSONFile(event.target.files[0])
  }

  return (
    <>
      {/* Connect wallet component */}
      <Header isConnected={isConnected} />
      <main className={styles.main}>
        <div className="flex flex-row space-x-16">
          {/* Upload Box */}
          <div className="flex flex-col">
            <div className="text-lg font-bold">
              Upload ONNX Model and Model Inputs
            </div>
            <div className="box-border border-2 border-black w-96 h-96 flex flex-col justify-center items-center">
              <form>
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
                    {selectedONNXFile
                      ? selectedONNXFile.name
                      : 'Select a ONNX Model'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={selectONNXFile}
                  />
                </label>

                {/* Input to upload JSON File */}
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white my-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    {selectedJSONFile
                      ? selectedJSONFile.name
                      : 'Select a JSON input File'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={selectJsonFile}
                  />
                </label>

                {/* yellow button to submit file */}
                <div className="my-8 items-end justify-center">
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                    onClick={uploadInputAndModel}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
            <div className="w-96 my-6">
              Upload your AI model and Input Data to run ZKML on the blockchain
            </div>
          </div>

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

          {/* Upload Complete */}
          {isUploaded && (
            <div className="flex flex-col">
              <p>Upload Completed</p>
              <div className="box-border border-2 border-black w-96 h-96 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <p>Upload Completed</p>
                  <p>Click the button below to run the model</p>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={navigateToRun}
                  >
                    Run Model
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
