import DownloadOptions from './DownloadOptions'
import VideoDetails from './VideoDetails'

interface DownloadOptions {
  link: string
  Format: string
}

interface Options {
  audioVideo: DownloadOptions[]
  onlyVideo: DownloadOptions[]
  onlyAudio: DownloadOptions[]
}

interface Metadata {
  title: string
  duration: string
  thumbnail: string
}

interface VideoMenuProps {
  show: boolean
  optionsList: Options | null
  metadata: Metadata | null
}

export default function VideoMenu({
  show,
  optionsList,
  metadata,
}: VideoMenuProps) {
  if (!optionsList || !metadata) {
    return null
  }

  return (
    <div
      className={`h-0 overflow-hidden overflow-y-auto rounded-lg bg-gray-800 pb-2 pt-8 text-xs opacity-0 transition-all duration-500 sm:px-4 sm:py-8 sm:text-sm md:p-8 ${
        show ? 'h-[400px] opacity-100' : ''
      }`}
    >
      <div className="flex h-full flex-col gap-10 overflow-hidden">
        <VideoDetails
          title={metadata.title}
          duration={metadata.duration}
          thumbnail={metadata.thumbnail}
        />

        <div className="flex justify-between gap-2 overflow-hidden sm:grid sm:grid-cols-11">
          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52 ">
            <h3>Vídeo original</h3>

            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.audioVideo} />
            </div>
          </div>

          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52">
            <h3 className="whitespace-nowrap">Apenas áudio</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.onlyAudio} />
            </div>
          </div>

          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52">
            <h3>Apenas vídeo</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.onlyVideo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
