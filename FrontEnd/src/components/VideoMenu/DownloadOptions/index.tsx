import Button from '@/components/Button'
import { useState } from 'react'

interface DownloadOptionsProps {
  options: string[]
}

export default function DownloadOptions({ options }: DownloadOptionsProps) {
  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <ul className="flex w-full flex-col gap-2">
      {options.length > 4 && !showMore
        ? options.slice(0, 3).map((option) => {
            return (
              <li key={option} className="flex whitespace-nowrap">
                <Button>{option}</Button>
              </li>
            )
          })
        : options.map((option) => {
            return (
              <li key={option} className="flex whitespace-nowrap">
                <Button>{option}</Button>
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
