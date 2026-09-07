import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCES } from '../../data/experiences.data';

import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-experience',
  imports: [Reveal],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly experiences = EXPERIENCES;
}
