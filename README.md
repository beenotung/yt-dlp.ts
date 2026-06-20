# yt-dlp.ts

TypeScript wrapper around [yt-dlp](https://github.com/yt-dlp/yt-dlp) for fetching video metadata, selecting formats, and downloading videos.

[![npm Package Version](https://img.shields.io/npm/v/yt-dlp.ts)](https://www.npmjs.com/package/yt-dlp.ts)

## Features

- TypeScript support with typed `VideoInfo` and `Format` from yt-dlp JSON output
- Fetch video metadata without downloading (`getVideoInfo`)
- Select formats by type, file extension, resolution, and audio sample rate (`selectFormat`)
- Download videos to a directory (`downloadVideo`)

Requires [yt-dlp](https://github.com/yt-dlp/yt-dlp) to be installed and available on `PATH`.

## Installation

```bash
npm install yt-dlp.ts
```

You can also install `yt-dlp.ts` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { getVideoInfo, selectFormat, downloadVideo } from 'yt-dlp.ts'

let info = await getVideoInfo({
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
})

let format = selectFormat({
  info,
  type: 'video',
  resolution: 'max',
})

if (!format) {
  throw new Error('No matching format found')
}

let result = await downloadVideo({
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  format_id: format.format_id,
  directory: 'downloads',
})

console.log({ filename: result.filename })
```

## Typescript Signature

```typescript
export type VideoInfo = {
  id: string
  title: string
  formats: Format[]
  filename: string
  // ...and other fields from yt-dlp JSON output
}

export type Format = VideoInfo['formats'][number]

export function getVideoInfo(args: { url: string }): Promise<VideoInfo>

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
}): Format | null

export function downloadVideo(args: {
  url: string
  format_id: string
  directory: string
  signal?: AbortSignal
  killSignal?: NodeJS.Signals | number
  timeout?: number
}): Promise<VideoInfo>
```
