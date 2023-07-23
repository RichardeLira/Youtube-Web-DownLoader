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
              <li key={option} className="flex">
                <Button>{option}</Button>
              </li>
            )
          })
        : options.map((option) => {
            return (
              <li key={option} className="flex">
                <Button>{option}</Button>
              </li>
            )
          })}
      {options.length > 4 && !showMore && (
        <li>
          <Button
            variant="secondary"
            className="text-[14px]"
            onClick={() => setShowMore(true)}
          >
            Mostrar mais
          </Button>
        </li>
      )}
    </ul>
  )
}
