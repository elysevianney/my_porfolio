import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCES } from '../../data/experiences.data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly experiences = EXPERIENCES;
}
