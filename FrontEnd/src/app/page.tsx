'use client'

import SearchForm from '@/components/SearchForm'
import VideoMenu from '@/components/VideoMenu'
import { useState } from 'react'

export default function Home() {
  const [hasVideoLink, setHasVideoLink] = useState<boolean>(false)
  const temp = {
    original: ['720.mp4', '480.mp4', '360.mp4', '240.mp4', '120.mp4'],
    only_audio: ['720.mp4', '480.mp4', '360.mp4', '240.mp4', '120.mp4'],
    only_video: ['720.mp4', '480.mp4', '360.mp4'],
  }

  function handleSearch(link: string) {
    setHasVideoLink(true)
    console.log(link)
  }

  return (
    <div className="flex h-screen flex-col items-center gap-8">
      <div className="mt-40 flex flex-col items-center justify-center gap-12">
        <h1 className="text-5xl font-bold">Baixe seus vídeos gratuitamente</h1>

        <SearchForm onSearch={handleSearch} />
      </div>

      <VideoMenu show={hasVideoLink} optionsList={temp} />
    </div>
  )
}
