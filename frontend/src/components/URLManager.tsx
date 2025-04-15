import { useEffect, useState } from 'react'
import URLList from './URLList'
import { checkAuth } from '../api/user'
import Login from './Login'
import TopNav from './TopNav'
import { AuthResult } from '../types/user'
import { logout } from '../api/user'

const URLManager = () => {
  const [error, setError] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const result: AuthResult = await checkAuth()
        const { authenticated } = result
        if (authenticated) {
          setAuthenticated(true)
        }
      } catch (e) {
        console.error(`checkAuthenticated error: ${JSON.stringify(e)}`)
        setError(`An error occurred checking authorization.`)
      }
    }
    checkAuthenticated()
  }, [])

  const handleLogout = async () => {
    try {
      const result = await logout()

      if (!result.error) {
        setAuthenticated(false)
      }
    } catch (e) {
      console.error(`handleLogout error: ${JSON.stringify(e)}`)
      const errorFriendly = `An error occurred logging out.`
      setError(errorFriendly)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="w-full p-[0.1rem] flex flex-col items-center">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!authenticated ? (
          <Login onAuth={setAuthenticated} />
        ) : (
          <>
            <TopNav authenticated logout={handleLogout} />
            <URLList authenticated />
          </>
        )}
      </div>
    </div>
  )
}

export default URLManager
