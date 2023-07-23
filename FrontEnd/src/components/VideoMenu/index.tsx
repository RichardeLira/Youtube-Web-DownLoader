import DownloadOptions from './DownloadOptions'
import VideoDetails from './VideoDetails'

interface VideoMenuProps {
  show: boolean
  optionsList: {
    original: string[]
    only_audio: string[]
    only_video: string[]
  }
}

export default function VideoMenu({ show, optionsList }: VideoMenuProps) {
  return (
    <div
      className={`h-0 overflow-hidden rounded-lg bg-gray-800 p-8 opacity-0 transition-all duration-500 ${
        show ? 'h-[400px] opacity-100' : ''
      }`}
    >
      <div className="flex flex-col gap-10">
        <VideoDetails />

        <div className="relative grid flex-1 grid-cols-11 gap-2">
          <div className="col-span-3 flex h-[217px] w-full flex-col items-center gap-2">
            <h3>Vídeo original</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.original} />
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-[217px] w-full flex-col items-center gap-2">
            <h3>Apenas áudio</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.only_audio} />
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-[217px] w-full flex-col items-center gap-2">
            <h3>Apenas vídeo</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.only_video} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
