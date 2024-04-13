let notificationSound: HTMLAudioElement

const notificationURL = 'http://198.211.116.132/assets/chat/audio/new-user-notification.mp3'

export const getNotificationSound = () => {
  if (!notificationSound) {
    notificationSound = new Audio(notificationURL)
  }
  return notificationSound
}