import { NavigationItem } from '../models/navigation-item.model';

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: 'Accueil', fragment: 'home' },
  { label: 'À propos', fragment: 'about' },
  { label: 'Expériences', fragment: 'experience' },
  { label: 'Compétences', fragment: 'skills' },
  { label: 'Projets', fragment: 'projects' },
  { label: 'Loisirs', fragment: 'hobbies' },
  { label: 'Contact', fragment: 'contact' },
];
