import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HOBBIES } from '../../data/hobbies.data';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-hobbies',
  imports: [Reveal],
  templateUrl: './hobbies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hobbies {
  protected readonly hobbies = HOBBIES;
}
