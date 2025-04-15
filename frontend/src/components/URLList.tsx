import { useEffect, useState } from 'react'
import URLType from '../types/url'
import { getURLs } from '../api/url'
import { useDebouncedCallback } from 'use-debounce'
import ShortURLModal from './ShortURLModal'
import editIcon from '../assets/edit.svg'
import { editShortURL } from '../api/url'
import CopyButton from '../ui/CopyButton'
import plusIcon from '../assets/icon-plus.svg'

export type authParam = {
  authenticated: boolean
}

const URLList = ({ authenticated }: authParam) => {
  const [urls, setURLs] = useState<URLType[] | null>(null)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [editId, setEditId] = useState<number>(0)
  const [editURL, setEditURL] = useState<URLType>({})
  const [error, setError] = useState<string | null>(null)
  let rootURL = window.location.origin

  const fetchURLs = async () => {
    try {
      const result = await getURLs()
      if (result) {
        setEditURL({})
        setEditId(0)
        setURLs(result)
      }
    } catch (e) {
      console.error('fetchURLs error: ' + e)
      setError('An error occurred getting the data.')
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchURLs()
    }
  }, [authenticated])

  const onCloseAdd = async () => {
    setIsAdd(false)
    fetchURLs()
  }

  const validateInput = (shortURL: string): boolean => {
    return /^[A-Za-z0-9]{6}$/.test(shortURL)
  }

  const handleShortURLChange = useDebouncedCallback(
    async (editURL: URLType) => {
      setError(null)
      try {
        if (editURL?.short) {
          const { short, id } = editURL
          if (validateInput(short) && id) {
            const result = await editShortURL(editURL)

            const { short, duplicateError } = result

            if (short) {
              await fetchURLs()
            } else if (duplicateError) {
              setError(duplicateError)
            }
          } else {
            setEditId(0)
            setError('The short URL must be 6 chars of letters and numbers.')
          }
        }
      } catch (e: any) {
        console.error('handleShortURLChange error: ' + e)
        setError(e.message);
    }
    },
    2000
  )

  useEffect(() => {
    if (editURL) handleShortURLChange(editURL)
  }, [editURL, handleShortURLChange])

  return (
    <div
      className="w-full flex flex-col overflow-y-auto"
      style={{ height: 'calc(100vh - 6rem)' }}
    >
      <div className="p-6 max-w-12xl mx-auto mt-10">
        {isAdd ? (
          <ShortURLModal isAdd={isAdd} onClose={onCloseAdd} />
        ) : (
          <>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-bold text-gray-900">URL Shortener</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 text-[#6355F0] bg-white border border-gray-500 hover:bg-[#f0f0f0] focus:outline-none focus:ring focus:ring-blue-300 font-bold rounded-md"
                onClick={() => setIsAdd(true)}
              >
                <img src={plusIcon} title="Add Short URL" className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-sm border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border">Original URL</th>
                    <th className="px-4 py-2 border">Short URL</th>
                    <th className="px-4 py-2 border">Hits</th>
                    <th className="px-4 py-2 border">Copy</th>
                  </tr>
                </thead>

                <tbody className="text-gray-1100">
                  {urls && urls.length > 0 ? (
                    urls.map(({ id, original, short, hits }: URLType) => (
                      <tr key={id} className="border hover:bg-gray-20">
                        <td className="px-4 py-3 max-w-[500px] flex items-center ">
                          <label className="break-all">{original}</label>
                        </td>
                        <td className="px-4 py-3 border min-w-[200px]">
                          {editId === id ? (
                            <div className="relative inline-block">
                              <input
                                type="string"
                                placeholder="Short URL"
                                onChange={(e) =>
                                  setEditURL({
                                    id: id,
                                    short: e.target.value,
                                  })
                                }
                                value={editURL.short}
                                autoFocus
                              />
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-500 text-base rounded-full hover:text-gray-800 hover:bg-black/10"
                                onClick={() => setEditId(0)}
                              >
                                x
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <label className="break-all truncate max-w-[calc(100%-32px)] flex-1">
                                {`${rootURL}/${short}`}
                              </label>
                              <button
                                type="button"
                                className="flex-shrink-0"
                                onClick={() => setEditId(Number(id))}
                              >
                                <img
                                  src={editIcon}
                                  title="Edit"
                                  className="w-6 h-6"
                                />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 border">{hits}</td>
                        <td className="px-4 py-3 border">
                          <CopyButton fullURL={`${rootURL}/${short}`} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-500 py-4"
                      >
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default URLList
