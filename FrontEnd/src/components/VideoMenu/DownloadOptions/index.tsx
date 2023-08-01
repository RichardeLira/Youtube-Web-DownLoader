import Button from '@/components/Button'
import { api } from '@/lib/axios'
import { useState } from 'react'

interface DownloadOptions {
  Itag: number
  Format: string
}

interface DownloadOptionsProps {
  options: DownloadOptions[]
  link: string
}

export default function DownloadOptions({
  options,
  link,
}: DownloadOptionsProps) {
  const [showMore, setShowMore] = useState<boolean>(false)

  async function handleChoise(tag: number) {
    console.log(tag)
    console.log(link)

    const response = await api.post('/ytDownload', {
      link,
      Itag: tag,
    })
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {options.length > 4 && !showMore
        ? options.slice(0, 3).map((option) => {
            return (
              <li key={option.Itag} className="flex whitespace-nowrap">
                <Button onClick={() => handleChoise(option.Itag)}>
                  {option.Format}
                </Button>
              </li>
            )
          })
        : options.map((option) => {
            return (
              <li key={option.Itag} className="flex whitespace-nowrap">
                <Button onClick={() => handleChoise(option.Itag)}>
                  {option.Format}
                </Button>
              </li>
            )
          })}
      {options.length > 4 && !showMore && (
        <li className="flex whitespace-nowrap">
          <Button variant="secondary" onClick={() => setShowMore(true)}>
            Mostrar mais
          </Button>
        </li>
      )}
    </ul>
  )
}
