// Main Landing Page

import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import bananaGif from '@/public/banana-dance.gif'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const navigateToUpload = () => {
    router.push('/upload')
  }

  return (
    <>
      <main className={styles.main}>
        <div className="absolute inset-x-0 top-0">
          {/* Logo */}
          <p>Banana</p>
        </div>

        <div className="flex flex-row margin-auto">
          <div>
            <div className="flex flex-col margin-auto">
              <p>EXTEND YOUR SMART CONTRACTS</p>
              <p>
                Do more with your smart contracts with Zero Knowledge Machine
                Learning
              </p>
            </div>

            {/* Button to go to upload page */}
            <button
              class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={navigateToUpload}
            >
              Launch!
            </button>
          </div>

          <div>
            <Image
              src={bananaGif}
              alt="Banana Dance"
              width={500}
              height={500}
            />
          </div>
        </div>
      </main>
    </>
  )
}
