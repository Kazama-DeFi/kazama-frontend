export class CountdownTimer {
  private readonly countdownInterval: number;
  private readonly resetInterval: number;
  private countdown: number;
  private timer: NodeJS.Timeout | null;

  constructor() {
    this.countdownInterval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    this.resetInterval = this.countdownInterval;
    this.countdown = this.countdownInterval;
    this.timer = null;
  }

  start() {
    this.timer = setInterval(() => {
      this.countdown -= 1000;
      if (this.countdown <= 0) {
        this.reset();
      }
      this.displayCountdown();
    }, 1000);
  }

  displayCountdown() {
    const hours = Math.floor(this.countdown / 3600000);
    const minutes = Math.floor((this.countdown % 3600000) / 60000);
    const seconds = Math.floor((this.countdown % 60000) / 1000);
    console.log(`Countdown: ${hours}h ${minutes}m ${seconds}s`);
  }

  reset() {
    clearInterval(this.timer as NodeJS.Timeout);
    this.countdown = this.resetInterval;
    console.log("Countdown Reset!");
    this.start();
  }
}