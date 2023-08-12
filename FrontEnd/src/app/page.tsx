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
  const [show, setShow] = useState<boolean>(false)

  async function handleSearch(link: string) {
    setVideoOptions(null)
    setVideoMetadata(null)
    setShow(false)

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
    setShow(true)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <section className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-900 px-4 py-6 sm:gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-8 sm:gap-12">
          <h1 className="flex text-center text-xl font-bold sm:text-4xl md:text-5xl">
            Baixe seus vídeos gratuitamente
          </h1>

          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="h-96 w-full max-w-[344px] sm:w-auto sm:max-w-none">
          <div
            className={`transition-all duration-1000 ${
              show
                ? 'h-full w-full opacity-100 transition-all duration-1000'
                : 'h-0 w-full opacity-0'
            }`}
          >
            <VideoMenu optionsList={videoOptions} metadata={videoMetadata} />
          </div>
        </div>
      </section>

      <div className="h-8 bg-gradient-to-b from-gray-900 to-gray-800" />
      <div className="flex justify-center bg-gray-800 pt-10">
        <section className="px-4 pb-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
              Melhor downloader de vídeos do Youtube 2023
            </h2>
            <p className="max-w-[700px] text-justify">
              O m2youtube é a melhor plataforma para download de vídeos do
              YouTube da atualidade. Baixe agora mesmo seus vídeos
              gratuitamente, em <strong>HD</strong> e <strong>Full HD</strong>,{' '}
              no formato <strong>mp4</strong>. Você pode baixar{' '}
              <strong>vídeos com áudio</strong>, <strong>apenas áudio</strong>{' '}
              ou <strong>apenas vídeo</strong>.
            </p>
          </div>
        </section>
      </div>

      {/* <section className="mb-10 px-20">
        <div>
          <p>
            Com a nossa ferramenta para baixar vídeos do YouTube, você pode
            selecionar e obter vídeos gratuitamente! Tenha acesso a vídeos de
            alta qualidade em formatos como MP4, MP3, SQ, HD, Full HD e outros.
            Nosso serviço funciona em computadores e dispositivos móveis,
            permitindo que você o utilize em qualquer lugar! O download de
            vídeos do YouTube nunca foi tão fácil! Não perca tempo. Basta
            instalar o nosso serviço em seus dispositivos e aproveitar o
            conteúdo gratuito! Quer saber mais? Abaixo, você encontrará nossas
            instruções detalhadas de download.
          </p>
        </div>
      </section>
      <section className="mb-10 px-20">
        <div>
          <p>
            Como baixar vídeos do YouTube em diferentes formatos Se você deseja
            baixar vídeos do YouTube em alta definição (HD), MP3 ou MP4, utilize
            o Televzr Downloader. O download de vídeos do YouTube também é
            possível com o Ummy. Basta clicar nos botões via abaixo do vídeo que
            deseja salvar. Após instalar o aplicativo de download do YouTube em
            seu computador, você verá o botão abaixo de cada vídeo. Este método
            funciona em todas as versões do Windows e Mac OS.
          </p>
        </div>
      </section> */}
    </div>
  )
}
