import { TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  it('should render the current year and a link to the top', async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain(new Date().getFullYear().toString());
    expect(element.querySelector('a')?.getAttribute('href')).toBe('#home');
  });
});
