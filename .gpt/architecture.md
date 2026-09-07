# Architecture du portfolio

## 1. Vue d’ensemble

Ce dépôt contient le portfolio statique d’**Elysé Vianney Ahomagnon**, accessible à l’adresse :

- Production : `https://www.vianneyahomagnon.fr/`
- Domaine canonique : `https://www.vianneyahomagnon.fr/`

Le projet est une application **Angular 21.2.23** monopage, stylée avec **Tailwind CSS 4**, pré-rendue en fichiers statiques par Angular puis déployée sur **Vercel**.

Il n’existe aucune route applicative : les liens du menu pointent vers les identifiants des sections de la page (`#home`, `#about`, etc.).

## 2. Technologies et principes

- Angular 21 avec composants standalone
- TypeScript 5.9
- Tailwind CSS 4, configuré directement dans `src/styles.css`
- Formulaires réactifs Angular pour la section Contact
- `HttpClient` avec `fetch` pour envoyer les messages à Formspree
- Signals Angular pour les petits états d’interface
- `ChangeDetectionStrategy.OnPush` sur les composants de présentation
- Pré-rendu statique Angular (`outputMode: "static"`)
- Tests unitaires avec Vitest et Angular TestBed
- Déploiement Vercel

Le site ne possède ni back-end interne ni base de données. Le seul service externe utilisé par l’application est Formspree.

## 3. Arborescence utile

```text
my_portfolio/
├── public/
│   ├── documents/              # CV téléchargeable
│   ├── images/                 # Photo de profil et images des projets
│   ├── favicon.svg             # Favicon avec la lettre V
│   ├── robots.txt              # Directives pour les moteurs de recherche
│   └── sitemap.xml             # Sitemap du domaine officiel
├── src/
│   ├── app/
│   │   ├── components/         # Sections visuelles de la page
│   │   ├── data/               # Contenu éditorial et configuration
│   │   ├── models/             # Interfaces TypeScript
│   │   ├── services/           # Accès aux services externes
│   │   ├── app.ts              # Composant racine
│   │   ├── app.html            # Ordre d’assemblage des sections
│   │   ├── app.config.ts       # Providers Angular côté navigateur
│   │   ├── app.routes.ts       # Aucune route : site monopage
│   │   └── app.routes.server.ts# Pré-rendu de toutes les routes
│   ├── index.html              # Métadonnées SEO, réseaux sociaux et JSON-LD
│   ├── styles.css              # Thème Tailwind et styles globaux
│   ├── main.ts                 # Point d’entrée navigateur
│   ├── main.server.ts          # Point d’entrée du rendu serveur
│   └── server.ts               # Serveur Angular généré pour le build
├── angular.json                # Build Angular statique et copie de public/
├── vercel.json                 # Build, dossier de sortie et headers HTTP
└── package.json                # Scripts et dépendances
```

## 4. Composition de la page

Le composant racine `src/app/app.ts` importe tous les composants standalone. Le template `src/app/app.html` les assemble dans cet ordre :

1. `Header` : logo texte « VIANNEY », navigation desktop et menu mobile accessible.
2. `Hero` : présentation principale, photo et appels à l’action.
3. `About` : résumé et lien vers le CV PDF.
4. `Experience` : expériences professionnelles générées depuis un dataset.
5. `Skills` : catégories de compétences générées depuis un dataset.
6. `Projects` : cartes de projets générées depuis un dataset.
7. `Contact` : coordonnées, réseaux sociaux et formulaire de contact.
8. `Footer` : année courante et retour en haut de page.

Le `<main>` contient les sections métier. Le header et le footer se trouvent en dehors. Un lien d’évitement « Aller au contenu principal » améliore la navigation au clavier.

## 5. Données et modèles

Les contenus répétitifs ne sont pas écrits directement dans les templates. Ils sont centralisés dans `src/app/data/`, typés par les interfaces de `src/app/models/`, puis affichés avec les boucles de templates Angular.

| Contenu | Dataset | Modèle |
|---|---|---|
| Menu | `navigation.data.ts` | `navigation-item.model.ts` |
| Expériences | `experiences.data.ts` | `experience.model.ts` |
| Compétences | `skills.data.ts` | `skill.model.ts` |
| Projets | `projects.data.ts` | `project.model.ts` |
| Liens sociaux | `social-links.data.ts` | `social-link.model.ts` |
| Formulaire | — | `contact-form.model.ts` |

