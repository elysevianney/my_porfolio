import { TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  it('should provide a safe link to the PDF résumé', async () => {
    await TestBed.configureTestingModule({ imports: [About] }).compileComponents();
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[href$=".pdf"]') as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe('/documents/cv-vianney-ahomagnon-2.pdf');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });
});
