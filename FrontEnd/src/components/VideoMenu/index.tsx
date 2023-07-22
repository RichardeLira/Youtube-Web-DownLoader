import { Transition } from '@headlessui/react'

interface VideoMenuProps {
  show: boolean
}
export default function VideoMenu({ show }: VideoMenuProps) {
  return (
    <div
      className={`h-0 w-96 overflow-hidden rounded-lg bg-gray-800 transition-all duration-500 ${
        show ? 'h-[500px]' : ''
      }`}
    >
      Oi
    </div>
  )
}
