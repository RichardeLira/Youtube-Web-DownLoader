'use client'

import SearchForm from '@/components/SearchForm'
import VideoMenu from '@/components/VideoMenu'
import { useState } from 'react'

export default function Home() {
  const [videoLink, setVideoLink] = useState<string | null>()

  function handleSearch(data: string) {
    setVideoLink(data)
  }

  return (
    <div className="flex h-screen flex-col items-center gap-12">
      <div className="mt-40 flex flex-col items-center justify-center gap-12">
        <h1 className="text-5xl font-bold">Baixe seus vídeos gratuitamente</h1>

        <SearchForm onSearch={handleSearch} />
      </div>

      {videoLink && <VideoMenu />}
    </div>
  )
}
