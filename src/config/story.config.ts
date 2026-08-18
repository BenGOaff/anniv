/* ============================================================
   CHAT & SOURIS // CHAPITRE 55 — CONFIGURATION EDITORIALE
   ------------------------------------------------------------
   SOURCE DE VERITE UNIQUE.
   Tout ce qui peut changer (prenoms, dates, textes, cadeau)
   vit ici. Les composants ne contiennent aucun texte en dur.
   ============================================================ */

export const storyConfig = {
  player1: { name: 'Sylvie', alias: 'Chat', age: 55 },
  player2: { name: 'Bénédicte', alias: 'Souris' },

  relationshipStartYear: 2014,
  weddingDate: '2022-08-27',
  revealDate: '2026-08-29', // samedi, au restaurant
  giftDate: '2026-08-30', // dimanche, la quete

  build: '55.0',
  unit: 'MEDITERRANEAN UNIT',

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

  flags: {
    /* Contenu adulte / private jokes explicites : hors jeu par defaut.
       A n'activer que volontairement, jamais comme surprise cachee. */
    enablePrivateAdultEasterEggs: false,
    /* Son : coupe par defaut (decouverte au restaurant). */
    audioDefaultOn: false,
  },
} as const

/* ------------------------------------------------------------
   Achievements / patches
   ------------------------------------------------------------ */

export type AchievementId =
  | 'crush-vocal'
  | 'premier-baiser'
  | 'save-file-found'
  | 'connection-restored'
  | 'co-op-mode'
  | 'pirate-joined'
  | 'peewee-joined'
  | 'toujours-la'
  | 'main-quest'
  | 'married-mode'
  | 'current-build'
  | 'legendary-player'

export type Achievement = {
  id: AchievementId
  code: string
  label: string
  context: string
  tone: 'orange' | 'red' | 'blue' | 'aqua'
}

export const achievements: Achievement[] = [
  { id: 'crush-vocal', code: '001', label: 'CRUSH VOCAL', context: '2014 // GAYVOX', tone: 'orange' },
  { id: 'premier-baiser', code: '002', label: 'PREMIER BAISER', context: '2014 // MARSEILLE', tone: 'red' },
  { id: 'save-file-found', code: '003', label: 'SAVE FILE FOUND', context: 'LONG DISTANCE MODE', tone: 'blue' },
  { id: 'connection-restored', code: '004', label: 'CONNECTION RESTORED', context: 'MONTPELLIER', tone: 'aqua' },
  { id: 'co-op-mode', code: '005', label: 'CO-OP MODE', context: 'LANSARGUES', tone: 'orange' },
  { id: 'pirate-joined', code: '006', label: 'PIRATE JOINED THE PARTY', context: 'HOME BASE', tone: 'blue' },
  { id: 'peewee-joined', code: '007', label: 'PEEWEE JOINED THE PARTY', context: 'HOME BASE', tone: 'aqua' },
  { id: 'toujours-la', code: '008', label: 'TOUJOURS LÀ', context: 'LES NIVEAUX QU’ON NE CHOISIT PAS', tone: 'red' },
  { id: 'main-quest', code: '009', label: 'MAIN QUEST ACCEPTED', context: '2021 // BONIFACIO', tone: 'aqua' },
  { id: 'married-mode', code: '010', label: 'MARRIED MODE', context: '2022 // PROPRIANO', tone: 'red' },
  { id: 'current-build', code: '011', label: 'CURRENT BUILD', context: 'CARNON', tone: 'blue' },
  { id: 'legendary-player', code: '012', label: 'LEGENDARY PLAYER', context: 'LEVEL 55', tone: 'orange' },
]

/* ------------------------------------------------------------
   Marquages techniques recurrents (coins d'ecran, patches, cartes)
   ------------------------------------------------------------ */

