import { Question } from '@features/error-spotting/domain/models';

export const ERROR_SPOTTING_MOCK_DATA_B2: Question[] = [
  // --- Word Form (Derivación Morfológica) ---
  {
    id: 1,
    category: 'Word Form',
    full_sentence: 'The company announced a significant improve in its quarterly earnings this year.',
    options: [
      { label: 'A', text: 'announced' },
      { label: 'B', text: 'significant improve' },
      { label: 'C', text: 'quarterly earnings' },
      { label: 'D', text: 'this year' }
    ],
    correct_label: 'B',
    correction: 'significant improvement',
    explanation: 'Después de un adjetivo se necesita un sustantivo ("improvement"), no la forma verbal "improve".'
  },
  {
    id: 2,
    category: 'Word Form',
    full_sentence: 'Her analytical skills allowed her to solve the problem with remarkable ease and accurate.',
    options: [
      { label: 'A', text: 'analytical skills' },
      { label: 'B', text: 'allowed' },
      { label: 'C', text: 'remarkable ease' },
      { label: 'D', text: 'accurate' }
    ],
    correct_label: 'D',
    correction: 'accuracy',
    explanation: 'En una lista coordinada con "and" tras la preposición "with", ambos elementos deben ser sustantivos: "ease and accuracy".'
  },
  {
    id: 3,
    category: 'Word Form',
    full_sentence: 'The committee praised the architect for his creativity and technical precisely.',
    options: [
      { label: 'A', text: 'praised' },
      { label: 'B', text: 'creativity' },
      { label: 'C', text: 'technical precisely' },
      { label: 'D', text: 'architect' }
    ],
    correct_label: 'C',
    correction: 'technical precision',
    explanation: 'Se requiere un sustantivo paralelo a "creativity", por lo que debe ser "precision", no el adverbio "precisely".'
  },
  {
    id: 4,
    category: 'Word Form',
    full_sentence: 'The new policy had a beneficial affect on employee morale across all departments.',
    options: [
      { label: 'A', text: 'beneficial affect' },
      { label: 'B', text: 'employee morale' },
      { label: 'C', text: 'across' },
      { label: 'D', text: 'departments' }
    ],
    correct_label: 'A',
    correction: 'beneficial effect',
    explanation: '"Effect" (sustantivo, resultado) es lo correcto aquí; "affect" es normalmente un verbo.'
  },
  {
    id: 5,
    category: 'Word Form',
    full_sentence: 'The engineers worked with great efficient to complete the bridge ahead of schedule.',
    options: [
      { label: 'A', text: 'worked' },
      { label: 'B', text: 'great efficient' },
      { label: 'C', text: 'complete' },
      { label: 'D', text: 'ahead of schedule' }
    ],
    correct_label: 'B',
    correction: 'great efficiency',
    explanation: 'Tras la preposición "with" y el adjetivo "great" se necesita un sustantivo: "efficiency".'
  },

  // --- Reduced Participle Clauses ---
  {
    id: 6,
    category: 'Reduced Participle Clauses',
    full_sentence: 'Build in 1969, the library remains one of the most visited landmarks in the city.',
    options: [
      { label: 'A', text: 'Build in 1969' },
      { label: 'B', text: 'remains' },
      { label: 'C', text: 'most visited' },
      { label: 'D', text: 'in the city' }
    ],
    correct_label: 'A',
    correction: 'Built in 1969',
    explanation: 'La cláusula reducida pasiva requiere el participio pasado "Built", no la forma base "Build".'
  },
  {
    id: 7,
    category: 'Reduced Participle Clauses',
    full_sentence: 'Compared with last year\'s figures, the department showing remarkable growth in sales.',
    options: [
      { label: 'A', text: 'Compared with' },
      { label: 'B', text: "last year's figures" },
      { label: 'C', text: 'showing' },
      { label: 'D', text: 'remarkable growth' }
    ],
    correct_label: 'C',
    correction: 'shows',
    explanation: 'La cláusula reducida inicial ya está correctamente formada, pero la cláusula principal necesita un verbo conjugado ("shows"), no el gerundio "showing".'
  },
  {
    id: 8,
    category: 'Reduced Participle Clauses',
    full_sentence: 'Exhausting from the long journey, the travelers decided to rest at the nearest inn.',
    options: [
      { label: 'A', text: 'Exhausting' },
      { label: 'B', text: 'the long journey' },
      { label: 'C', text: 'decided to rest' },
      { label: 'D', text: 'nearest inn' }
    ],
    correct_label: 'A',
    correction: 'Exhausted',
    explanation: 'Los viajeros sienten el cansancio (voz pasiva/participio pasado), por lo que se necesita "Exhausted", no "Exhausting".'
  },
  {
    id: 9,
    category: 'Reduced Participle Clauses',
    full_sentence: 'Written by an anonymous author, the novel quickly become a bestseller worldwide.',
    options: [
      { label: 'A', text: 'Written by' },
      { label: 'B', text: 'anonymous author' },
      { label: 'C', text: 'quickly become' },
      { label: 'D', text: 'worldwide' }
    ],
    correct_label: 'C',
    correction: 'quickly became',
    explanation: 'El verbo principal debe concordar en tiempo pasado: "became", no la forma base "become".'
  },
  {
    id: 10,
    category: 'Reduced Participle Clauses',
    full_sentence: 'Locating near the city center, the hotel attracts many business travelers.',
    options: [
      { label: 'A', text: 'Locating near' },
      { label: 'B', text: 'the city center' },
      { label: 'C', text: 'attracts' },
      { label: 'D', text: 'business travelers' }
    ],
    correct_label: 'A',
    correction: 'Located near',
    explanation: 'El hotel recibe la acción de ubicar (voz pasiva), por lo que se necesita el participio pasado "Located".'
  },

  // --- Complex Relative Clauses ---
  {
    id: 11,
    category: 'Complex Relative Clauses',
    full_sentence: 'The scientist which discovered the compound was awarded a prestigious prize.',
    options: [
      { label: 'A', text: 'which discovered' },
      { label: 'B', text: 'the compound' },
      { label: 'C', text: 'was awarded' },
      { label: 'D', text: 'prestigious prize' }
    ],
    correct_label: 'A',
    correction: 'who discovered',
    explanation: 'Para referirse a personas se usa "who", no "which", que se reserva para cosas.'
  },
  {
    id: 12,
    category: 'Complex Relative Clauses',
    full_sentence: 'The report, which its conclusions were widely criticized, was later revised.',
    options: [
      { label: 'A', text: 'which its conclusions' },
      { label: 'B', text: 'widely criticized' },
      { label: 'C', text: 'was later' },
      { label: 'D', text: 'revised' }
    ],
    correct_label: 'A',
    correction: 'whose conclusions',
    explanation: 'Para indicar posesión se usa "whose", no "which its", que es redundante e incorrecto.'
  },
  {
    id: 13,
    category: 'Complex Relative Clauses',
    full_sentence: 'The employees who they missed the training session must reschedule immediately.',
    options: [
      { label: 'A', text: 'who they missed' },
      { label: 'B', text: 'training session' },
      { label: 'C', text: 'must reschedule' },
      { label: 'D', text: 'immediately' }
    ],
    correct_label: 'A',
    correction: 'who missed',
    explanation: '"Who" ya funciona como sujeto de la cláusula; añadir "they" crea una redundancia pronominal incorrecta.'
  },
  {
    id: 14,
    category: 'Complex Relative Clauses',
    full_sentence: 'The building, that was constructed in the 1920s, is now a protected heritage site.',
    options: [
      { label: 'A', text: 'that was constructed' },
      { label: 'B', text: 'in the 1920s' },
      { label: 'C', text: 'is now' },
      { label: 'D', text: 'heritage site' }
    ],
    correct_label: 'A',
    correction: 'which was constructed',
    explanation: 'En una cláusula no restrictiva (con comas), se usa "which", no "that", para referirse a cosas.'
  },
  {
    id: 15,
    category: 'Complex Relative Clauses',
    full_sentence: 'The manager to whom the complaint was addressed no longer works here.',
    options: [
      { label: 'A', text: 'to whom' },
      { label: 'B', text: 'was addressed' },
      { label: 'C', text: 'no longer' },
      { label: 'D', text: 'works here' }
    ],
    correct_label: 'A',
    correction: 'to whom',
    explanation: 'Esta oración es correcta; "to whom" es el uso apropiado tras una preposición para referirse a una persona.'
  },

  // --- Dependent Prepositions / Collocations ---
  {
    id: 16,
    category: 'Dependent Prepositions',
    full_sentence: 'The final decision depends of the results of the upcoming inspection.',
    options: [
      { label: 'A', text: 'final decision' },
      { label: 'B', text: 'depends of' },
      { label: 'C', text: 'results' },
      { label: 'D', text: 'upcoming inspection' }
    ],
    correct_label: 'B',
    correction: 'depends on',
    explanation: 'La colocación correcta es "depend on", no "depend of".'
  },
  {
    id: 17,
    category: 'Dependent Prepositions',
    full_sentence: 'This paragraph refers about the environmental impact of industrial farming practices.',
    options: [
      { label: 'A', text: 'refers about' },
      { label: 'B', text: 'environmental impact' },
      { label: 'C', text: 'industrial farming' },
      { label: 'D', text: 'practices' }
    ],
    correct_label: 'A',
    correction: 'refers to',
    explanation: 'El verbo "refer" se combina con la preposición "to", no "about".'
  },
  {
    id: 18,
    category: 'Dependent Prepositions',
    full_sentence: 'The mixture consists in three main chemical compounds found in nature.',
    options: [
      { label: 'A', text: 'mixture' },
      { label: 'B', text: 'consists in' },
      { label: 'C', text: 'chemical compounds' },
      { label: 'D', text: 'found in nature' }
    ],
    correct_label: 'B',
    correction: 'consists of',
    explanation: 'La colocación correcta es "consist of", no "consist in".'
  },
  {
    id: 19,
    category: 'Dependent Prepositions',
    full_sentence: 'The success of the campaign was consisted with the marketing team\'s predictions.',
    options: [
      { label: 'A', text: 'success' },
      { label: 'B', text: 'was consisted with' },
      { label: 'C', text: "marketing team's" },
      { label: 'D', text: 'predictions' }
    ],
    correct_label: 'B',
    correction: 'was consistent with',
    explanation: 'La forma correcta es el adjetivo "consistent with", no el verbo pasivo "was consisted with".'
  },
  {
    id: 20,
    category: 'Dependent Prepositions',
    full_sentence: 'Despite of the heavy rain, the outdoor concert proceeded as planned.',
    options: [
      { label: 'A', text: 'Despite of' },
      { label: 'B', text: 'heavy rain' },
      { label: 'C', text: 'proceeded' },
      { label: 'D', text: 'as planned' }
    ],
    correct_label: 'A',
    correction: 'Despite',
    explanation: '"Despite" nunca lleva "of"; para usar "of" se necesitaría "in spite of".'
  },

  // --- Countable / Uncountable Nouns (Advanced) ---
  {
    id: 21,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'The team has made a significant progress on the research project this semester.',
    options: [
      { label: 'A', text: 'has made' },
      { label: 'B', text: 'a significant progress' },
      { label: 'C', text: 'research project' },
      { label: 'D', text: 'this semester' }
    ],
    correct_label: 'B',
    correction: 'significant progress',
    explanation: '"Progress" es incontable; no puede llevar el artículo indefinido "a".'
  },
  {
    id: 22,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'She gathered a lot of informations before writing the final report.',
    options: [
      { label: 'A', text: 'gathered' },
      { label: 'B', text: 'a lot of informations' },
      { label: 'C', text: 'writing' },
      { label: 'D', text: 'final report' }
    ],
    correct_label: 'B',
    correction: 'a lot of information',
    explanation: '"Information" es incontable en inglés y no tiene forma plural.'
  },
  {
    id: 23,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'The researchers conducted several experiments to gather more evidences about the phenomenon.',
    options: [
      { label: 'A', text: 'conducted' },
      { label: 'B', text: 'gather' },
      { label: 'C', text: 'more evidences' },
      { label: 'D', text: 'phenomenon' }
    ],
    correct_label: 'C',
    correction: 'more evidence',
    explanation: '"Evidence" es incontable y no admite forma plural con "-s".'
  },
  {
    id: 24,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'The city council received a numerous complaints regarding the new parking regulations.',
    options: [
      { label: 'A', text: 'city council' },
      { label: 'B', text: 'a numerous complaints' },
      { label: 'C', text: 'regarding' },
      { label: 'D', text: 'parking regulations' }
    ],
    correct_label: 'B',
    correction: 'numerous complaints',
    explanation: '"Numerous" ya implica pluralidad; no debe usarse con el artículo indefinido "a".'
  },
  {
    id: 25,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'The professor gave us some useful advices on how to structure the thesis.',
    options: [
      { label: 'A', text: 'gave us' },
      { label: 'B', text: 'useful advices' },
      { label: 'C', text: 'structure' },
      { label: 'D', text: 'thesis' }
    ],
    correct_label: 'B',
    correction: 'useful advice',
    explanation: '"Advice" es incontable; no existe la forma plural "advices".'
  },

  // --- Inversion (Negative Adverbials) ---
  {
    id: 26,
    category: 'Inversion',
    full_sentence: 'Not until the final chapter the author reveals the true identity of the narrator.',
    options: [
      { label: 'A', text: 'Not until' },
      { label: 'B', text: 'the final chapter the author reveals' },
      { label: 'C', text: 'true identity' },
      { label: 'D', text: 'the narrator' }
    ],
    correct_label: 'B',
    correction: 'the final chapter does the author reveal',
    explanation: 'Tras un adverbio negativo inicial ("Not until") se requiere inversión: auxiliar + sujeto + verbo base ("does the author reveal").'
  },
  {
    id: 27,
    category: 'Inversion',
    full_sentence: 'Rarely the committee approves a proposal without requesting additional revisions.',
    options: [
      { label: 'A', text: 'Rarely the committee approves' },
      { label: 'B', text: 'a proposal' },
      { label: 'C', text: 'without requesting' },
      { label: 'D', text: 'additional revisions' }
    ],
    correct_label: 'A',
    correction: 'Rarely does the committee approve',
    explanation: '"Rarely" al inicio de la oración exige inversión con el auxiliar "does": "does the committee approve".'
  },
  {
    id: 28,
    category: 'Inversion',
    full_sentence: 'Only recently the researchers have discovered the true cause of the disease.',
    options: [
      { label: 'A', text: 'Only recently the researchers have discovered' },
      { label: 'B', text: 'true cause' },
      { label: 'C', text: 'the disease' },
      { label: 'D', text: 'discovered' }
    ],
    correct_label: 'A',
    correction: 'Only recently have the researchers discovered',
    explanation: '"Only recently" requiere inversión sujeto-auxiliar: "have the researchers discovered".'
  },
  {
    id: 29,
    category: 'Inversion',
    full_sentence: 'Hardly the meeting had begun when the fire alarm went off unexpectedly.',
    options: [
      { label: 'A', text: 'Hardly the meeting had begun' },
      { label: 'B', text: 'when' },
      { label: 'C', text: 'went off' },
      { label: 'D', text: 'unexpectedly' }
    ],
    correct_label: 'A',
    correction: 'Hardly had the meeting begun',
    explanation: '"Hardly" al inicio de la oración exige inversión: "had the meeting begun".'
  },
  {
    id: 30,
    category: 'Inversion',
    full_sentence: 'Not only the company increased its revenue, but it also expanded into new markets.',
    options: [
      { label: 'A', text: 'Not only the company increased' },
      { label: 'B', text: 'its revenue' },
      { label: 'C', text: 'but it also expanded' },
      { label: 'D', text: 'new markets' }
    ],
    correct_label: 'A',
    correction: 'Not only did the company increase',
    explanation: '"Not only" al inicio de la oración requiere inversión: "did the company increase".'
  }
];