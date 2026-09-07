import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LOCATION, SOCIAL_LINKS } from '../../data/social-links.data';
import { ContactService } from '../../services/contact.service';

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Reveal],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly location = LOCATION;
  protected readonly submissionStatus = signal<SubmissionStatus>('idle');
  protected readonly contactForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    _gotcha: [''],
  });

  protected submit(): void {
    if (this.submissionStatus() === 'sending') {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submissionStatus.set('sending');
    this.contactService.send(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.contactForm.reset();
        this.submissionStatus.set('success');
      },
      error: () => this.submissionStatus.set('error'),
    });
  }
}
