import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