Pour modifier le contenu du portfolio, il faut donc éditer prioritairement les fichiers de `src/app/data/`.

Les datasets référencent encore `/images/project_default.png`, mais le redesign remplace ce visuel temporaire à l’affichage par des illustrations conceptuelles originales en HTML/CSS. Toute image propre à un projet remplace automatiquement son illustration. Les URL GitHub et de démonstration restent optionnelles. Les compétences sont accessibles dans des éléments `<details>` natifs.

## 6. Formulaire de contact

Le formulaire est géré dans `components/contact/` avec les Reactive Forms :

- champs : e-mail, sujet, message et honeypot `_gotcha` ;
- validation côté client avec longueurs minimales et maximales ;
- états `idle`, `sending`, `success` et `error` pilotés par un signal ;
- messages de résultat accessibles avec `role="status"` ou `role="alert"`.

`ContactService` envoie le formulaire en `POST` JSON vers Formspree :

```text
https://formspree.io/f/xzebazok
```

L’endpoint est centralisé dans `src/app/data/contact.config.ts`. Aucun secret n’est stocké dans le dépôt.

## 7. Direction visuelle

Le thème reprend les couleurs du CV et est déclaré dans `src/styles.css` avec `@theme` :

- `cv-primary` : `#AA1A45` — rose framboise ;
- `cv-primary-dark` : `#861437` — variante foncée ;
- `cv-soft` : `#FFDCE5` — rose poudré ;
- `cv-text` : `#1F2023` — anthracite ;
- `cv-muted` : `#464A4F` — texte secondaire ;
- `cv-background` : `#FFFFFF` — fond et cartes.

La branche `redesign`, créée depuis `develop`, adopte une direction « carnet de création » : titres sans-serif et italiques Georgia, sections numérotées, portrait encadré, chronologie et illustrations de projets originales. Les couleurs de base sont conservées ; le blanc et le rose très pâle alternent entre les sections.

- `src/styles.css` centralise la grille responsive, les espacements et les survols.
- `src/app/directives/reveal.ts` anime une seule fois les éléments entrant à l’écran avec IntersectionObserver et Web Animations. Le contenu reste visible sans JavaScript. La préférence `prefers-reduced-motion` est respectée.
- Le header indique la section active et la progression de lecture ; ses calculs sont regroupés avec `requestAnimationFrame`.
- Le hero lit une vidéo abstraite originale locale avec un bouton pause/lecture. La lecture s’arrête hors écran ou lorsque l’onglet est masqué ; aucun chargement automatique en mode réduction des mouvements ou économie de données.
- Aucune bibliothèque d’animation ni police externe ajoutée.

## 8. Ressources publiques

- Photo : `public/images/maphoto.jpg`
- Image temporaire des projets : `public/images/project_default.png`
- Vidéo : `public/videos/ribbon-flow.mp4` (12 secondes, environ 90 Ko), affiche `ribbon-poster.jpg`
- Générateur de la vidéo : `scripts/generate-background.py` (Python 3 + FFmpeg, hors build)
- CV : `public/documents/cv-vianney-ahomagnon-2.pdf`
- Favicon : `public/favicon.svg`

Tout fichier placé dans `public/` est copié à la racine du site pendant le build. Dans les templates et datasets, les URL commencent donc par `/images/` ou `/documents/`.

## 9. SEO et accessibilité

`src/index.html` contient :

- la langue française ;
- le titre et la description ;
- l’URL canonique ;
- les métadonnées Open Graph et Twitter ;
- les données structurées Schema.org de type `ProfilePage` et `Person` ;
- le favicon personnalisé.

`public/robots.txt` autorise l’indexation et référence `public/sitemap.xml`.

Les composants utilisent notamment des titres hiérarchisés, textes alternatifs, libellés ARIA, gestion du clavier, focus visible et annonces accessibles du formulaire.

## 10. Build, tests et déploiement

Commandes principales :

```bash
npm install
npm start
npm test
npm run build
```

Le build de production est généré dans :

```text
dist/my_portfolio/browser
```

`angular.json` active le pré-rendu statique. `vercel.json` demande à Vercel d’exécuter `npm run build`, publie ce dossier et ajoute plusieurs headers de sécurité.

Avant livraison, vérifier au minimum :

```bash
npm test
npm run build
```

La dernière validation connue comptait **19 tests réussis** et un build de production réussi.

