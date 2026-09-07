import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('backgroundVideo');
  private readonly destroyRef = inject(DestroyRef);
  private inView = false;

  constructor() {
    afterNextRender(() => {
      const video = this.video()?.nativeElement;
      if (!video) return;
      video.muted = true;
      const bounds = video.getBoundingClientRect();
      this.inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
      const visibility = () => this.updatePlayback();
      const observer =
        'IntersectionObserver' in window
          ? new IntersectionObserver(([entry]) => {
              this.inView = entry?.isIntersecting ?? false;
              this.updatePlayback();
            })
          : undefined;
      if (observer) {
        observer.observe(video);
      }
      // Retry when the media is ready or a gesture unlocks browser autoplay.
      video.addEventListener('canplay', visibility);
      document.addEventListener('pointerdown', visibility, { passive: true });
      document.addEventListener('keydown', visibility);
      window.addEventListener('pageshow', visibility);
      document.addEventListener('visibilitychange', visibility);
      this.updatePlayback();
      this.destroyRef.onDestroy(() => {
        observer?.disconnect();
        video.removeEventListener('canplay', visibility);
        document.removeEventListener('pointerdown', visibility);
        document.removeEventListener('keydown', visibility);
        window.removeEventListener('pageshow', visibility);
        document.removeEventListener('visibilitychange', visibility);
      });
    });
  }

  private updatePlayback(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;
    if (this.inView && !document.hidden) {
      video.muted = true;
      if (video.paused) {
        void video.play()?.catch(() => {
          // A later canplay, visibility change or user gesture retries playback.
        });
      }
    } else if (!video.paused) {
      video.pause();
    }
  }
}