export const marks = {
  signature: 'C&S // 2014',
  division: 'CO-OP DIVISION',
  p1: 'PLAYER 01 // CHAT',
  p2: 'PLAYER 02 // SOURIS',
  unit: 'MEDITERRANEAN UNIT',
  build: 'CURRENT BUILD // 55.0',
  series: 'ADVENTURE SERIES',
}

/* ------------------------------------------------------------
   Chapitres — titres de transition
   ------------------------------------------------------------ */

export type ChapterCard = {
  index: string
  title: string
  place: string
}

export const chapters: Record<string, ChapterCard> = {
  s00: { index: '00', title: 'BOOT', place: 'PLAYER FOUND' },
  s01: { index: '01', title: 'MATCH FOUND', place: '2014 // CORSE — LA GRANDE MOTTE' },
  s02: { index: '02', title: 'CHECKPOINT MARSEILLE', place: '2014 // GARE MARITIME' },
  s03: { index: '03', title: 'LONG DISTANCE MODE', place: 'CORSE — BRON — SUISSE' },
  s04: { index: '04', title: 'UNEXPECTED RESPAWN', place: 'MONTPELLIER' },
  s05: { index: '05', title: 'PARTY EXPANDED', place: 'HOME BASE' },
  s06: { index: '06', title: 'LES NIVEAUX QU’ON NE CHOISIT PAS', place: 'CO-OP' },
  s07: { index: '07', title: 'QUEST BONIFACIO', place: '2021 // CORSE DU SUD' },
  s08: { index: '08', title: 'PROPRIANO', place: '27.08.2022' },
  s09: { index: '09', title: 'CURRENT BUILD', place: 'CARNON' },
  s10: { index: '10', title: 'SECRET QUEST', place: 'ENCRYPTED' },
}

/* ------------------------------------------------------------
   Textes de scenes
   ------------------------------------------------------------ */

