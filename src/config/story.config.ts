/* ============================================================
   CHAT & SOURIS // CHAPITRE 55 — CONFIGURATION EDITORIALE
   ------------------------------------------------------------
   SOURCE DE VERITE UNIQUE.
   Tout ce qui peut changer (prenoms, dates, textes, cadeau)
   vit ici. Les composants ne contiennent aucun texte en dur.

   LANGUE : tout est en francais, sans exception.
   Le vocabulaire de jeu est traduit ("SUCCES" et non
   "ACHIEVEMENT", "SAUVEGARDE" et non "SAVE FILE").
   ============================================================ */

export const storyConfig = {
  player1: { name: 'Sylvie', alias: 'Chat', age: 55 },
  player2: { name: 'Bénédicte', alias: 'Souris' },

  relationshipStartYear: 2014,
  weddingDate: '2022-08-27',
  revealDate: '2026-08-29', // samedi, au restaurant
  giftDate: '2026-08-30', // dimanche, la quete

  build: '55.0',

  gift: {
    destination: 'Camargue',
    lunch: true,
    cocktail: true,
    spaMinutes: 60,
    heatedOutdoorPool: true,
    hammam: true,
    indoorWhirlpool: true,
    sauna: true,
    privateMassageSeatMinutes: 60,
  },

  /* --------------------------------------------------------
     Photo finale — une seule, sur l'epilogue.
     Depose ton image dans public/photos/ sous ce nom.
     Si le fichier est absent, le jeu garde la version
     illustree : aucune image cassee ne s'affichera jamais.
     -------------------------------------------------------- */
  photo: {
    enabled: true,
    src: './photos/final.jpg',
    caption: 'CARNON // AUJOURD’HUI',
    /* 'duotone' = traitee aux couleurs du jeu (recommande)
       'naturelle' = couleurs d'origine, simplement cadree */
    treatment: 'duotone' as 'duotone' | 'naturelle',
  },

  flags: {
    /* Contenu adulte / private jokes explicites : hors jeu par defaut.
       A n'activer que volontairement, jamais comme surprise cachee. */
    enablePrivateAdultEasterEggs: false,
    /* Son : coupe par defaut (decouverte au restaurant). */
    audioDefaultOn: false,
  },
} as const

/* ------------------------------------------------------------
   Succes / patches
   ------------------------------------------------------------ */

export type AchievementId =
  | 'crush-vocal'
  | 'premier-baiser'
  | 'sauvegarde'
  | 'connexion'
  | 'a-deux'
  | 'pirate'
  | 'peewee'
  | 'toujours-la'
  | 'quete-principale'
  | 'mariees'
  | 'version-actuelle'
  | 'legendaire'

export type Achievement = {
  id: AchievementId
  code: string
  label: string
  context: string
  tone: 'orange' | 'red' | 'blue' | 'aqua'
}

export const achievements: Achievement[] = [
  { id: 'crush-vocal', code: '001', label: 'COUP DE FOUDRE VOCAL', context: '2014 // LA RENCONTRE', tone: 'orange' },
  { id: 'premier-baiser', code: '002', label: 'PREMIER BAISER', context: '2014 // MARSEILLE', tone: 'red' },
  { id: 'sauvegarde', code: '003', label: 'SAUVEGARDE INTACTE', context: 'LONGUE DISTANCE', tone: 'blue' },
  { id: 'connexion', code: '004', label: 'CONNEXION RÉTABLIE', context: 'MONTPELLIER', tone: 'aqua' },
  { id: 'a-deux', code: '005', label: 'MODE À DEUX', context: 'LANSARGUES', tone: 'orange' },
  { id: 'pirate', code: '006', label: 'PIRATE REJOINT L’ÉQUIPE', context: 'CAMP DE BASE', tone: 'blue' },
  { id: 'peewee', code: '007', label: 'PEEWEE REJOINT L’ÉQUIPE', context: 'CAMP DE BASE', tone: 'aqua' },
  { id: 'toujours-la', code: '008', label: 'TOUJOURS LÀ', context: 'LES NIVEAUX QU’ON NE CHOISIT PAS', tone: 'red' },
  { id: 'quete-principale', code: '009', label: 'QUÊTE PRINCIPALE ACCEPTÉE', context: '2021 // BONIFACIO', tone: 'aqua' },
  { id: 'mariees', code: '010', label: 'MODE MARIÉES', context: '2022 // PROPRIANO', tone: 'red' },
  { id: 'version-actuelle', code: '011', label: 'VERSION ACTUELLE', context: 'CARNON', tone: 'blue' },
  { id: 'legendaire', code: '012', label: 'JOUEUSE LÉGENDAIRE', context: 'NIVEAU 55', tone: 'orange' },
]

/* ------------------------------------------------------------
   Marquages techniques recurrents (coins d'ecran, patches)
   ------------------------------------------------------------ */

