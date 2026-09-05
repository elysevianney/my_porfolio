import { Component } from '@angular/core';

import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';

@Component({
  selector: 'app-root',
  imports: [About, Experience, Header, Hero, Projects, Skills],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
