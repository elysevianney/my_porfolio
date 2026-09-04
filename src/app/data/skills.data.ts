import { SkillCategory } from '../models/skill.model';

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    category: 'Langages',
    items: ['Java', 'HTML', 'CSS', 'PHP', 'JavaScript', 'TypeScript', 'C++', 'Python'],
  },
  {
    category: 'Front-end et mobile',
    items: ['Angular', 'React', 'Vue.js', 'Flutter', 'Tailwind CSS', 'Bootstrap', 'JavaFX'],
  },
  {
    category: 'Back-end',
    items: ['Spring Boot', 'Laravel', 'Symfony', 'Django'],
  },
  {
    category: 'Données',
    items: ['SQL', 'MySQL', 'MongoDB', 'NoSQL'],
  },
  {
    category: 'Tests et conception',
    items: ['JUnit', 'PHPUnit', 'Tests unitaires', 'UML'],
  },
  {
    category: 'Outils et méthodes',
    items: ['Git', 'GitHub', 'GitLab', 'Docker', 'WordPress', 'Figma', 'Scrum'],
  },
];