export const marks = {
  signature: 'C&S // 2014',
  division: 'ÉQUIPAGE C&S',
  p1: 'JOUEUSE 01 // CHAT',
  p2: 'JOUEUSE 02 // SOURIS',
  unit: 'UNITÉ MÉDITERRANÉE',
  build: 'VERSION // 55.0',
  series: 'SÉRIE AVENTURE',
  since: 'ENSEMBLE DEPUIS 2014',
}

/* ------------------------------------------------------------
   Chapitres — cartons de transition
   ------------------------------------------------------------ */

export type ChapterCard = {
  index: string
  title: string
  place: string
  /** Version courte, pour le bandeau du haut qui n'a pas la place. */
  short?: string
}

export const chapters: Record<string, ChapterCard> = {
  s00: { index: '00', title: 'DÉMARRAGE', place: 'JOUEUSE TROUVÉE' },
  s01: { index: '01', title: 'CONTACT ÉTABLI', place: '2014 // CORSE — LA GRANDE MOTTE' },
  s02: { index: '02', title: 'MARSEILLE', place: '2014 // GARE MARITIME' },
  s03: { index: '03', title: 'LONGUE DISTANCE', place: 'CORSE — BRON — SUISSE' },
  s04: { index: '04', title: 'RÉAPPARITION', place: 'MONTPELLIER' },
  s05: { index: '05', title: 'L’ÉQUIPE S’AGRANDIT', place: 'CAMP DE BASE', short: 'L’ÉQUIPE' },
  s06: { index: '06', title: 'LES NIVEAUX QU’ON NE CHOISIT PAS', place: 'À DEUX', short: 'LES NIVEAUX' },
  s07: { index: '07', title: 'BONIFACIO', place: '2021 // CORSE DU SUD' },
  s08: { index: '08', title: 'PROPRIANO', place: '27.08.2022' },
  s09: { index: '09', title: 'VERSION ACTUELLE', place: 'CARNON' },
  s10: { index: '10', title: 'QUÊTE SECRÈTE', place: 'CHIFFRÉE' },
}

/* ------------------------------------------------------------
   Textes de scenes
   ------------------------------------------------------------ */

