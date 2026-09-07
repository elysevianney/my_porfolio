import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/** Progressive enhancement: content stays readable without JavaScript or observers. */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  readonly appReveal = input(0, { transform: (value: unknown) => numberAttribute(value, 0) });
  readonly revealMask = input(false);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const target = this.element.nativeElement;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motion.matches || !('IntersectionObserver' in window) || !target.animate) return;

      let animation: Animation | undefined;
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          if (!motion.matches) {
            animation = target.animate(
              [
                {
                  opacity: 0.2,
                  transform: 'translateY(22px)',
                  ...(this.revealMask() ? { clipPath: 'inset(0 0 12% 0 round 36px)' } : {}),
                },
                {
                  opacity: 1,
                  transform: 'translateY(0)',
                  ...(this.revealMask() ? { clipPath: 'inset(0 0 0 0 round 0px)' } : {}),
                },
              ],
              {
                duration: 650,
                delay: Math.min(this.appReveal(), 180),
                easing: 'cubic-bezier(.2,.65,.3,1)',
                fill: 'backwards',
              },
            );
          }
          observer.disconnect();
        },
        { threshold: 0.08 },
      );
      const stop = () => {
        if (motion.matches) animation?.cancel();
      };
      motion.addEventListener('change', stop);
      observer.observe(target);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        animation?.cancel();
        motion.removeEventListener('change', stop);
      });
    });
  }
}
