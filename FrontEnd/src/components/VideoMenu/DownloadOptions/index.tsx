import Button from '@/components/Button'

export default function DownloadOptions() {
  return (
    <ul className="flex flex-col gap-2">
      <li className="flex">
        <Button>720.mp4</Button>
      </li>
      <li className="flex">
        <Button>480.mp4</Button>
      </li>
      <li className="flex">
        <Button>360.mp4</Button>
      </li>
      <li>
        <Button variant="secondary" className="text-[14px]">
          Mostrar mais
        </Button>
      </li>
    </ul>
  )
}
