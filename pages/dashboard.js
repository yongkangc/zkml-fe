import { useContext } from 'react'
import { UserContext } from '@/lib/UserContext'

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext)

  const logout = () => {
    // We'll fill this out later
  }

  return (
    <>
      {/* We check here to make sure user exists before attempting to access its data */}
      {user?.issuer && (
        <>
          <h1>Dashboard</h1>
          <h2>Email</h2>
          <p>{user.email}</p>
          <h2>Wallet Address</h2>
          <p>{user.publicAddress}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </>
  )
}
