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
  private playbackAllowed = false;
  private inView = false;

  constructor() {
    afterNextRender(() => {
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection;
      this.playbackAllowed = !motion.matches && !connection?.saveData;
      const updatePreference = () => {
        this.playbackAllowed = !motion.matches && !connection?.saveData;
        this.updatePlayback();
      };
      const visibility = () => this.updatePlayback();
      const observer =
        'IntersectionObserver' in window
          ? new IntersectionObserver(([entry]) => {
              this.inView = entry.isIntersecting;
              this.updatePlayback();
            })
          : undefined;
      if (observer) {
        observer.observe(this.video()!.nativeElement);
      } else {
        this.inView = true;
      }
      motion.addEventListener('change', updatePreference);
      document.addEventListener('visibilitychange', visibility);
      this.updatePlayback();
      this.destroyRef.onDestroy(() => {
        observer?.disconnect();
        motion.removeEventListener('change', updatePreference);
        document.removeEventListener('visibilitychange', visibility);
      });
    });
  }

  private updatePlayback(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;
    if (this.playbackAllowed && this.inView && !document.hidden) {
      if (!video.getAttribute('src')) video.src = '/videos/matiere-loop.mp4';
      video.muted = true;
      void video.play()?.catch(() => {
        // Keep the poster if the browser blocks automatic playback.
      });
    } else if (!video.paused) {
      video.pause();
    }
  }
}
