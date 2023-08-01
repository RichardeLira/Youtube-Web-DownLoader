export default function convertTime(time: number): string {
  if (!time && time !== 0) {
    return ''
  }

  let ret

  if (time >= 3600) {
    ret = ['', '', '']

    const hours = ~~(time / 3600)
    const minutes = ~~((time % 3600) / 60)
    const seconds = ~~(time % 60)

    ret[0] = `${hours}`.padStart(2, '0')
    ret[1] = `${minutes}`.padStart(2, '0')
    ret[2] = `${seconds}`.padStart(2, '0')
  } else {
    ret = ['', '']

    const minutes = ~~((time % 3600) / 60)
    const seconds = ~~(time % 60)

    ret[0] = `${minutes}`.padStart(2, '0')
    ret[1] = `${seconds}`.padStart(2, '0')
  }

  return ret.join(':')
}
