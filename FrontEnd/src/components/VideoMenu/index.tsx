import Button from '../Button'
import DownloadOptions from './DownloadOptions'
import VideoDetails from './VideoDetails'

interface VideoMenuProps {
  show: boolean
}

export default function VideoMenu({ show }: VideoMenuProps) {
  return (
    <div
      className={`h-0 overflow-hidden rounded-lg bg-gray-800 p-8 opacity-0 transition-all duration-500 ${
        show ? 'h-[400px] opacity-100' : ''
      }`}
    >
      <div className="flex flex-col gap-10">
        <VideoDetails />

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <h3>Vídeo original</h3>
            <DownloadOptions />
          </div>

          <div className="h-24 w-[2px] bg-gray-700"></div>

          <div className="flex flex-col items-center gap-2">
            <h3>Apenas áudio</h3>
            <DownloadOptions />
          </div>

          <div className="h-24 w-[2px] bg-gray-700"></div>

          <div className="flex flex-col items-center gap-2">
            <h3>Apenas vídeo</h3>
            <DownloadOptions />
          </div>
        </div>
      </div>
    </div>
  )
}
