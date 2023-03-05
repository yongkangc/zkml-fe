import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/lib/UserContext'
import { useRouter } from 'next/router'
import { magic } from '@/lib/magic'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import bananaGif from '@/public/banana-dance.gif'

export default function Login() {
  const [user, setUser] = useContext(UserContext)
  const [email, setEmail] = useState('')
  // Create our router
  const router = useRouter()

  // Make sure to add useEffect to your imports at the top
  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    user?.issuer && router.push('/dashboard')
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()

    // Log in using our email with Magic and store the returned DID token in a variable
    try {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      })

      // Send this token to our validation endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      })

      // If successful, update our user state with their metadata and route to the dashboard
      if (res.ok) {
        const userMetadata = await magic.user.getMetadata()
        setUser(userMetadata)
        router.push('/dashboard')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* <Head>
        <title>Zero Knowledge Machine Learning</title>
        <meta name="description" content="Zero Knowledge Machine Learning" />
        <link rel="icon" href="/favicon.ico" />
        {inter}
      </Head> */}
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
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Magic Link</button>
        </form>
      </main>
    </>
  )
}
