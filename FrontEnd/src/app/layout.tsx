import Navbar from '@/components/Navbar'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { ReactNode } from 'react'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Youtube Downloader',
  description: 'Baixe seus vídeos do YouTube gratuitamente.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} overflow-y-auto bg-gray-800 font-sans text-gray-50`}
      >
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <footer className="bottom-0 flex w-full items-center justify-center border-t-2 border-t-gray-700 bg-gray-900 py-10">
          © 2023 m2youtube
        </footer>
      </body>
    </html>
  )
}
