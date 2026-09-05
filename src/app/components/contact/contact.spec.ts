import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FORMSPREE_ENDPOINT } from '../../data/contact.config';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('should not submit an invalid form', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    TestBed.inject(HttpTestingController).expectNone(FORMSPREE_ENDPOINT);
    expect(fixture.nativeElement.querySelector('#email-error')).toBeTruthy();
  });

  it('should send a valid form and display confirmation', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();

    const setValue = (selector: string, value: string): void => {
      const field = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };

    setValue('#contact-email', 'visiteur@example.com');
    setValue('#contact-subject', 'Proposition de collaboration');
    setValue('#contact-message', 'Bonjour, je souhaite échanger avec vous au sujet d’un projet.');
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    const request = TestBed.inject(HttpTestingController).expectOne(FORMSPREE_ENDPOINT);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.email).toBe('visiteur@example.com');
    request.flush({ ok: true });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain(
      'bien été envoyé',
    );
  });
});
