import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly isPlaying = signal(false);
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('backgroundVideo');
  private readonly destroyRef = inject(DestroyRef);
  private wantsPlayback = false;
  private inView = true;

  constructor() {
    afterNextRender(() => {
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection;
      this.wantsPlayback = !motion.matches && !connection?.saveData;
      const updatePreference = () => {
        this.wantsPlayback = !motion.matches && !connection?.saveData;
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
      observer?.observe(this.video()!.nativeElement);
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

  protected toggleVideo(): void {
    this.wantsPlayback = !this.isPlaying();
    this.updatePlayback();
  }

  private updatePlayback(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;
    if (this.wantsPlayback && this.inView && !document.hidden) {
      if (!video.getAttribute('src')) video.src = '/videos/matiere-loop.mp4';
      video.muted = true;
      void video.play()?.catch(() => this.isPlaying.set(false));
    } else if (!video.paused) {
      video.pause();
    }
  }
}
