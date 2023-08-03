import Button from '@/components/Button'
import { useState } from 'react'

interface DownloadOptions {
  link: string
  Format: string
}

interface DownloadOptionsProps {
  options: DownloadOptions[]
}

export default function DownloadOptions({ options }: DownloadOptionsProps) {
  const [showMore, setShowMore] = useState<boolean>(false)

  function handleChoice(link: string) {
    const linkDownload = document.createElement('a')
    linkDownload.href = link

    document.body.appendChild(linkDownload)
    linkDownload.click()
    document.body.removeChild(linkDownload)
  }

  return (
    <ul className="flex w-full flex-col gap-2">
      {options.length > 4 && !showMore
        ? options.slice(0, 3).map((option) => {
            return (
              <li key={option.Format} className="flex whitespace-nowrap">
                <Button onClick={() => handleChoice(option.link)}>
                  {option.Format}
                </Button>
              </li>
            )
          })
        : options.map((option) => {
            return (
              <li key={option.Format} className="flex whitespace-nowrap">
                <Button onClick={() => handleChoice(option.link)}>
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
