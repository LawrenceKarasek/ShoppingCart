import { useState } from 'react'
import briefcaseIcon from '../assets/icon-briefcase.svg'

export type CopyButtonProps = {
  fullURL: string
  displayText?: boolean
}

const CopyButton = ({ fullURL, displayText = false }: CopyButtonProps) => {
  const [showCopyPopup, setShowCopyPopup] = useState(false)

  const copyShortURL = () => {
    navigator.clipboard
      .writeText(fullURL)
      .then(() => {
        setShowCopyPopup(true)
        setTimeout(() => {
          setShowCopyPopup(false)
        }, 3000)
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err)
      })
  }

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 text-[#6355F0] bg-white border border-gray-500 hover:bg-[#f0f0f0] focus:outline-none focus:ring focus:ring-blue-300 font-bold rounded-md"
        onClick={copyShortURL}
      >
        <img
          src={briefcaseIcon}
          title="Copy to Clipboard"
          className="w-6 h-6 filter-[invert(24%) sepia(62%) saturate(749%) hue-rotate(200deg) brightness(95%) contrast(90%)]"
        />
        {displayText && 'Copy'}
      </button>
      <div>
        {showCopyPopup && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white italic px-4 py-2 rounded-md shadow-lg">
            The Short URL has been copied to the clipboard.
          </div>
        )}
      </div>
    </>
  )
}

export default CopyButton
