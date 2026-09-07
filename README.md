# Portfolio — Elysé Vianney Ahomagnon

Portfolio Angular 21 et Tailwind CSS 4, pré-rendu statiquement pour Vercel.

## Développement et validation

```sh
npm install
npm start
npm test -- --watch=false
npm run build
```

Le serveur de développement est accessible sur `http://localhost:4200`. Les fichiers de production sont générés dans `dist/my_portfolio/browser`.

## Direction Matière — branche `redesign2`

Cette version est construite depuis `develop`. Elle conserve la palette framboise, rose poudré, anthracite et blanc du portfolio de base.

- Une sculpture organique originale donne son identité à l’accueil, avec une vidéo locale en boucle.
- Navigation flottante, indication de section active et progression de lecture.
- Portrait organique, parcours en cartes, compétences regroupées et galerie de projets filtrable Web/Mobile.
- Illustrations conceptuelles des projets créées en HTML/CSS. Elles ne représentent pas des captures des applications. Une image réelle renseignée dans le dataset remplace automatiquement l’illustration.
- Apparitions uniques au défilement avec IntersectionObserver et Web Animations ; apparition du portrait par masque. Aucun contenu n’est masqué par défaut.
- Survols légers, navigation clavier, détails natifs `<details>`, filtres avec état accessible et annonce du nombre de résultats.

Aucune bibliothèque ni police distante n’a été ajoutée au site. Le formulaire et son intégration Formspree sont conservés.

## Fichiers utiles

- `src/styles.css` : palette, mise en page responsive et interactions visuelles.
- `src/app/directives/reveal.ts` : apparition progressive avec prise en compte de la réduction des mouvements.
- `src/app/components/hero/` : contrôle de la vidéo et gestion de la visibilité.
- `src/app/data/projects.data.ts` : contenu des projets, plateforme (`web` ou `mobile`) et illustration (`visual`).
- `src/app/models/project.model.ts` : modèle des données.
- `public/videos/` : film et affiche statique.
- `scripts/matiere-scene.html` : source WebGL originale de la sculpture.
- `scripts/generate-matiere.cjs` : génération hors ligne du film avec Playwright et FFmpeg.

## Vidéo

La boucle H.264 de 12 secondes, 768 × 768 à 20 images/s, pèse environ 175 Ko. Son affiche JPEG pèse environ 24 Ko. Aucun moteur 3D n’est chargé chez le visiteur.

La vidéo est muette et tourne automatiquement en boucle tant qu’elle est visible, sans bouton de lecture/pause. Elle se met en pause hors écran ou lorsque l’onglet est masqué, puis reprend au retour. La réduction des mouvements et l’économie de données conservent l’affiche statique sans chargement automatique.

Pour régénérer les ressources, disposer de FFmpeg et de Playwright avec un navigateur Chromium, puis lancer :

```sh
node scripts/generate-matiere.cjs
```

Si ces outils sont installés séparément, `PLAYWRIGHT_MODULE` accepte le chemin du module Playwright et `CHROMIUM_PATH` le chemin de l’exécutable du navigateur. Ils servent uniquement à la génération ; ils ne sont pas nécessaires au build ni au déploiement.

## Vérifications réalisées

- 20 tests unitaires réussis et build de production réussi.
- Brave/Chromium : affichage de 320 à 1440 px, sans débordement horizontal.
- Audit axe WCAG 2 A/AA et 2.1 AA : aucune violation automatisée sur ordinateur et mobile.
- Filtres, détails des projets, navigation active, menu mobile, Échap et retour du focus vérifiés.
- Pause/reprise du film, arrêt hors écran, préférence de mouvement modifiée en direct, économie de données et contenu pré-rendu sans JavaScript vérifiés.

L’audit automatisé ne remplace pas une évaluation complète avec les technologies d’assistance.
