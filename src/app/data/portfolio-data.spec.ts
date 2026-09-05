import { FORMSPREE_ENDPOINT } from './contact.config';
import { EXPERIENCES } from './experiences.data';
import { NAVIGATION_ITEMS } from './navigation.data';
import { PROJECTS } from './projects.data';
import { SKILL_CATEGORIES } from './skills.data';
import { SOCIAL_LINKS } from './social-links.data';

describe('Portfolio data', () => {
  it('should provide unique identifiers for tracked collections', () => {
    const uniqueCount = (values: readonly string[]): number => new Set(values).size;

    expect(uniqueCount(NAVIGATION_ITEMS.map((item) => item.fragment))).toBe(
      NAVIGATION_ITEMS.length,
    );
    expect(uniqueCount(EXPERIENCES.map((experience) => experience.company))).toBe(
      EXPERIENCES.length,
    );
    expect(uniqueCount(PROJECTS.map((project) => project.title))).toBe(PROJECTS.length);
    expect(uniqueCount(SKILL_CATEGORIES.map((category) => category.category))).toBe(
      SKILL_CATEGORIES.length,
    );
  });

  it('should provide complete content for every experience and project', () => {
    for (const experience of EXPERIENCES) {
      expect(experience.tasks.length).toBeGreaterThan(0);
      expect(experience.technologies.length).toBeGreaterThan(0);
    }

    for (const project of PROJECTS) {
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(project.tools.length).toBeGreaterThan(0);
      expect(project.skills.length).toBeGreaterThan(0);
      expect(project.image?.startsWith('/images/')).toBe(true);
    }
  });

  it('should only use secure external endpoints', () => {
    expect(FORMSPREE_ENDPOINT.startsWith('https://')).toBe(true);

    for (const link of SOCIAL_LINKS.filter((item) => item.external)) {
      expect(link.url.startsWith('https://')).toBe(true);
    }
  });
});
