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
      className={`h-0 overflow-hidden overflow-y-auto rounded-lg bg-gray-800 pb-2 pt-8 text-xs opacity-0 transition-all duration-500 sm:px-4 sm:py-8 sm:text-sm md:p-8 ${
        show ? 'h-[400px] opacity-100' : ''
      }`}
    >
      <div className="flex h-full flex-col gap-10 overflow-hidden">
        <VideoDetails />

        <div className="flex justify-between gap-2 overflow-hidden sm:grid sm:grid-cols-11">
          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52 ">
            <h3>Vídeo original</h3>

            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.original} />
            </div>
          </div>

          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52">
            <h3>Apenas áudio</h3>
            <div className="w-full overflow-y-auto px-2 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500">
              <DownloadOptions options={optionsList.only_audio} />
            </div>
          </div>

          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <div className="h-full w-[2px] bg-gray-700"></div>
          </div>

          <div className="col-span-3 flex h-full w-full flex-col items-center gap-2 sm:h-52">
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
