import { Project } from '../models/project.model';

const DEFAULT_PROJECT_IMAGE = '/images/project_default.png';

export const PROJECTS: readonly Project[] = [

  {
    title: 'Campus Solidaire',
    platform: 'web',
    description:
      'Application web de mise en relation entre étudiants et associations pour faciiter la vie étudiante',
    tools: ['Spring Boot', 'Angular', 'API REST', 'Scrum'],
    skills: ['Développement full stack', 'Conception d’API', 'Travail en équipe agile'],
    image: '/images/projects/campus-solidaire.png',
    demoUrl: 'https://campus-solidaire.fr',
  },
  {
    title: 'CRUD Spring Boot',
    platform: 'web',
    description:
      'API REST développée avec Spring Boot pour gérer les opérations CRUD sur une base de données.',
    tools: ['Spring Boot', 'API REST'],
    skills: ['Développement back-end', 'Conception d’API'],
    image: '/images/projects/crud-spring-boot.png',
    githubUrl: 'https://github.com/elysevianney/first_spring_project'
  },
  {
    title: 'E-House',
    platform: 'mobile',
    description:
      'Application mobile réalisée comme projet de fin d’études pour faciliter la recherche d’appartements à louer.',
    tools: ['Flutter', 'UML'],
    skills: ['Développement mobile', 'Analyse des besoins', 'Modélisation UML'],
    image: '/images/projects/ehouse.png',
    githubUrl: 'https://github.com/elysevianney/Rent-hous-app'
  },
  
  {
    title: 'Jobyfy',
    platform: 'web',
    description:
      "Application web de recherche d'emplois",
    tools: ['Symfony', 'Scrum'],
    skills: ['Développement full stack', 'Travail en équipe agile'],
    image: '/images/projects/jobify.png',
    githubUrl: 'https://github.com/elysevianney/projet-pw',
  },
  {
    title: 'MultiModal AI',
    platform: 'web',
    description:
      'Application web de recherche d’images et de vidéos à partir de requêtes textuelles, utilisant des modèles d’intelligence artificielle multimodaux.',
    tools: ['React', 'FastAPI', 'Gemini API', 'Scrum'],
    skills: ['IA','Développement full stack', 'Conception d’API', 'Travail en équipe agile', 'UI/UX design'],
    image: '/images/projects/multimodal-ai.png',
    indev: true,
  },
  
  {
    title: 'ProxiShop',
    platform: 'mobile',
    description:
      'Application mobile de recherche de produits et de magasins à proximité, permettant aux utilisateurs de trouver rapidement ce dont ils ont besoin.',
    tools: ['Flutter', 'UML'],
    skills: ['Développement mobile', 'Analyse des besoins', 'Modélisation UML'],
    image: '/images/projects/proxy-shop.png',
    indev: true,
  },
];
