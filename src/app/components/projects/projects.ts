import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { PROJECTS } from '../../data/projects.data';

import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-projects',
  imports: [Reveal],
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly filter = signal<'all' | 'web' | 'mobile'>('all');
  protected readonly filters = [
    { value: 'all', label: 'Tous les projets' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
  ] as const;
  protected readonly projects = computed(() =>
    PROJECTS.filter((project) => this.filter() === 'all' || project.platform === this.filter()),
  );
}