## 11. Conventions de maintenance

- Garder les composants centrés sur l’affichage ; placer les listes dans `data/`.
- Ajouter ou adapter le modèle TypeScript avant d’introduire un nouveau champ de données.
- Conserver les tableaux exportés en lecture seule (`readonly`).
- Utiliser les couleurs `cv-*` existantes au lieu d’ajouter une nouvelle couleur dominante.
- Préserver les états clavier, les libellés accessibles et la réduction des animations.
- Mettre à jour `sitemap.xml` si de vraies pages ou URL publiques sont ajoutées.
- Mettre à jour les métadonnées de `index.html` si le domaine, le métier, l’image sociale ou l’identité changent.
- Remplacer progressivement `project_default.png` par les captures propres à chaque projet.

## 12. Workflow Git retenu avec l’utilisateur

Le développement a été organisé avec une branche `develop` et des branches fonctionnelles dédiées, notamment `theme_global`, `models_datasets`, `navigation_menu`, `hero_about`, `experience_skills`, `projects_section`, `contact_footer`, `seo_accessibility`, `quality_assurance` et `deployment_vercel`.

**Consigne importante pour un prochain assistant : ne pas exécuter de commande Git de sa propre initiative.** Expliquer précisément les commandes à l’utilisateur et le laisser les lancer lui-même.

## 13. État de production et prochaines vérifications

Le site avec `www` est en ligne. Lors de la dernière vérification, la configuration restante concernait surtout :

- la redirection du domaine nu `vianneyahomagnon.fr` vers `www.vianneyahomagnon.fr` dans Vercel/OVH ;
- la validation DNS du domaine dans Google Search Console ;
- l’envoi de `sitemap.xml` ;
- la demande d’indexation de la page d’accueil ;
- la vérification publique du favicon et des nouvelles métadonnées après le dernier déploiement.

Ces points doivent être revérifiés plutôt que supposés incomplets, car la configuration externe peut avoir été terminée depuis la rédaction de ce document.

## 14. Validation du redesign — 6 septembre 2026

- 19 tests unitaires réussis et build statique de production réussi.
- Vérification navigateur Brave/Chromium : six largeurs entre 320 et 1440 px, sans débordement horizontal.
- Audit axe WCAG 2 A/AA et 2.1 AA : aucune violation automatisée sur ordinateur et mobile.
- Lecture/pause, arrêt hors écran, navigation active, détails des projets, menu mobile, Échap et retour du focus vérifiés.
- Réduction des mouvements au chargement et en cours de lecture, économie de données et contenu pré-rendu sans JavaScript vérifiés.
- Aucune publication ni commit effectué pendant la refonte.

## 15. Variante Matière — 7 septembre 2026

La branche active `redesign2` a été créée depuis `develop` à la demande de l’utilisateur. Il s’agit d’une seconde direction, distincte de la branche `redesign` : formes organiques, surfaces poudrées, navigation flottante, portrait découpé, cartes et illustrations sculpturales.

- Le modèle `Project` possède désormais `platform` (`web` / `mobile`) et `visual` pour piloter les filtres et les illustrations. Les cinq projets existants sont conservés.
- Les projets se filtrent via des boutons à état `aria-pressed`, avec annonce du nombre de résultats.
- `Reveal` comporte l’option `revealMask`, utilisée sur le portrait ; contenu visible sans JavaScript et prise en compte de la réduction des mouvements.
- La vidéo est `public/videos/matiere-loop.mp4` (12 s, 768 × 768, 20 images/s, environ 175 Ko) avec `matiere-poster.jpg` (environ 24 Ko). Les fichiers ribbon appartiennent à la première direction et ne sont pas utilisés ici.
- `scripts/matiere-scene.html` définit la sculpture originale en WebGL ; `scripts/generate-matiere.cjs` la rend hors ligne via Playwright et FFmpeg. Aucun moteur 3D n’est livré aux visiteurs et aucune dépendance applicative n’est ajoutée.
- Les 20 tests unitaires et le build réussissent. Les filtres, la vidéo, le menu clavier, la réduction des mouvements, l’économie de données et le contenu sans JavaScript ont été vérifiés dans Brave/Chromium.
- Six largeurs testées entre 320 et 1440 px sans débordement ; aucun problème détecté par axe WCAG 2 A/AA et 2.1 AA sur ordinateur et mobile.
- Les modifications sont laissées localement, sans commit ni publication.
