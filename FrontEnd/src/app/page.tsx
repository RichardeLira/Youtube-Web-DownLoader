'use client'

import SearchForm from '@/components/SearchForm'
import VideoMenu from '@/components/VideoMenu'
import { useState } from 'react'

export default function Home() {
  const [videoLink, setVideoLink] = useState<string | null>()
  const [hasVideoLink, setHasVideoLink] = useState<boolean>(false)

  function handleSearch(data: string) {
    setVideoLink(data)
    setHasVideoLink(true)
  }

  return (
    <div className="flex h-screen flex-col items-center gap-8">
      <div className="mt-40 flex flex-col items-center justify-center gap-12">
        <h1 className="text-5xl font-bold">Baixe seus vídeos gratuitamente</h1>

        <SearchForm onSearch={handleSearch} />
      </div>

      <VideoMenu show={hasVideoLink} />
    </div>
  )
}
