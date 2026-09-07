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
    items: ['SQL', 'MySQL', 'MongoDB', 'NoSQL', 'Postgres', 'Firebase'],
  },
  {
    category: 'Tests et conception',
    items: ['JUnit', 'PHPUnit', 'CI/CD'],
  },
  {
    category: 'Outils et méthodes',
    items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Scrum'],
  },
  {
    category: 'Design et modélisation',
    items: ['UML', 'Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
  },
  {
    category: 'Data Analysis',
    items: ['Power BI', 'Tableau', 'Excel', 'Python (pandas, numpy, matplotlib)'],
  },
  {
    category: 'Gestion de projet',
    items: ['Méthodes agiles', 'Trello' , 'Jira', 'Planification', 'Communication'],
  },
];