export const copy = {
  boot: {
    lines: ['SYSTEM CHECK…', 'PLAYER IDENTIFIED'],
    player: 'SYLVIE',
    alias: 'ALIAS // CHAT',
    build: 'BUILD // 55.0',
    status: 'STATUS // LEGENDARY',
    connected: 'Souris connected.',
    title: 'CHAT & SOURIS',
    subtitle: 'CHAPITRE 55 : LA PROCHAINE AVENTURE',
    cta: 'LANCER LA PARTIE',
    continue: 'CONTINUER',
    restart: 'RECOMMENCER',
    savedNote: 'PARTIE EN COURS DÉTECTÉE',
  },

  gayvox: {
    header: 'RENCONTRE // RÉSEAU 2014',
    profile: 'ESRUN',
    profileMeta: 'EN LIGNE • CORSE • STAGE INFIRMIER',
    visits: ['VISITE #1', 'VISITE #2', 'VISITE #3'],
    insist: '…quelqu’un insiste légèrement.',
    hintVisit: 'REGARDER LE PROFIL',
    ctaMessage: 'ENVOYER UN MESSAGE',
    messageSent: 'MESSAGE ENVOYÉ',
    ctaCall: 'DÉCROCHE',
    callLines: ['VOICE CONNECTION // ESTABLISHED', 'CRITICAL HIT', 'CRUSH VOCAL // UNLOCKED'],
  },

  marseille: {
    header: 'GARE MARITIME // MARSEILLE',
    instruction: 'GUIDE LA VOITURE JUSQU’À SOURIS',
    hint: 'GLISSE LE DOIGT',
    waiting: 'SOURIS // EN ATTENTE',
    arrived: 'TAPE SUR LES DEUX POUR LES RÉUNIR',
    achievement: 'ACHIEVEMENT // PREMIER BAISER',
    stamp: 'MARSEILLE // 2014',
    discretion: 'DISCRÉTION // 0/100',
    hotel: 'FAST TRAVEL ACTIVÉ',
    calanques: 'CALANQUES // SESSION LIBRE',
  },

  distance: {
    header: 'LONG DISTANCE MODE',
    instruction: 'GARDE LE LIEN',
    hint: 'MAINTIENS LE DOIGT SUR LA LIGNE',
    warnings: ['SIGNAL INSTABLE', 'DISTANCE // HIGH', 'INTERFERENCES DETECTED'],
    lost: 'CONNECTION LOST',
    checking: 'CHECKING SAVE FILE…',
    found: ['SAVE FILE FOUND.', 'NOT DELETED.'],
    nodes: ['CORSE', 'LA GRANDE MOTTE', 'BRON', 'SUISSE'],
  },

  montpellier: {
    header: 'MONTPELLIER // CHAMBRE 4',
    ctaEnter: 'ENTRE',
    hr: 'HEART RATE // SUSPICIOUS',
    butterflies: 'BUTTERFLIES // TOO MANY',
    ctaApproach: 'S’APPROCHER',
    restored: ['CONNECTION RESTORED', 'COMPATIBILITY // 100%'],
    suitcaseHint: 'GLISSE LA VALISE',
    from: 'BEAUJOLAIS',
    to: 'LANSARGUES',
    home: ['HOME BASE FOUND', 'CO-OP MODE // ACTIVATED'],
  },

  party: {
    header: 'DEUX CAISSES À OUVRIR',
    hint: 'TAPE POUR OUVRIR',
    pirate: 'PIRATE JOINED THE PARTY',
    peewee: 'PEEWEE JOINED THE PARTY',
    size: 'PARTY SIZE // 4',
    note: 'Frère et sœur. Adoptés le même jour.',
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
    instruction: 'MÈNE LE KAYAK À LA GROTTE',
    hint: 'GLISSE POUR NAVIGUER',
    cave: 'GROTTE DES AMOUREUX',
    question: 'VEUX-TU M’ÉPOUSER ?',
    answers: ['OUI', 'OUI, ÉVIDEMMENT'],
    accepted: ['MAIN QUEST // ACCEPTED', 'BONIFACIO // 2021'],
  },

  propriano: {
    loading: 'LOADING WEDDING…',
    place: 'PROPRIANO',
    date: '27 AOÛT 2022',
    cta: 'DIRE OUI ENCORE UNE FOIS',
    unlocked: ['MARRIED MODE // UNLOCKED', 'CHAT + SOURIS // PARTY PERMANENT'],
    note: 'Premier couple à se marier ici, dans cette histoire de famille.',
  },

  carnon: {
    header: 'CURRENT BUILD // CARNON',
    hint: 'EXPLORE LA BASE',
    hotspots: [
      {
        id: 'desk-chat',
        label: 'BUREAU CHAT',
        title: 'TELEWORK // ONLINE',
        lines: ['18 ans chez Teleperformance', 'Résistance aux réunions // LEGENDARY'],
      },
      {
        id: 'desk-souris',
        label: 'BUREAU SOURIS',
        title: 'BUSINESS // RUNNING',
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
        label: 'FENÊTRE',
        title: 'HOME BASE // CARNON',
        lines: ['La mer, en face. Tous les jours.'],
      },
    ],
    status: ['CURRENT BUILD // STABLE', 'MOBILITY // IMPROVING', 'CO-OP STATUS // ACTIVE'],
    outro: ['Aujourd’hui, la partie devient enfin un peu plus légère.', 'Et elle est toujours meilleure en co-op.'],
    cta: 'CONTINUER',
  },

  camargue: {
    falseEnd: ['FIN DU CHAPITRE 55', 'MERCI D’AVOIR JOUÉ'],
    detected: 'SIGNAL DÉTECTÉ',
    locked: 'NEXT QUEST // ENCRYPTED',
    ctaDecrypt: 'DÉCRYPTER',
    puzzleInstruction: 'REMETS NOS QUATRE PREMIÈRES FOIS DANS L’ORDRE',
    puzzleHelp: 'INDICE ACTIVÉ',
    symbols: [
      { id: 'message', label: 'LE MESSAGE', year: '2014' },
      { id: 'ferry', label: 'LE FERRY', year: '2014' },
      { id: 'home', label: 'LA MAISON', year: 'LANSARGUES' },
      { id: 'ring', label: 'LA BAGUE', year: '2021' },
    ],
    decrypting: ['DECRYPTING NEXT QUEST…', 'SEARCHING DESTINATION…', 'TARGET FOUND.'],
    destination: 'CAMARGUE',
    ctaDate: 'VOIR LA DATE',
    tomorrow: 'DEMAIN.',
    dayName: 'DIMANCHE',
    dateFull: '30.08.2026',
    ctaWhat: 'MAIS ON FAIT QUOI ?',
    mission: ['MISSION :', 'NE RIEN FOUTRE.'],
    correction: 'Correction du système…',
    missionFixed: 'PROFITER.',
    missionNote: 'Toute la journée. À deux.',
    ctaProgram: 'VOIR LE PROGRAMME',
    programHint: 'TAPE POUR DÉBLOQUER',
    bonuses: [
      { code: 'BONUS 01', title: 'DÉJEUNER', desc: 'Dans un endroit paisible.', stat: 'ENERGY +100', icon: 'lunch' },
      { code: 'BONUS 02', title: 'COCKTAIL', desc: '', stat: 'CHILL MODE // ACTIVATED', icon: 'cocktail' },
      { code: 'BONUS 03', title: 'SPA', desc: 'Accès spa 1 h.', stat: 'STRESS −25', icon: 'spa' },
      { code: 'BONUS 04', title: 'PISCINE', desc: 'Accès piscine extérieure chauffée.', stat: 'TEMPÉRATURE // PARFAITE', icon: 'pool' },
      { code: 'BONUS 05', title: 'HAMMAM', desc: 'Accès hammam.', stat: 'VAPEUR // ON', icon: 'hammam' },
      { code: 'BONUS 06', title: 'BAIN À REMOUS', desc: 'Accès bain à remous intérieur.', stat: 'BULLES // ILLIMITÉES', icon: 'whirlpool' },
      { code: 'BONUS 07', title: 'SAUNA', desc: 'Accès sauna.', stat: 'RESET // COMPLET', icon: 'sauna' },
      { code: 'BONUS 08', title: 'SIÈGE MASSANT PRIVATIF', desc: '1 h.', stat: 'MODE CHAT // MAXIMUM', icon: 'massage' },
    ],
    recap: {
      title: 'CAMARGUE // 30.08.2026',
      rows: [
        ['PARTY SIZE', '2'],
        ['PLAYERS', 'CHAT + SOURIS'],
        ['OBJECTIF', 'PROFITER'],
        ['NIVEAU DE STRESS AUTORISÉ', '0%'],
      ],
      departLabel: 'DÉPART',
      cta: 'J’ACCEPTE LA QUÊTE',
    },
    patch: ['QUEST ACCEPTED', 'LEVEL 55 // LEGENDARY PLAYER', 'NEW ADVENTURE SCHEDULED', '30.08.2026'],
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
    catsNotif: 'PARTY MEMBERS COMPLAINING',
    catsLines: [
      { who: 'PIRATE', what: 'Et nous ?' },
      { who: 'PEEWEE', what: 'Vous rentrez à quelle heure ?' },
    ],
    catsCta: 'ON VERRA',
    catsRemember: 'Cats will remember that.',
    replay: 'REVOIR LE CHAPITRE',
  },

  ui: {
    skipHint: 'TAPE POUR CONTINUER',
    soundOn: 'SON ACTIVÉ',
    soundOff: 'SON COUPÉ',
    rotate: 'REMETS L’ÉCRAN EN PORTRAIT',
    rotateNote: 'Ce chapitre se joue à la verticale.',
    loading: 'CHARGEMENT…',
    autoHelp: 'AIDE AUTOMATIQUE',
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
