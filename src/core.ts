import { exec } from 'child_process'
import { promisify } from 'util'
import { Format, VideoInfo } from './types'

let execAsync = promisify(exec)

export async function getVideoInfo(args: { url: string }): Promise<VideoInfo> {
  let result = await execAsync(
    `yt-dlp --dump-single-json --no-playlist --simulate ${s(args.url)}`,
  )
  let error = result.stderr.trim()
  if (error) {
    throw new Error(error)
  }
  let text = result.stdout.trim()
  if (!text) {
    throw new Error('No output')
  }
  let info = JSON.parse(text) as VideoInfo
  return info
}

export function selectFormat(args: {
  info: VideoInfo
  type: 'storyboard' | 'audio' | 'video'
  only?: 'video' | 'audio'
  /** file extension
   * - if providing a single value, it is treated as the only allowed extension
   * - if providing an array, the first matching extension is used
   */
  ext?: string | string[]
  /** video resolution, e.g. 640x480 px */
  resolution?: string | 'max' | 'min'
  /** audio sample rate, e.g. 44.1k Hz */
  asr?: number | 'max' | 'min'
}): Format | null {
  let formats = args.info.formats
  let { type, only, ext, resolution, asr } = args

  switch (type) {
    case 'storyboard':
      formats = formats.filter(
        format =>
          format.format_id.startsWith('sb') ||
          format.format_note === 'storyboard',
      )
      break
    case 'video':
      formats = formats.filter(format => format.vcodec !== 'none')
      break
    case 'audio':
      formats = formats.filter(format => format.acodec !== 'none')
      break
  }

  switch (only) {
    case 'video':
      formats = formats.filter(
        format => format.vcodec !== 'none' && format.acodec === 'none',
      )
      break
    case 'audio':
      formats = formats.filter(
        format => format.acodec !== 'none' && format.vcodec === 'none',
      )
      break
  }

  if (Array.isArray(ext)) {
    for (let _ext of ext) {
      let ext = _ext.toLowerCase()
      if (formats.some(format => format.ext.toLowerCase() === ext)) {
        formats = formats.filter(format => format.ext.toLowerCase() === ext)
        break
      }
    }
  } else if (ext) {
    ext = ext.toLowerCase()
    formats = formats.filter(format => format.ext.toLowerCase() === ext)
  }

  switch (resolution) {
    case 'max': {
      let max = Math.max(
        ...formats
          .filter(format => format.width && format.height)
          .map(format => format.width! * format.height!),
      )
      formats = formats.filter(format => format.width! * format.height! === max)
      break
    }
    case 'min': {
      let min = Math.min(
        ...formats
          .filter(format => format.width && format.height)
          .map(format => format.width! * format.height!),
      )
      formats = formats.filter(format => format.width! * format.height! === min)
      break
    }
    default: {
      if (resolution) {
        resolution = resolution.toLowerCase()
        formats = formats.filter(
          format => format.resolution.toLowerCase() === resolution,
        )
      }
    }
  }

  switch (asr) {
    case 'max': {
      let max = Math.max(
        ...formats.map(format => format.asr || Number.MIN_SAFE_INTEGER),
      )
      formats = formats.filter(format => format.asr === max)
      break
    }
    case 'min': {
      let min = Math.min(
        ...formats.map(format => format.asr || Number.MAX_SAFE_INTEGER),
      )
      formats = formats.filter(format => format.asr === min)
      break
    }
    default: {
      if (asr) {
        formats = formats.filter(format => format.asr === asr)
      }
    }
  }

  formats = formats.slice().sort((a, b) => {
    let a_size = a.filesize || a.filesize_approx || Number.MAX_SAFE_INTEGER
    let b_size = b.filesize || b.filesize_approx || Number.MAX_SAFE_INTEGER
    return a_size - b_size
  })

  return formats[0] || null
}

export async function downloadVideo(args: {
  url: string
  format_id: string
  directory: string
  signal?: AbortSignal
  killSignal?: NodeJS.Signals | number
  timeout?: number
}): Promise<VideoInfo> {
  let result = await execAsync(
    `yt-dlp --no-playlist --print-json -f ${s(args.format_id)} ${s(args.url)}`,
    {
      cwd: args.directory,
      signal: args.signal,
      killSignal: args.killSignal,
      timeout: args.timeout,
    },
  )
  let error = result.stderr.trim()
  if (error) {
    throw new Error(error)
  }
  let text = result.stdout.trim()
  if (!text) {
    throw new Error('No output')
  }
  let info = JSON.parse(text) as VideoInfo
  return info
}

function s(text: string): string {
  return JSON.stringify(text)
}
