import { TestBed } from '@angular/core/testing';

import { NAVIGATION_ITEMS } from '../../data/navigation.data';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();
  });

  it('should render every navigation item on desktop', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll(
      'nav[aria-label="Navigation principale"] a',
    ) as NodeListOf<HTMLAnchorElement>;

    expect(links.length).toBe(NAVIGATION_ITEMS.length);
    expect(links[0].getAttribute('href')).toBe('#home');
  });

  it('should open and close the mobile menu', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button[aria-controls="mobile-navigation"]',
    ) as HTMLButtonElement;

    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeTruthy();

    const firstMobileLink = fixture.nativeElement.querySelector(
      '#mobile-navigation a',
    ) as HTMLAnchorElement;
    firstMobileLink.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeNull();
  });
});
