import { TestBed } from '@angular/core/testing';

import { EXPERIENCES } from '../../data/experiences.data';
import { Experience } from './experience';

describe('Experience', () => {
  it('should render every experience and its nested data', async () => {
    await TestBed.configureTestingModule({ imports: [Experience] }).compileComponents();
    const fixture = TestBed.createComponent(Experience);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('article').length).toBe(EXPERIENCES.length);
    expect(element.textContent).toContain(EXPERIENCES[0].tasks[0]);
    expect(element.textContent).toContain(EXPERIENCES[0].technologies[0]);
  });
});
