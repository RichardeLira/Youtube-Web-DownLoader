'use client'

import SearchForm from '@/components/SearchForm'
import VideoMenu from '@/components/VideoMenu'
import { api } from '@/lib/axios'
import { useState } from 'react'

interface DownloadOptions {
  link: string
  Format: string
}

interface OptionsSchema {
  audioVideo: DownloadOptions[]
  onlyVideo: DownloadOptions[]
  onlyAudio: DownloadOptions[]
}

export default function Home() {
  const [videoMetadata, setVideoMetadata] = useState<null>(null)
  const [videoOptions, setVideoOptions] = useState<OptionsSchema | null>(null)

  const show = videoOptions !== null && videoMetadata !== null

  async function handleSearch(link: string) {
    setVideoOptions(null)
    setVideoMetadata(null)
    const metadataPromise = api.post('/metaData', { link })
    const optionsPromise = api.post('/formatsAvailable', { link })

    const [metadata, options] = await Promise.all([
      metadataPromise,
      optionsPromise,
    ])

    if (!metadata && !options) {
      return
    }

    console.log(metadata.data)
    console.log(options.data)

    setVideoMetadata(metadata.data)
    setVideoOptions(options.data)
  }

  return (
    <div className="flex h-screen flex-col items-center gap-4 p-4 sm:gap-8">
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-8 sm:mt-40 sm:gap-12">
        <h1 className="flex text-center text-xl font-bold sm:text-4xl md:text-5xl">
          Baixe seus vídeos gratuitamente
        </h1>

        <SearchForm onSearch={handleSearch} />
      </div>

      <VideoMenu
        show={show}
        optionsList={videoOptions}
        metadata={videoMetadata}
      />
    </div>
  )
}
