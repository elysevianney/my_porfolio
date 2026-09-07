import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { NAVIGATION_ITEMS } from '../../data/navigation.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly activeSection = signal('home');
  protected readonly readingProgress = signal(0);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const sections = NAVIGATION_ITEMS.map((item) => document.getElementById(item.fragment));
      let frame = 0;
      const measure = () => {
        frame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        this.readingProgress.set(
          scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0,
        );
        let active = 'home';
        for (const section of sections) {
          if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35)
            active = section.id;
        }
        if (scrollable > 0 && window.scrollY >= scrollable - 4) active = 'contact';
        this.activeSection.set(active);
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(measure);
      };
      const desktop = window.matchMedia('(min-width: 768px)');
      const closeOnDesktop = () => {
        if (desktop.matches) this.closeMenu();
      };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      desktop.addEventListener('change', closeOnDesktop);
      measure();
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        desktop.removeEventListener('change', closeOnDesktop);
      });
    });
  }

  protected readonly navigationItems = NAVIGATION_ITEMS;
  protected readonly isMenuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected closeMenuOnEscape(): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.closeMenu();
    this.menuButton()?.nativeElement.focus();
  }
}
