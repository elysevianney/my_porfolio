import { TestBed } from '@angular/core/testing';

import { PROJECTS } from '../../data/projects.data';
import { Projects } from './projects';

describe('Projects', () => {
  it('should render all projects and their nested data', async () => {
    await TestBed.configureTestingModule({ imports: [Projects] }).compileComponents();
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const expectedLinkCount = PROJECTS.reduce(
      (total, project) => total + Number(Boolean(project.githubUrl)) + Number(Boolean(project.demoUrl)),
      0,
    );

    expect(element.querySelectorAll('article').length).toBe(PROJECTS.length);
    expect(element.querySelectorAll('article img').length).toBe(
      PROJECTS.filter((project) => project.image).length,
    );
    expect(element.querySelectorAll('[data-project-link]').length).toBe(expectedLinkCount);
    expect(element.textContent).toContain(PROJECTS[0].tools[0]);
    expect(element.textContent).toContain(PROJECTS[0].skills[0]);
  });
});
