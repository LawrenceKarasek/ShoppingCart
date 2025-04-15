import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOriginalURL } from '../api/url'

const Redirect = () => {
  const [error, setError] = useState('')
  const { shortURL } = useParams()

  useEffect(() => {
    const getOriginal = async () => {
      try {
        if (shortURL && shortURL.length === 6) {
          const result = await getOriginalURL(shortURL)
          const { original } = result
          if (original) {
            window.location.replace(original)
          }
        }
      } catch (e:any) {
        setError(e.message)
        return
      }
    }
    getOriginal()
  }, [shortURL])

  return (
    <div className="flex flex-col">
      <div className="w-full p-[0.1rem] rounded-[2rem] flex flex-col items-center">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
    </div>
  )
}

export default Redirect
