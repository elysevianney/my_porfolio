import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
