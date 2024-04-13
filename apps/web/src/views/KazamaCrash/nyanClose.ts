let crashMusic: HTMLAudioElement

const crashSoundURL = 'http://198.211.116.132/assets/chat/audio/x.mp3'

export const getCrashMusic = () => {
  if (!crashMusic) {
    crashMusic = new Audio(crashSoundURL)
  }
  return crashMusic
}
