import { Component } from '@angular/core';

import { About } from './components/about/about';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [About, Header, Hero],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
