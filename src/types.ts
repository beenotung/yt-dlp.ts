export type VideoInfo = {
  id: string
  title: string
  formats: Array<{
    format_id: string
    format_note?: string
    ext: string
    protocol: string
    acodec: string
    vcodec: string
    url: string
    width: null | number
    height: null | number
    fps: null | number
    rows?: number
    columns?: number
    fragments?: Array<{
      url: string
      duration: number
    }>
    audio_ext: string
    video_ext: string
    vbr: null | number
    abr: null | number
    tbr: null | number
    resolution: string
    aspect_ratio: null | number
    filesize_approx?: null | number
    http_headers: {
      'User-Agent': string
      'Accept': string
      'Accept-Language': string
      'Sec-Fetch-Mode': string
    }
    format: string
    asr?: null | number
    filesize?: null | number
    source_preference?: number
    audio_channels?: null | number
    quality?: number
    has_drm?: boolean
    language?: null
    language_preference?: number
    preference?: null
    dynamic_range?: null | string
    container?: string
    available_at?: number
    downloader_options?: {
      http_chunk_size: number
    }
    format_index?: null
    manifest_url?: string
  }>
  thumbnails: Array<{
    url: string
    preference: number
    id: string
    height?: number
    width?: number
    resolution?: string
  }>
  thumbnail: string
  description: string
  channel_id: string
  channel_url: string
  duration: number
  view_count: number
  average_rating: null
  age_limit: number
  webpage_url: string
  categories: Array<string>
  tags: Array<string>
  playable_in_embed: boolean
  live_status: string
  media_type: string
  release_timestamp: number
  _format_sort_fields: Array<string>
  automatic_captions: {}
  subtitles: {
    live_chat: Array<{
      url: string
      video_id: string
      ext: string
      protocol: string
    }>
  }
  comment_count: number
  chapters: null
  heatmap: null
  like_count: number
  channel: string
  channel_follower_count: number
  creators: null
  channel_is_verified: boolean
  uploader: string
  uploader_id: string
  uploader_url: string
  upload_date: string
  timestamp: number
  availability: string
  original_url: string
  webpage_url_basename: string
  webpage_url_domain: string
  extractor: string
  extractor_key: string
  playlist: null
  playlist_index: null
  display_id: string
  fulltitle: string
  duration_string: string
  release_date: string
  release_year: number
  is_live: boolean
  was_live: boolean
  requested_subtitles: null
  _has_drm: null
  epoch: number
  requested_downloads: Array<{
    requested_formats: Array<{
      asr: null | number
      filesize?: null | number
      format_id: string
      format_note: string
      source_preference: number
      fps: null | number
      audio_channels: null | number
      height: null | number
      quality: number
      has_drm: boolean
      tbr: number
      filesize_approx?: null | number
      width: null | number
      language: null
      language_preference: number
      preference: null
      ext: string
      vcodec: string
      acodec: string
      dynamic_range: null | string
      container: string
      url: string
      available_at: number
      downloader_options: {
        http_chunk_size: number
      }
      protocol: string
      video_ext: string
      audio_ext: string
      abr: number
      vbr: number
      resolution: string
      aspect_ratio: null | number
      http_headers: {
        'User-Agent': string
        'Accept': string
        'Accept-Language': string
        'Sec-Fetch-Mode': string
      }
      format: string
    }>
    format: string
    format_id: string
    ext: string
    protocol: string
    format_note: string
    filesize_approx?: null | number
    tbr: number
    width: null | number
    height: null | number
    resolution: string
    fps: null | number
    dynamic_range: string
    vcodec: string
    vbr: null | number
    aspect_ratio: null | number
    acodec: string
    abr: null | number
    asr: null | number
    audio_channels: null | number
    _filename: string
    filename: string
    __write_download_archive: boolean
  }>
  requested_formats: Array<{
    asr: null | number
    filesize?: null | number
    format_id: string
    format_note: string
    source_preference: number
    fps: null | number
    audio_channels: null | number
    height: null | number
    quality: number
    has_drm: boolean
    tbr: null | number
    filesize_approx?: null | number
    width: null | number
    language: null
    language_preference: number
    preference: null
    ext: string
    vcodec: string
    acodec: string
    dynamic_range: null | string
    container: string
    url: string
    available_at: number
    downloader_options: {
      http_chunk_size: number
    }
    protocol: string
    video_ext: string
    audio_ext: string
    abr: null | number
    vbr: null | number
    resolution: string
    aspect_ratio: null | number
    http_headers: {
      'User-Agent': string
      'Accept': string
      'Accept-Language': string
      'Sec-Fetch-Mode': string
    }
    format: string
  }>
  format: string
  format_id: string
  filename: string
  ext: string
  protocol: string
  language: null
  format_note: string
  filesize?: null | number
  filesize_approx?: null | number
  tbr: number
  width: null | number
  height: null | number
  resolution: string
  fps: null | number
  dynamic_range: string
  vcodec: string
  vbr: null | number
  stretched_ratio: null
  aspect_ratio: null | number
  acodec: string
  abr: null | number
  asr: null | number
  audio_channels: null | number
  _type: string
  _version: {
    version: string
    current_git_head: null
    release_git_head: string
    repository: string
  }
}

export type Format = VideoInfo['formats'][number]
export type RequestedFormat = VideoInfo['requested_formats'][number]
