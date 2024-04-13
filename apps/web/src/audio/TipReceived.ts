let tipReceivedSound: HTMLAudioElement

const soundURL = 'https://assets.kazama.io/audio/tip-received.mp3'

export const getTipReceivedSound = () => {
  if (!tipReceivedSound) {
    tipReceivedSound = new Audio(soundURL)
  }
  return tipReceivedSound
}