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
      (total, project) =>
        total + Number(Boolean(project.githubUrl)) + Number(Boolean(project.demoUrl)),
      0,
    );

    expect(element.querySelectorAll('article').length).toBe(PROJECTS.length);
    const images = element.querySelectorAll<HTMLImageElement>('article img');
    expect(images.length).toBe(PROJECTS.length);
    images.forEach((image, index) => {
      expect(image.getAttribute('src')).toBe(
        PROJECTS[index].image || '/images/project_default.png',
      );
    });
    expect(element.querySelectorAll('[data-project-link]').length).toBe(expectedLinkCount);
    expect(element.querySelectorAll('[data-github-icon]').length).toBe(
      PROJECTS.filter((project) => project.githubUrl).length,
    );
    expect(element.textContent).toContain(PROJECTS[0].tools[0]);
    expect(element.textContent).toContain(PROJECTS[0].skills[0]);
  });

  it('should filter projects by platform, announce the count and restore all projects', async () => {
    await TestBed.configureTestingModule({ imports: [Projects] }).compileComponents();
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll<HTMLButtonElement>('.project-filter button');

    for (const [index, platform] of [
      [2, 'mobile'],
      [1, 'web'],
    ] as const) {
      buttons[index].click();
      fixture.detectChanges();
      const expected = PROJECTS.filter((project) => project.platform === platform);
      expect(element.querySelectorAll('article').length).toBe(expected.length);
      expect(buttons[index].getAttribute('aria-pressed')).toBe('true');
      expect(element.querySelector('[role="status"]')?.textContent).toContain(
        String(expected.length),
      );
      for (const project of expected) expect(element.textContent).toContain(project.title);
      for (const project of PROJECTS.filter((project) => project.platform !== platform)) {
        expect(element.textContent).not.toContain(project.title);
      }
    }

    buttons[0].click();
    fixture.detectChanges();
    expect(element.querySelectorAll('article').length).toBe(PROJECTS.length);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
  });
});
