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
  const navigateToMain = () => {
    router.push('/main')
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Have a logo at top right hand */}
        <div className="flex flex-row">
          <div>
            <Image
              src={bananaGif}
              alt="Banana Dance"
              width={500}
              height={500}
            />
          </div>

          <div class="flex w-2/3">
            <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 text-justify">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-3">
                Extend Your Smart Contracts with Zero Knowledge Machine Learning
                <br />
              </h2>
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl my-3">
                This is alpha software and will break, please be gentle
              </h3>
            </div>
          </div>
        </div>

        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-5 rounded"
          onClick={navigateToMain}
        >
          START
        </button>
      </main>
    </>
  )
}
