import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FORMSPREE_ENDPOINT } from '../data/contact.config';
import { ContactFormPayload } from '../models/contact-form.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactFormPayload): Observable<unknown> {
    return this.http.post(FORMSPREE_ENDPOINT, payload, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }
}
