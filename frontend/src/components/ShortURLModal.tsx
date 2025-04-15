import { useState } from 'react'
import { addShortURL } from '../api/url'
import { URLType } from '../types/url'
import excludeIcon from '../assets/exclude.png'
import CustomButton from '../ui/CustomButton'
import CopyButton from '../ui/CopyButton'
import closeIcon from '../assets/icon-close.svg'

interface ShortURLModalProps {
  isAdd: boolean
  onClose: () => void
}

const ShortURLModal = ({ isAdd, onClose }: ShortURLModalProps) => {
  const [original, setOriginal] = useState('')
  const [shortened, setShortened] = useState('')
  const [error, setError] = useState<string>('')

  let rootURL = window.location.origin
  let fullURL = `${rootURL}/${shortened}`

  const isValidURL = (url: string): boolean => {
    try {
      const parsedURL = new URL(url)
      const hostname = parsedURL.hostname
      const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i
      return domainRegex.test(hostname)
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()

      if (!isValidURL(original)) {
        const message =
          'The URL you provided is an invalid format. Please try again.'
        setError(message)
        return
      }

      const url: URLType = { original: original }
      const result = await addShortURL(url)
      const { short } = result
      if (short) {
        setShortened(short)
      }
    } catch (e) {
      console.error('ShortURLModel handleSubmit error: ' + JSON.stringify(e))
      setError('An error occurred creating the Short URL.')
    }
  }

  if (!isAdd) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-300 min-h-[500px] min-w-[520px] relative">
        <div className="absolute top-0 left-0 right-0 px-4 py-3 bg-gray-100 border-b border-gray-300 flex justify-end items-end">
          <div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-[#6355F0] bg-white border border-gray-500 hover:bg-[#f0f0f0] focus:outline-none focus:ring focus:ring-blue-300 font-bold rounded-md"
              onClick={onClose}
            >
              <img src={closeIcon} title="Close" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-16 w-full">
          <div className="mb-6 w-full text-left flex items-center gap-2">
            <label className="text-sm font-bold text-gray-900">
              URL Shortener
            </label>
            <img src={excludeIcon} title="URL Shortener" className="w-6 h-6" />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-6 w-full text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Enter the URL to Shorten
            </label>
          </div>
          <div className="mb-6 w-full text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              URL
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter/paste your URL"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              required
              disabled={shortened.length > 0}
            />
          </div>
          <div className="w-full text-left">
            <CustomButton
              type="submit"
              text="Shorten"
              disabled={shortened.length > 0}
            />
          </div>

          {shortened && (
            <>
              <div className="mt-4 w-full text-left">
                <p className="font-bold text-green-700 italic">
                  Success! Here's your short URL!{' '}
                </p>
              </div>
              <div className="text-left mt-5 flex justify-start items-start">
                <div className="mt-3">
                  <label className="mt-5 text-blue-600 mr-5">{fullURL}</label>
                </div>
                <div>
                  <CopyButton fullURL={fullURL} displayText={true} />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ShortURLModal
