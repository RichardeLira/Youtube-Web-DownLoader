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
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-50`}>
        <main className="flex min-h-screen items-center justify-center overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
