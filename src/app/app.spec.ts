import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NAVIGATION_ITEMS } from './data/navigation.data';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio owner name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Elysé Vianney Ahomagnon');
  });

  it('should provide a section for every navigation link', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    for (const item of NAVIGATION_ITEMS) {
      expect(element.querySelector(`#${item.fragment}`)).toBeTruthy();
      expect(element.querySelector(`a[href="#${item.fragment}"]`)).toBeTruthy();
    }
  });
});
