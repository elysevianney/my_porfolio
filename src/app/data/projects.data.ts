import { Project } from '../models/project.model';

const DEFAULT_PROJECT_IMAGE = '/images/project_default.png';

export const PROJECTS: readonly Project[] = [
  {
    title: 'Application mobile de recherche d’appartements',
    description:
      'Application mobile réalisée comme projet de fin d’études pour faciliter la recherche d’appartements à louer.',
    tools: ['Flutter', 'UML'],
    skills: ['Développement mobile', 'Analyse des besoins', 'Modélisation UML'],
    image: DEFAULT_PROJECT_IMAGE,
    featured: true,
  },
  {
    title: 'Application web Spring Boot et Angular',
    description:
      'Projet mené en équipe avec une organisation Scrum, une API REST Spring Boot et une interface Angular.',
    tools: ['Spring Boot', 'Angular', 'API REST', 'Scrum'],
    skills: ['Développement full stack', 'Conception d’API', 'Travail en équipe agile'],
    image: DEFAULT_PROJECT_IMAGE,
    featured: true,
  },
  {
    title: 'Suivi de bonnes affaires',
    description:
      'Application de suivi d’opportunités pour les secteurs de l’immobilier et de l’automobile.',
    tools: ['Python', 'Laravel'],
    skills: ['Développement web', 'Conception fonctionnelle', 'Développement back-end'],
    image: DEFAULT_PROJECT_IMAGE,
  },
  {
    title: 'Application web de visioconférence',
    description: 'Application permettant des échanges vidéo depuis une interface web.',
    tools: ['React'],
    skills: ['Développement front-end', 'Conception d’interfaces web'],
    image: DEFAULT_PROJECT_IMAGE,
  },
  {
    title: 'Plateforme de gestion de stock',
    description: 'Plateforme web conçue pour gérer et suivre les mouvements de stock.',
    tools: ['Laravel'],
    skills: ['Développement back-end', 'Modélisation de données', 'Conception d’application web'],
    image: DEFAULT_PROJECT_IMAGE,
  },
];
