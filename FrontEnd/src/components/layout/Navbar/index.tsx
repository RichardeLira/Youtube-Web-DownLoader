import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="z-50 mx-auto flex h-20 w-full justify-center border-b-2 border-gray-700 bg-gray-900">
      <div className="flex h-full w-full max-w-[1440px] content-between items-center justify-between px-8 sm:px-16">
        <Link href="/" className="flex items-center text-xl">
          m2youtube
        </Link>
      </div>
    </header>
  )
}
