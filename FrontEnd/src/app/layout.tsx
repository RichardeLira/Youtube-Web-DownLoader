import Navbar from '@/components/layout/Navbar'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import Footer from '@/components/layout/Footer'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Baixe seus vídeos gratuitamente - m2youtube',
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

        <Footer />
      </body>
    </html>
  )
}
