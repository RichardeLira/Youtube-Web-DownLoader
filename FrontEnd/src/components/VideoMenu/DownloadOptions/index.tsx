import Button from '@/components/Button'
import { api } from '@/lib/axios'
import { useState } from 'react'
import FileSaver from 'file-saver'

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

    const response = await api.post(
      '/ytDownload',
      {
        link,
        Itag: tag,
      },
      {
        responseType: 'blob',
      },
    )

    const filename = response.headers['x-filename']
    const url = window.URL.createObjectURL(response.data)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    // const href = URL.createObjectURL(response.data)
    // const a = Object.assign(document.createElement('a'), {
    //   href,
    //   style: 'display:none',
    //   download: response.headers['x-filename'],
    // })
    // document.body.appendChild(a)

    // a.click()
    // URL.revokeObjectURL(href)
    // a.remove()
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
