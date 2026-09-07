import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_CATEGORIES } from '../../data/skills.data';

import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly symbols = ['{ }', '</>', '[ ]', '▤', '✓', '⌘', '✎', '▤', '✓'];
  protected readonly skillCategories = SKILL_CATEGORIES;
}
