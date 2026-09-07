import { Hobby } from '../models/hobby.model';

/** Images locales remplaçables ; format conseillé : 960 × 720 px (4:3). */
export const HOBBIES: readonly Hobby[] = [
  {
    id: 'lecture',
    title: 'Lecture',
    description: 'Découvrir d’autres univers, une page à la fois.',
    image: '/images/hobbies/lecture.svg',
    imageAlt: 'Illustration de livres et d’un marque-page bordeaux',
  },
  {
    id: 'basket',
    title: 'Basket',
    description: 'Le mouvement, le collectif et le plaisir du jeu.',
    image: '/images/hobbies/basket.svg',
    imageAlt: 'Illustration d’un ballon de basket sur un terrain rose poudré',
  },
  {
    id: 'football',
    title: 'Football',
    description: 'Partager l’énergie du terrain et l’esprit d’équipe.',
    image: '/images/hobbies/football.svg',
    imageAlt: 'Illustration d’un ballon de football aux motifs bordeaux',
  },
  {
    id: 'gaming',
    title: 'Gaming',
    description: 'Explorer, réfléchir et relever de nouveaux défis.',
    image: '/images/hobbies/gaming.svg',
    imageAlt: 'Illustration d’une manette de jeu bordeaux',
  },
  {
    id: 'piscine',
    title: 'Piscine',
    description: 'Une parenthèse dans l’eau pour changer de rythme.',
    image: '/images/hobbies/piscine.svg',
    imageAlt: 'Illustration d’une piscine avec des ondulations et une échelle',
  },
  {
    id: 'musculation',
    title: 'Musculation',
    description: 'La régularité et le plaisir de progresser.',
    image: '/images/hobbies/musculation.svg',
    imageAlt: 'Illustration d’un haltère bordeaux sur un fond rose',
  },
];
