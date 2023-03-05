// This page is for uploading a ONNX file to the server
// Wallet connection is using https://wagmi.sh/

import Header from '@/components/Header'
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
  const [defaultInput, setDefaultInput] = useState('')
  const [defaultOnnx, setDefaultOnnx] = useState('')
  const [proofname, setProofname] = useState('')
  const [done, setDone] = useState(false)
  const [solCode, setSolCode] = useState('')

  useEffect(() => {
    const getInputs = async () => {
      await getJsonInputs()
      await getOnnxInputs()
      setDefaultInput(localStorage.getItem('inputdata'))
      setDefaultOnnx(localStorage.getItem('onnxmodel'))
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

  const runInitialize = async (JSONUUID, ONNXUUID) => {
    try {
      // Run Initialize
      console.log(JSONUUID)
      console.log(ONNXUUID)
      const initialize = await axios.post(
        'https://backend.gelk.in/run/initialize',
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
      console.log(initialize.data)
      let data = initialize.data
      setProofname(initialize.data.proof_name)
      alert(
        'Initialized! Please wait for the proofs to be generated this can take 3 mins or more depending on the size'
      )

      try {
        await axios.get('https://backend.gelk.in/run/gen_evm_proof')
      } catch (err) {
        console.log(err)
      }

      try {
        await axios.get('https://backend.gelk.in/run/gen_evm_verifier')
      } catch (err) {
        console.log(err)
      }

      alert('Done!')
      setDone(true)
      let solCode = await axios.get(
        'https://backend.gelk.in/download/generated/' +
          initialize.data.proof_name +
          '.sol'
      )
      console.log(solCode.data)
      setSolCode(solCode.data)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      {/* Connect wallet component */}
      <Header isConnected={isConnected} />
      <main className={styles.main}>
        <div className="flex flex-col">
          <div className={styles.card}>
            <h2>Input JSON</h2>
            <select className="px-20 py-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option key={defaultInput} value={defaultInput}>
                {defaultInput}
              </option>
              {inputJsonList.map((inputJson) => (
                <option key={inputJson} value={inputJson}>
                  {inputJson}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.card}>
            <h2>Input ONNX</h2>
            <select className="px-20 py-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option key={defaultOnnx} value={defaultOnnx}>
                {defaultOnnx}
              </option>
              {inputOnnxList.map((inputOnnx) => (
                <option key={inputOnnx} value={inputOnnx}>
                  {inputOnnx}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.card}>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 rounded shadow-lg"
              // get the selected JSON and ONNX UUIDs and pass it to runInitialise
              onClick={() => {
                runInitialize(
                  document.querySelector('select').value,
                  document.querySelectorAll('select')[1].value
                )
              }}
            >
              Run
            </button>
          </div>
          {done && (
            <>
              <div className={styles.card}>
                <textarea rows={12} cols={80} value={solCode} />
              </div>
              <div className={styles.card}>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 rounded"
                  // get the selected JSON and ONNX UUIDs and pass it to runInitialise
                  onClick={() => {
                    navigator.clipboard.writeText(solCode)
                    alert('Copied!')
                  }}
                >
                  Copy
                </button>
              </div>
              <div className={styles.card}>
                <h2>Select Network to Deploy</h2>
                <select className="px-20 py-8">
                  <option key="mainnet" value={1}>
                    Eth Mainnet
                  </option>
                  <option key="goerli" value={5}>
                    Eth Goerli
                  </option>
                  <option key="mantle_test" value={5001}>
                    Mantle Testnet
                  </option>
                  <option key="mumbai" value={80001}>
                    Polygon Mumbai
                  </option>
                  <option key="metis" value={599}>
                    Metis
                  </option>
                </select>
              </div>
              <div className={styles.card}>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-10 rounded"
                  // get the selected JSON and ONNX UUIDs and pass it to runInitialise
                  onClick={() => {
                    alert('Deployment in progress')
                    // TODO
                    // axios.get("https://backend.gelk.in/deploy_verifier/5")
                  }}
                >
                  Deploy
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
