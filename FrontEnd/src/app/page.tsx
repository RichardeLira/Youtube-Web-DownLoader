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
    <div className="flex w-full flex-col">
      <section className="flex w-full flex-col items-center justify-center gap-4 bg-gray-900 px-4 py-6 sm:gap-8">
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
      <div className="flex flex-col items-center pt-10">
        <section className="w-full max-w-[1440px] px-8 pb-10 sm:px-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
              Melhor downloader de vídeos do Youtube 2023
            </h2>
            <p className="text-justify">
              O m2youtube é a melhor plataforma para download de vídeos do
              YouTube da atualidade. Baixe agora mesmo seus vídeos
              gratuitamente, em <strong>HD</strong> e <strong>Full HD</strong>,{' '}
              no formato <strong>mp4</strong>. Você pode baixar{' '}
              <strong>vídeos com áudio</strong>, <strong>apenas áudio</strong>{' '}
              ou <strong>apenas vídeo</strong>.
            </p>
          </div>
        </section>

        <section className="w-full max-w-[1440px] px-16 pb-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
              Como baixar vídeos?
            </h2>
            <ul>
              <li>
                <strong>1º - </strong>Acesse algum vídeo do YouTube e copie o
                link.
              </li>
              <li>
                <strong>2º - </strong>Acesse <strong>m2youtube.com</strong>.
              </li>
              <li>
                <strong>3º - </strong>Cole o link na barra de busca e clique em
                buscar.
              </li>
              <li>
                <strong>4º - </strong>Escolha a opção e o download irá começar
                automaticamente.
              </li>
              <li className="pl-7">
                Obs: alguns formatos podem encaminhar para um player de vídeo
                direto, para baixar basta clicar nos três pontos no canto
                inferior direito do vídeo e clicar em{' '}
                <strong>&quot;Fazer o download&quot;</strong>.
              </li>
            </ul>
          </div>
        </section>

        <section className="w-full max-w-[1440px] px-16 pb-10">
          <div className="flex flex-col gap-2">
            <h2 className="w-full text-center text-lg font-bold sm:text-xl md:text-2xl">
              Perguntas frequentes
            </h2>
            <div>
              <div className="flex flex-col pb-4">
                <h3 className="text-base font-bold sm:text-lg md:text-xl">
                  Funciona para qualquer plataforma?
                </h3>
                <p className="text-justify">
                  Sim, nossa plataforma funciona para Windows, Linux, MacOS e
                  sistemas móveis Android e IOs.
                </p>
              </div>

              <div className="flex flex-col pb-4">
                <h3 className="text-base font-bold sm:text-lg md:text-xl">
                  Preciso pagar para baixar os vídeos?
                </h3>
                <p className="text-justify">
                  Não, a plataforma M2Youtube te permite baixar vídeos do
                  YouTube completamente de forma gratuita.
                </p>
              </div>

              <div className="flex flex-col pb-4">
                <h3 className="text-base font-bold sm:text-lg md:text-xl">
                  A plataforma é segura?
                </h3>
                <p className="text-justify">
                  Sim, a plataforma é completamente segura. Não armazenamos
                  qualquer tipo de informação do usuário de forma a garantir a
                  privacidade e a segurança. Além disso, regularmente
                  verificamos para que a plataforma esteja livre de vírus.
                </p>
              </div>

              <div className="flex flex-col pb-4">
                <h3 className="text-base font-bold sm:text-lg md:text-xl">
                  Cliquei na opção de download e furei redirecionado para um
                  player de vídeo, o que fazer?
                </h3>
                <p className="text-justify">
                  Não se preocupe, é muito comum em algumas das opções de
                  download você ser redirecionado para um player direto ao invés
                  de iniciar o download automaticamente. Neste caso, clique nos
                  três pontos no canto inferior direito do vídeo e, em seguida,
                  clique em &quot;Fazer Download&quot;.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
