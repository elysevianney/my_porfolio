import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_CATEGORIES } from '../../data/skills.data';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly skillCategories = SKILL_CATEGORIES;
}
