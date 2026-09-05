import { TestBed } from '@angular/core/testing';

import { SKILL_CATEGORIES } from '../../data/skills.data';
import { Skills } from './skills';

describe('Skills', () => {
  it('should render all skill categories and skills', async () => {
    await TestBed.configureTestingModule({ imports: [Skills] }).compileComponents();
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const expectedSkillCount = SKILL_CATEGORIES.reduce(
      (total, category) => total + category.items.length,
      0,
    );

    expect(element.querySelectorAll('article').length).toBe(SKILL_CATEGORIES.length);
    expect(element.querySelectorAll('article li').length).toBe(expectedSkillCount);
  });
});