export const copy = {
  boot: {
    lines: ['VÉRIFICATION DU SYSTÈME…', 'JOUEUSE IDENTIFIÉE'],
    player: 'SYLVIE',
    alias: 'ALIAS // CHAT',
    build: 'VERSION // 55.0',
    status: 'STATUT // LÉGENDAIRE',
    connected: 'Souris est connectée.',
    title: 'CHAT & SOURIS',
    subtitle: 'CHAPITRE 55 : LA PROCHAINE AVENTURE',
    cta: 'LANCER LA PARTIE',
    continue: 'CONTINUER',
    restart: 'RECOMMENCER',
    savedNote: 'PARTIE EN COURS DÉTECTÉE',
  },

  gayvox: {
    header: 'LA RENCONTRE // 2014',
    profile: 'ESRUN',
    profileMeta: 'EN LIGNE • CORSE • STAGE INFIRMIER',
    visits: ['VISITE N° 1', 'VISITE N° 2', 'VISITE N° 3'],
    insist: '…quelqu’un insiste légèrement.',
    hintVisit: 'TOUCHE POUR VOIR QUI',
    ctaMessage: 'ENVOYER UN MESSAGE',
    messageSent: 'MESSAGE ENVOYÉ',
    ctaCall: 'DÉCROCHE',
    callLines: ['LIAISON VOCALE // ÉTABLIE', 'COUP CRITIQUE', 'COUP DE FOUDRE VOCAL // DÉBLOQUÉ'],
  },

  marseille: {
    header: 'GARE MARITIME // MARSEILLE',
    instruction: 'GUIDE LA VOITURE JUSQU’À SOURIS',
    hint: 'GLISSE LE DOIGT VERS LE HAUT',
    waiting: 'SOURIS // EN ATTENTE',
    arrived: 'TOUCHE-LES POUR LES RÉUNIR',
    achievement: 'SUCCÈS // PREMIER BAISER',
    stamp: 'MARSEILLE // 2014',
    discretion: 'DISCRÉTION // 0/100',
    hotel: 'VOYAGE RAPIDE',
    calanques: 'LES CALANQUES // TEMPS LIBRE',
  },

  distance: {
    header: 'MODE LONGUE DISTANCE',
    instruction: 'GARDE LE LIEN',
    hint: 'MAINTIENS LE DOIGT APPUYÉ',
    warnings: ['SIGNAL INSTABLE', 'DISTANCE // ÉLEVÉE', 'INTERFÉRENCES DÉTECTÉES'],
    lost: 'CONNEXION PERDUE',
    checking: 'RECHERCHE DE LA SAUVEGARDE…',
    found: ['SAUVEGARDE TROUVÉE.', 'PAS EFFACÉE.'],
    nodes: ['CORSE', 'LA GRANDE MOTTE', 'BRON', 'SUISSE'],
  },

  montpellier: {
    header: 'MONTPELLIER // CHAMBRE 4',
    ctaEnter: 'ENTRE',
    hr: 'RYTHME CARDIAQUE // SUSPECT',
    butterflies: 'PAPILLONS // BEAUCOUP TROP',
    ctaApproach: 'S’APPROCHER',
    restored: ['CONNEXION RÉTABLIE', 'COMPATIBILITÉ // 100 %'],
    suitcaseHint: 'GLISSE LA VALISE',
    from: 'BEAUJOLAIS',
    to: 'LANSARGUES',
    home: ['CAMP DE BASE TROUVÉ', 'MODE À DEUX // ACTIVÉ'],
  },

  party: {
    header: 'DEUX CAISSES À OUVRIR',
    hint: 'TOUCHE POUR OUVRIR',
    pirate: 'PIRATE REJOINT L’ÉQUIPE',
    peewee: 'PEEWEE REJOINT L’ÉQUIPE',
    size: 'ÉQUIPE // 4 MEMBRES',
    note: 'Frère et sœur. Ils rejoignent la famille.',
  },

  levels: {
    intro: ['CERTAINS NIVEAUX NE SE GAGNENT PAS.', 'ILS SE TRAVERSENT.'],
    cta: 'RESTER LÀ',
    gauge: 'ENSEMBLE',
    words: ['Ton papa.', 'Mon dos.', 'Le fauteuil.', 'Ton travail.', 'Les galères.', 'Le Covid.'],
    outro: [
      'TOUJOURS LÀ.',
      'Chaque épreuve aurait pu nous éloigner.',
      'Elle nous a rapprochées.',
      'Merci, mon Chat.',
    ],
  },

  bonifacio: {
    header: 'BONIFACIO // 2021',
    instruction: 'MÈNE LE KAYAK JUSQU’À LA GROTTE',
    hint: 'GLISSE POUR NAVIGUER',
    cave: 'LA GROTTE DES AMOUREUX',
    question: 'VEUX-TU M’ÉPOUSER ?',
    answers: ['OUI', 'OUI, ÉVIDEMMENT'],
    accepted: ['QUÊTE PRINCIPALE // ACCEPTÉE', 'BONIFACIO // 2021'],
  },

  propriano: {
    loading: 'CHARGEMENT DU MARIAGE…',
    place: 'PROPRIANO',
    date: '27 AOÛT 2022',
    cta: 'DIRE OUI ENCORE UNE FOIS',
    unlocked: ['MODE MARIÉES // DÉBLOQUÉ', 'CHAT + SOURIS // ÉQUIPE DÉFINITIVE'],
    note: 'Premier couple gay à se marier à Propriano.',
  },

  carnon: {
    header: 'VERSION ACTUELLE // CARNON',
    hint: 'EXPLORE LE CAMP DE BASE',
    hotspots: [
      {
        id: 'desk-chat',
        label: 'BUREAU DE CHAT',
        title: 'TÉLÉTRAVAIL // EN LIGNE',
        lines: ['18 ans chez Teleperformance', 'Résistance aux réunions // LÉGENDAIRE'],
      },
      {
        id: 'desk-souris',
        label: 'BUREAU DE SOURIS',
        title: 'ENTREPRISE // EN MARCHE',
        lines: ['Souris travaille encore un peu trop.'],
      },
      {
        id: 'cats',
        label: 'PIRATE & PEEWEE',
        title: 'SUPERVISION // PERMANENTE',
        lines: ['Aucun jour de congé posé.'],
      },
      {
        id: 'sea',
        label: 'LA FENÊTRE',
        title: 'CAMP DE BASE // CARNON',
        lines: ['La mer, en face. Tous les jours.'],
      },
    ],
    status: ['VERSION ACTUELLE // STABLE', 'MOBILITÉ // EN PROGRÈS', 'DUO // ACTIF'],
    outro: [
      'Aujourd’hui, la partie devient enfin un peu plus légère.',
      'Et elle est toujours meilleure à deux.',
    ],
    cta: 'CONTINUER',
  },

  camargue: {
    falseEnd: ['FIN DU CHAPITRE 55', 'MERCI D’AVOIR JOUÉ'],
    detected: 'SIGNAL DÉTECTÉ',
    locked: 'PROCHAINE QUÊTE // CHIFFRÉE',
    ctaDecrypt: 'DÉCHIFFRER',
    puzzleInstruction: 'REMETS NOS QUATRE PREMIÈRES FOIS DANS L’ORDRE',
    puzzleHelp: 'AIDE ACTIVÉE',
    symbols: [
      { id: 'message', label: 'LE MESSAGE', year: '2014' },
      { id: 'ferry', label: 'LE FERRY', year: '2014' },
      { id: 'home', label: 'LA MAISON', year: 'LANSARGUES' },
      { id: 'ring', label: 'LA BAGUE', year: '2021' },
    ],
    decrypting: ['DÉCHIFFREMENT EN COURS…', 'RECHERCHE DE LA DESTINATION…', 'DESTINATION TROUVÉE.'],
    destination: 'CAMARGUE',
    ctaDate: 'VOIR LA DATE',
    tomorrow: 'DEMAIN.',
    dayName: 'DIMANCHE',
    dateFull: '30.08.2026',
    ctaWhat: 'MAIS ON FAIT QUOI ?',
    mission: ['MISSION :', 'NE RIEN FAIRE.'],
    correction: 'Correction du système…',
    missionFixed: 'PROFITER.',
    missionNote: 'Toute la journée. À deux.',
    ctaProgram: 'VOIR LE PROGRAMME',
    programHint: 'TOUCHE POUR DÉBLOQUER',
    bonuses: [
      { code: 'BONUS 01', title: 'DÉJEUNER', desc: 'Dans un endroit paisible.', stat: 'ÉNERGIE +100', icon: 'lunch' },
      { code: 'BONUS 02', title: 'COCKTAIL', desc: '', stat: 'MODE DÉTENTE // ACTIVÉ', icon: 'cocktail' },
      { code: 'BONUS 03', title: 'SPA', desc: 'Accès spa pendant 1 h.', stat: 'STRESS −25', icon: 'spa' },
      { code: 'BONUS 04', title: 'PISCINE', desc: 'Piscine extérieure chauffée.', stat: 'TEMPÉRATURE // PARFAITE', icon: 'pool' },
      { code: 'BONUS 05', title: 'HAMMAM', desc: 'Accès au hammam.', stat: 'VAPEUR // EN MARCHE', icon: 'hammam' },
      { code: 'BONUS 06', title: 'BAIN À REMOUS', desc: 'Bain à remous intérieur.', stat: 'BULLES // ILLIMITÉES', icon: 'whirlpool' },
      { code: 'BONUS 07', title: 'SAUNA', desc: 'Accès au sauna.', stat: 'REMISE À ZÉRO // COMPLÈTE', icon: 'sauna' },
      { code: 'BONUS 08', title: 'SIÈGE MASSANT PRIVATIF', desc: 'Pendant 1 h.', stat: 'MODE CHAT // MAXIMUM', icon: 'massage' },
    ],
    recap: {
      title: 'CAMARGUE // 30.08.2026',
      rows: [
        ['ÉQUIPE', '2'],
        ['JOUEUSES', 'CHAT + SOURIS'],
        ['OBJECTIF', 'PROFITER'],
        ['STRESS AUTORISÉ', '0 %'],
      ],
      departLabel: 'DÉPART',
      cta: 'J’ACCEPTE LA QUÊTE',
    },
    patch: ['QUÊTE ACCEPTÉE', 'NIVEAU 55 // JOUEUSE LÉGENDAIRE', 'NOUVELLE AVENTURE PROGRAMMÉE', '30.08.2026'],
  },

  epilogue: {
    lines: [
      'Joyeux anniversaire, mon Chat.',
      'Il y a douze ans, j’ai cliqué un peu trop souvent sur ton profil.',
      'C’était probablement une de mes meilleures décisions.',
      'Depuis, on en a traversé des trucs.',
      'Et s’il fallait recommencer…',
    ],
    finalLine: 'JE RECLIQUERAIS.',
    signature: 'Ta Souris',
    catsNotif: 'L’ÉQUIPE RÉCLAME',
    catsLines: [
      { who: 'PIRATE', what: 'Et nous ?' },
      { who: 'PEEWEE', what: 'Vous rentrez à quelle heure ?' },
    ],
    catsCta: 'ON VERRA',
    catsRemember: 'Les chats s’en souviendront.',
    replay: 'REVOIR LE CHAPITRE',
  },

  ui: {
    continue: 'CONTINUER',
    soundOn: 'Couper le son',
    soundOff: 'Activer le son',
    rotate: 'REMETS L’ÉCRAN À LA VERTICALE',
    rotateNote: 'Ce chapitre se joue en portrait.',
    chapter: 'CHAPITRE',
    epilogue: 'ÉPILOGUE',
  },
} as const

/* ------------------------------------------------------------
   Ordre des scenes
   ------------------------------------------------------------ */

export const sceneOrder = [
  's00',
  's01',
  's02',
  's03',
  's04',
  's05',
  's06',
  's07',
  's08',
  's09',
  's10',
  's11',
] as const

export type SceneId = (typeof sceneOrder)[number]
