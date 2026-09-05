import { TestBed } from '@angular/core/testing';

import { Hero } from './hero';

describe('Hero', () => {
  it('should render the profile image and calls to action', async () => {
    await TestBed.configureTestingModule({ imports: [Hero] }).compileComponents();
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('img')?.getAttribute('src')).toBe('/images/maphoto.jpg');
    expect(element.querySelector('img')?.getAttribute('alt')).toContain('Elysé Vianney Ahomagnon');
    expect(element.querySelector('a[href="#projects"]')).toBeTruthy();
    expect(element.querySelector('a[href="#contact"]')).toBeTruthy();
  });
});
