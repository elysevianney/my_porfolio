import { Experience } from '../models/experience.model';

export const EXPERIENCES: readonly Experience[] = [
  {
    period: 'Mai 2026 – Août 2026',
    company: 'Sopra Steria',
    role: 'Stagiaire',
    tasks: [
      'Maintenance et évolution d’API REST existantes avec Spring Boot.',
      'Écriture de tests unitaires.',
      'Documentation des conceptions techniques détaillées.',
      'Création et optimisation d’agents IA.',
    ],
    technologies: ['Spring Boot', 'API REST', 'JUnit', 'Agents IA', 'Documentation technique'],
  },
  {
    period: 'Avril 2025 – Juin 2025',
    company: 'HappyMeet',
    role: 'Stagiaire',
    tasks: [
      'Conception d’une application de suivi de bonnes affaires pour l’immobilier et les véhicules avec Python et Laravel.',
      'Conception d’une application web de visioconférence avec React.',
    ],
    technologies: ['Python', 'Laravel', 'React', 'Bootstrap']
  },
  {
    period: 'Janvier 2024 – Juillet 2024',
    company: 'Kadosh Business SARL',
    role: 'Développeur web Fullstack',
    tasks: [
      'Refonte d’un site e-commerce avec Angular et Laravel.',
      'Conception de sites e-commerce avec WordPress.',
      'Intégration de maquettes Figma avec Tailwind CSS.',
    ],
    technologies: ['Angular', 'Laravel', 'WordPress', 'Figma', 'Tailwind CSS'],
  },
  {
    period: 'Avril 2023 – Juillet 2023',
    company: 'Creative Bound',
    role: 'Stagiaire',
    tasks: [
      'Conception de sites vitrines avec WordPress.',
      'Conception d’une plateforme de gestion de stock avec Laravel.',
      'Développement d’API REST avec Django.',
    ],
    technologies: ['WordPress', 'Laravel', 'Django', 'API REST'],
  },
];
