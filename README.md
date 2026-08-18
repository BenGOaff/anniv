# CHAT & SOURIS // CHAPITRE 55 : LA PROCHAINE AVENTURE

Mini-jeu web narratif, jouable en portrait sur iPhone, accessible par lien ou QR code.
11 scènes + épilogue, 7 à 10 minutes, aucune possibilité de perdre ou de rester bloquée.

- **Révélation** : samedi 29 août 2026
- **Quête** : dimanche 30 août 2026, Camargue

---

## Démarrer

```bash
npm install
npm run dev        # serveur local
npm run build      # build de production -> dist/
npm run preview    # prévisualisation du build
```

Le build produit un site **100 % statique** dans `dist/`. Aucun backend, aucune base,
aucun compte. Déployable sur Vercel, Netlify, Hostinger, un simple dossier FTP, etc.

`base` est réglé sur `./` : le jeu fonctionne aussi bien à la racine d'un domaine
que dans un sous-dossier (`https://mondomaine.tld/cs-55-7f3k9x/`).

## Mode preview / debug

Paramètres d'URL, utiles pour tester sans rejouer toute la partie :

| Paramètre | Effet |
|---|---|
| `?scene=10` | ouvre directement la scène 10 (`00` à `11`) |
| `?reset=1` | efface la sauvegarde locale |
| `?previewDate=2026-08-29` | simule la date du jour (logique « DEMAIN ») |
| `?debug=1` | affiche une barre de saut de scène + RESET |

Combinables : `?scene=10&reset=1&previewDate=2026-08-29&debug=1`

Les scènes : `00` boot · `01` rencontre · `02` Marseille · `03` distance ·
`04` Montpellier · `05` Pirate & PeeWee · `06` les niveaux qu'on ne choisit pas ·
`07` Bonifacio · `08` Propriano · `09` Carnon · `10` Camargue · `11` épilogue.

## Modifier les textes, la date, le cadeau

**Tout le contenu éditorial est dans un seul fichier : `src/config/story.config.ts`.**
Aucun composant ne contient de texte en dur.

- `storyConfig` — prénoms, alias, âge, dates (`revealDate`, `giftDate`), contenu du cadeau.
- `copy` — l'intégralité des textes affichés, scène par scène.
- `achievements` — les 12 patches.
- `chapters` — les titres de transition.
- `marks` — les marquages techniques des coins d'écran.

### Logique de date

Si la date locale du téléphone est le `revealDate` (29/08/2026), l'écran de révélation
affiche **DEMAIN.** au-dessus de la date. Sinon, seule la date exacte s'affiche.
Testable sans toucher à l'horloge du téléphone avec `?previewDate=`.

### Changer la date du cadeau

Modifier `revealDate` et `giftDate` dans `storyConfig`, puis les libellés affichés
dans `copy.camargue` (`dayName`, `dateFull`) et `chapters.s08` si besoin.

## QR code

```bash
npm run qr -- https://mondomaine.tld/cs-55-7f3k9x/
```

Génère `qr/chapitre-55.svg` et `qr/chapitre-55.png` (1024 px, correction d'erreur H,
encre navy sur off-white).

## Confidentialité — ne rien spoiler

Déjà en place dans le code :

- `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`
- `public/robots.txt` bloquant tout crawl
- titre et Open Graph neutres (« Chat & Souris // Chapitre 55 », vignette sans Camargue ni spa)
- aucune mention de la destination, du programme ou du 30 août avant la scène finale
- la scène 10 masque son titre de chapitre et la barre de progression pour préserver
  la fausse fin

**À faire au déploiement** : choisir une URL non devinable, par exemple
`/cs-55-7f3k9x/` — jamais `/cadeau-sylvie-camargue/`.

## Sauvegarde

Progression, achievements et préférence audio dans `localStorage`
(clé `cs55.save.v2`). Au retour, l'écran titre propose **CONTINUER** ou **RECOMMENCER**.
En navigation privée Safari, l'écriture échoue silencieusement : le jeu reste jouable.

## Son

Coupé par défaut (découverte au restaurant). Le jeu est conçu pour être parfait en
silence. L'audio est **entièrement synthétisé** en WebAudio (`src/lib/audio.ts`) :
aucun fichier son, aucun contenu sous droits, zéro octet supplémentaire.

## Structure

```
src/
  art/          Characters.tsx (Chat, Souris, Pirate, PeeWee), Backdrops.tsx, Icons.tsx
  components/   ui.tsx (HUD, carte de chapitre, boutons, patches)
  config/       story.config.ts   <-- source de vérité éditoriale
  hooks/        useGameProgress, useSequence, useDrag
  lib/          audio.ts
  scenes/       Scene00Boot ... Scene11Epilogue
  styles/       tokens.css, base.css, ui.css, scenes.css
public/         fonts/, robots.txt, sw.js, icon.svg, og.svg, manifest
```

## Direction artistique

Palette imposée, définie dans `src/styles/tokens.css` :
Ink Navy `#131A2A` · Racing Orange `#FF5A24` · Signal Red `#E63E48` ·
Electric Blue `#3478F6` · Aqua `#55D6E8` · Off White `#F5F3EE` · Cool Grey `#A9B1BD`.

**Aucun or, doré, bronze ni effet métal précieux.**

Typographie : Barlow Condensed (titres), Inter (texte), JetBrains Mono (HUD),
auto-hébergées en woff2 latin dans `public/fonts` — aucune requête vers un CDN,
donc aucune dépendance au réseau du restaurant.

Tous les visuels (personnages, décors, pictos, patches) sont des SVG originaux
écrits pour ce projet. Aucun asset d'Uncharted, Superdry, Gayvox ou PlayStation.

## Performance et robustesse

- Build total ≈ 540 Ko (JS + CSS + polices), très en dessous du budget de 5 Mo.
- Animations en `transform` / `opacity` / SVG, pas de WebGL, pas de vidéo.
- Scènes animées en continu : mutation directe du DOM, pas de rendu React par frame.
- Décors mémoïsés pour éviter tout re-rendu SVG inutile.
- `prefers-reduced-motion` respecté.
- Service worker simple (réseau d'abord, cache en secours) : une fois la page chargée,
  une mauvaise connexion ne casse plus l'expérience.
- `100dvh` + safe areas iOS, portrait prioritaire, message élégant en paysage.
- Zones tactiles ≥ 44 × 44 px, aucun scroll sur les écrans narratifs.

## Règles de contenu

Le jeu est prévu pour être joué **devant la mère de Sylvie**. Il ne contient
ni détail sexuel, ni partenaire intermédiaire, ni conflit avec une ex, ni prix,
ni facture, ni mention de « bon cadeau ». Le décès du père, le handicap et le
harcèlement au travail sont traités comme des épreuves traversées ensemble,
jamais comme des ennemis ou des scores.

Le drapeau `storyConfig.flags.enablePrivateAdultEasterEggs` est à `false` et doit
le rester : c'est un interrupteur explicite, jamais une surprise cachée.
