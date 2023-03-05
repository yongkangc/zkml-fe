import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import bananaGif from '@/public/banana-dance.gif'

import { useRouter } from 'next/router'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const navigateToUpload = () => {
    router.push('/upload')
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Have a logo at top right hand */}
        <div className="absolute inset-x-0 top-0">
          <p>Banana</p>
        </div>
        <div className="flex flex-row">
          <div>
            <Image
              src={bananaGif}
              alt="Banana Dance"
              width={500}
              height={500}
            />
          </div>

          <div>
            {/* Header  */}
            <div className="flex flex-col">
              <p>EXTEND YOUR SMART CONTRACTS</p>
              <p>
                Do more with your smart contracts with Zero Knowledge Machine
                Learning
              </p>
            </div>
          </div>
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={navigateToUpload}
        >
          Upload
        </button>
      </main>
    </>
  )
}
