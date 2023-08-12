import convertTime from '@/utils/convertTime'
import Image from 'next/image'

interface VideoDetailsProps {
  title: string
  duration: string
  thumbnail: string
}

export default function VideoDetails({
  title,
  duration,
  thumbnail,
}: VideoDetailsProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-3 sm:flex-row">
      <div className="h-[68px] w-[120px] overflow-hidden rounded-lg bg-gray-700">
        <Image
          src={thumbnail}
          alt=""
          width={168}
          height={94}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <h3 className="max-w-[412px] px-2 text-center sm:pl-0 sm:pr-2 sm:text-start">
          {title}
        </h3>
        <p className="text-gray-200">Duração: {convertTime(+duration)}</p>
      </div>
    </div>
  )
}
