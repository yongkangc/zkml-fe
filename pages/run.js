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

import axios from 'axios'

export default function Run() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const [inputJsonList, setInputJsonList] = useState([])
  const [inputOnnxList, setInputOnnxList] = useState([])

  useEffect(() => {
    const getInputs = async () => {
      getJsonInputs()
      getOnnxInputs()
    }
    getInputs()
  }, [])

  const getJsonInputs = async () => {
    try {
      const jsonInputs = await axios.get(
        'https://backend.gelk.in/list/inputdata'
      )
      setInputJsonList(jsonInputs.data.list)
    } catch (error) {
      alert(error)
    }
  }

  const getOnnxInputs = async () => {
    try {
      const onnxInputs = await axios.get(
        'https://backend.gelk.in/list/onnxmodel'
      )
      console.log(onnxInputs.data.list)
      setInputOnnxList(onnxInputs.data.list)
    } catch (error) {
      alert(error)
    }
  }

  const runInitialise = async (JSONUUID, ONNXUUID) => {
    try {
      // Run Initialise
      const initialise = await axios.post(
        'https://backend.gelk.in/initialise',
        {
          inputdata: JSONUUID,
          onnxmodel: ONNXUUID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      console.log(initialise.data)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      {/* Connect wallet component */}
      <Header isConnected={isConnected} />
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Input JSON</h2>
            <select className="px-20 py-8">
              {/* console log jsonlist */}
              {console.log('JSON LIST', inputJsonList)}
              {inputJsonList.map((inputJson) => (
                <option key={inputJson} value={inputJson}>
                  {inputJson}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.card}>
            <h2>Input ONNX</h2>
            <select className="px-20 py-8">
              {inputOnnxList.map((inputOnnx) => (
                <option key={inputOnnx} value={inputOnnx}>
                  {inputOnnx}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.card}>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 rounded"
              // get the selected JSON and ONNX UUIDs and pass it to runInitialise
              onClick={() => {
                runInitialise(
                  document.querySelector('select').value,
                  document.querySelectorAll('select')[1].value
                )
              }}
            >
              Run
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
