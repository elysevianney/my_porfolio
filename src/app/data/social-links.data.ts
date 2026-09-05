import { SocialLink } from '../models/social-link.model';

export const SOCIAL_LINKS: readonly SocialLink[] = [
  
  {
    label: 'GitHub',
    url: 'https://github.com/elysevianney',
    kind: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/elysé-vianney-ahomagnon-a4a98b228',
    kind: 'linkedin',
    external: true,
  },
  {
    label: 'M’écrire par e-mail',
    url: 'mailto:elyse-vianney.ahomagnon@etudiant.univ-rennes.fr',
    kind: 'email',
    external: false,
  }
];

export const LOCATION = 'Rennes, France';
