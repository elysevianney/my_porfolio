import { Component } from '@angular/core';

import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Experience } from './components/experience/experience';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';

@Component({
  selector: 'app-root',
  imports: [About, Contact, Experience, Footer, Header, Hero, Projects, Skills],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
