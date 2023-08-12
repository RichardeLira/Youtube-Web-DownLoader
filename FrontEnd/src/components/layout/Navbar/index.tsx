import Image from 'next/image'
import Link from 'next/link'
import icon from '@/assets/icon.png'

export default function Navbar() {
  return (
    <header className="z-50 mx-auto flex h-20 w-full justify-center border-b-2 border-gray-700 bg-gray-900">
      <div className="flex h-full w-full max-w-[1440px] content-between items-center justify-between px-8 sm:px-16">
        <Link href="/" className="flex items-center gap-2 text-xl">
          <Image src={icon} alt="" width={32} height={32} />
          <h1>m2youtube</h1>
        </Link>
      </div>
    </header>
  )
}
