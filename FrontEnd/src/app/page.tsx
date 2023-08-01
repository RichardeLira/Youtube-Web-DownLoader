'use client'

import SearchForm from '@/components/SearchForm'
import VideoMenu from '@/components/VideoMenu'
import { api } from '@/lib/axios'
import { useState } from 'react'

export default function Home() {
  const [hasVideoLink, setHasVideoLink] = useState<boolean>(false)
  const temp = {
    original: ['720.mp4', '480.mp4', '360.mp4', '240.mp4', '120.mp4'],
    only_audio: ['720.mp4', '480.mp4', '360.mp4', '240.mp4', '120.mp4'],
    only_video: ['720.mp4', '480.mp4', '360.mp4'],
  }

  async function handleSearch(link: string) {
    const metadata = await api.post('/metaData', { link })

    const options = await api.post('/formatsAvailable', { link })

    console.log(metadata)
    console.log(options)

    // setHasVideoLink(true)
    // console.log(link)
  }

  return (
    <div className="flex h-screen flex-col items-center gap-4 p-4 sm:gap-8">
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-8 sm:mt-40 sm:gap-12">
        <h1 className="flex text-center text-xl font-bold sm:text-4xl md:text-5xl">
          Baixe seus vídeos gratuitamente
        </h1>

        <SearchForm onSearch={handleSearch} />
      </div>

      <VideoMenu show={hasVideoLink} optionsList={temp} />
    </div>
  )
}
