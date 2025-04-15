import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { register, login, AuthParams } from '../api/user'
import CustomButton from '../ui/CustomButton'

export type onAuthParam = {
  onAuth: (isAuthenticated: boolean) => void
}

const Login = ({ onAuth }: onAuthParam) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      const params: AuthParams = { email, password }
      isRegistering ? await register(params) : await login(params)
    } catch (e:any) {
      setError(e.message)
      return
    }

    onAuth(true)
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-[500px] max-w-full p-8 bg-white shadow-md max-h-[500px] overflow-auto">
        <h2 className="text-lg font-bold text-gray-900">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CustomButton
            type="submit"
            text={isRegistering ? 'Register' : 'Login'}
          />
        </form>
        <p className="text-center mt-6">
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-300"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
}

export default Login
