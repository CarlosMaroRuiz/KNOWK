import { Question } from '@features/error-spotting/domain/models';

export const ERROR_SPOTTING_MOCK_DATA: Question[] = [
  {
    id: 1,
    category: 'Parallel Structure',
    full_sentence: 'The director is responsible for planning the event, managing the budget, and to direct the team.',
    options: [
      { label: 'A', text: 'is responsible' },
      { label: 'B', text: 'planning' },
      { label: 'C', text: 'managing' },
      { label: 'D', text: 'to direct' }
    ],
    correct_label: 'D',
    correction: 'directing',
    explanation: 'Los elementos en una lista precedidos por una preposición deben mantener la misma forma gramatical (-ing).'
  },
  {
    id: 2,
    category: 'Subject-Verb Agreement',
    full_sentence: 'The list of upcoming academic workshops were posted on the bulletin board.',
    options: [
      { label: 'A', text: 'of' },
      { label: 'B', text: 'academic' },
      { label: 'C', text: 'were' },
      { label: 'D', text: 'bulletin' }
    ],
    correct_label: 'C',
    correction: 'was',
    explanation: 'El sujeto principal es "The list" (singular), por lo que requiere el verbo "was" en lugar de "were".'
  },
  {
    id: 3,
    category: 'Adjective vs Adverb',
    full_sentence: 'The new software system operates efficient during peak hours.',
    options: [
      { label: 'A', text: 'software' },
      { label: 'B', text: 'operates' },
      { label: 'C', text: 'efficient' },
      { label: 'D', text: 'peak' }
    ],
    correct_label: 'C',
    correction: 'efficiently',
    explanation: 'Se necesita un adverbio ("efficiently") para modificar al verbo "operates", no un adjetivo.'
  },
  {
    id: 4,
    category: 'Pronoun Agreement',
    full_sentence: 'Each of the students must submit their assignment before the deadline.',
    options: [
      { label: 'A', text: 'Each' },
      { label: 'B', text: 'must submit' },
      { label: 'C', text: 'their' },
      { label: 'D', text: 'deadline' }
    ],
    correct_label: 'C',
    correction: 'his or her',
    explanation: '"Each" es singular, por lo que el pronombre que lo reemplaza debe ser singular ("his or her"), no "their".'
  },
  {
    id: 5,
    category: 'Verb Tense',
    full_sentence: 'By the time the manager arrived, the meeting already started.',
    options: [
      { label: 'A', text: 'By the time' },
      { label: 'B', text: 'arrived' },
      { label: 'C', text: 'already' },
      { label: 'D', text: 'started' }
    ],
    correct_label: 'D',
    correction: 'had already started',
    explanation: 'Cuando una acción pasada ocurre antes de otra acción pasada, la primera debe usar el pasado perfecto ("had started").'
  },
  {
    id: 6,
    category: 'Article Usage',
    full_sentence: 'She has an unique perspective on modern art that few critics share.',
    options: [
      { label: 'A', text: 'an unique' },
      { label: 'B', text: 'perspective' },
      { label: 'C', text: 'modern' },
      { label: 'D', text: 'few' }
    ],
    correct_label: 'A',
    correction: 'a unique',
    explanation: '"Unique" comienza con sonido consonántico /j/, por lo que le corresponde el artículo "a", no "an".'
  },
  {
    id: 7,
    category: 'Preposition Usage',
    full_sentence: 'The committee is responsible of reviewing all financial reports each quarter.',
    options: [
      { label: 'A', text: 'is responsible of' },
      { label: 'B', text: 'reviewing' },
      { label: 'C', text: 'financial' },
      { label: 'D', text: 'each quarter' }
    ],
    correct_label: 'A',
    correction: 'is responsible for',
    explanation: 'La expresión correcta es "responsible for", no "responsible of".'
  },
  {
    id: 8,
    category: 'Comparative/Superlative',
    full_sentence: 'Of the two candidates, she is by far the most qualified for the position.',
    options: [
      { label: 'A', text: 'Of the two' },
      { label: 'B', text: 'by far' },
      { label: 'C', text: 'the most qualified' },
      { label: 'D', text: 'position' }
    ],
    correct_label: 'C',
    correction: 'the more qualified',
    explanation: 'Cuando se comparan solo dos elementos, se usa el comparativo ("more qualified"), no el superlativo ("most qualified").'
  },
  {
    id: 9,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'There are less opportunities for growth in a saturated market than in an emerging one.',
    options: [
      { label: 'A', text: 'less' },
      { label: 'B', text: 'opportunities' },
      { label: 'C', text: 'saturated' },
      { label: 'D', text: 'emerging' }
    ],
    correct_label: 'A',
    correction: 'fewer',
    explanation: '"Opportunities" es un sustantivo contable en plural, por lo que corresponde usar "fewer" en vez de "less".'
  },
  {
    id: 10,
    category: 'Gerund vs Infinitive',
    full_sentence: 'The company avoided to lose money by cutting unnecessary expenses early in the year.',
    options: [
      { label: 'A', text: 'avoided to lose' },
      { label: 'B', text: 'cutting' },
      { label: 'C', text: 'unnecessary' },
      { label: 'D', text: 'early' }
    ],
    correct_label: 'A',
    correction: 'avoided losing',
    explanation: 'El verbo "avoid" siempre va seguido de gerundio ("avoid losing"), nunca de infinitivo.'
  },
  {
    id: 11,
    category: 'Word Form',
    full_sentence: 'The professor gave a very informative lecture about the economical impact of climate change.',
    options: [
      { label: 'A', text: 'informative' },
      { label: 'B', text: 'lecture' },
      { label: 'C', text: 'economical' },
      { label: 'D', text: 'impact' }
    ],
    correct_label: 'C',
    correction: 'economic',
    explanation: '"Economic" se refiere a la economía en general; "economical" significa "ahorrativo". Aquí se necesita "economic".'
  },
  {
    id: 12,
    category: 'Redundancy',
    full_sentence: 'The two twin buildings were designed by the same architect in the early 1990s.',
    options: [
      { label: 'A', text: 'two twin' },
      { label: 'B', text: 'were designed' },
      { label: 'C', text: 'same' },
      { label: 'D', text: 'early' }
    ],
    correct_label: 'A',
    correction: 'twin',
    explanation: '"Twin" ya implica dos elementos, por lo que agregar "two" es redundante.'
  },
  {
    id: 13,
    category: 'Conditional Sentences',
    full_sentence: 'If the company would have invested earlier, it would have avoided the loss.',
    options: [
      { label: 'A', text: 'If' },
      { label: 'B', text: 'would have invested' },
      { label: 'C', text: 'would have avoided' },
      { label: 'D', text: 'the loss' }
    ],
    correct_label: 'B',
    correction: 'had invested',
    explanation: 'En condicionales de tercer tipo, la cláusula con "if" usa pasado perfecto ("had invested"), no "would have".'
  },
  {
    id: 14,
    category: 'Passive Voice',
    full_sentence: 'The report will be finish by the end of the week, according to the supervisor.',
    options: [
      { label: 'A', text: 'will be finish' },
      { label: 'B', text: 'by the end' },
      { label: 'C', text: 'according to' },
      { label: 'D', text: 'supervisor' }
    ],
    correct_label: 'A',
    correction: 'will be finished',
    explanation: 'La voz pasiva requiere el participio pasado ("finished"), no la forma base del verbo.'
  },
  {
    id: 15,
    category: 'Relative Clauses',
    full_sentence: 'The engineer whom designed the bridge received an award for innovation.',
    options: [
      { label: 'A', text: 'whom' },
      { label: 'B', text: 'designed' },
      { label: 'C', text: 'received' },
      { label: 'D', text: 'innovation' }
    ],
    correct_label: 'A',
    correction: 'who',
    explanation: '"Who" funciona como sujeto del verbo "designed"; "whom" se usa como objeto, por lo que aquí es incorrecto.'
  },
  {
    id: 16,
    category: 'Quantifiers',
    full_sentence: 'Much of the employees expressed concern about the new policy during the meeting.',
    options: [
      { label: 'A', text: 'Much' },
      { label: 'B', text: 'expressed' },
      { label: 'C', text: 'new policy' },
      { label: 'D', text: 'during' }
    ],
    correct_label: 'A',
    correction: 'Many',
    explanation: '"Employees" es contable en plural, por lo que se necesita "Many" en lugar de "Much".'
  },
  {
    id: 17,
    category: 'Double Negatives',
    full_sentence: 'The researchers could not hardly find any evidence to support the hypothesis.',
    options: [
      { label: 'A', text: 'could not hardly' },
      { label: 'B', text: 'find' },
      { label: 'C', text: 'evidence' },
      { label: 'D', text: 'hypothesis' }
    ],
    correct_label: 'A',
    correction: 'could hardly',
    explanation: '"Hardly" ya tiene sentido negativo, por lo que combinarlo con "not" crea una doble negación incorrecta.'
  },
  {
    id: 18,
    category: 'Faulty Comparison',
    full_sentence: 'The climate in the coastal city is milder than the mountain city.',
    options: [
      { label: 'A', text: 'climate' },
      { label: 'B', text: 'coastal city' },
      { label: 'C', text: 'milder than' },
      { label: 'D', text: 'the mountain city' }
    ],
    correct_label: 'D',
    correction: 'that of the mountain city',
    explanation: 'Se debe comparar "climate" con "the climate", no con "the mountain city"; se necesita "that of" para mantener el paralelismo lógico.'
  },
  {
    id: 19,
    category: 'Dangling Modifier',
    full_sentence: 'Walking through the old district, the ancient buildings impressed the tourists greatly.',
    options: [
      { label: 'A', text: 'Walking through' },
      { label: 'B', text: 'the ancient buildings' },
      { label: 'C', text: 'impressed' },
      { label: 'D', text: 'greatly' }
    ],
    correct_label: 'B',
    correction: 'the tourists were impressed by the ancient buildings',
    explanation: 'El sujeto de la frase introductoria ("Walking through...") debe ser quien realiza la acción; aquí el sujeto lógico es "the tourists", no "the buildings".'
  },
  {
    id: 20,
    category: 'Subject-Verb Agreement',
    full_sentence: 'Neither the manager nor the employees was aware of the upcoming changes.',
    options: [
      { label: 'A', text: 'Neither' },
      { label: 'B', text: 'was' },
      { label: 'C', text: 'aware' },
      { label: 'D', text: 'upcoming' }
    ],
    correct_label: 'B',
    correction: 'were',
    explanation: 'Con "neither...nor", el verbo concuerda con el sujeto más cercano ("the employees", plural), por lo que debe ser "were".'
  },
  {
    id: 21,
    category: 'Parallel Structure',
    full_sentence: 'The seminar focuses on improving communication, building trust, and how to resolve conflict.',
    options: [
      { label: 'A', text: 'focuses on' },
      { label: 'B', text: 'improving' },
      { label: 'C', text: 'building' },
      { label: 'D', text: 'how to resolve' }
    ],
    correct_label: 'D',
    correction: 'resolving',
    explanation: 'Para mantener el paralelismo con "improving" y "building", el tercer elemento debe ser un gerundio: "resolving".'
  },
  {
    id: 22,
    category: 'Adjective vs Adverb',
    full_sentence: 'The negotiation team behaved professional throughout the entire discussion.',
    options: [
      { label: 'A', text: 'negotiation' },
      { label: 'B', text: 'behaved' },
      { label: 'C', text: 'professional' },
      { label: 'D', text: 'entire' }
    ],
    correct_label: 'C',
    correction: 'professionally',
    explanation: 'El verbo "behaved" necesita ser modificado por un adverbio ("professionally"), no por un adjetivo.'
  },
  {
    id: 23,
    category: 'Word Form',
    full_sentence: 'The scientist made an important discover about the effects of ocean acidification.',
    options: [
      { label: 'A', text: 'important' },
      { label: 'B', text: 'discover' },
      { label: 'C', text: 'effects' },
      { label: 'D', text: 'acidification' }
    ],
    correct_label: 'B',
    correction: 'discovery',
    explanation: 'Después de un artículo y un adjetivo se necesita un sustantivo ("discovery"), no la forma verbal "discover".'
  },
  {
    id: 24,
    category: 'Verb Tense',
    full_sentence: 'Scientists have discovered the new species while they were exploring the rainforest last year.',
    options: [
      { label: 'A', text: 'have discovered' },
      { label: 'B', text: 'while' },
      { label: 'C', text: 'were exploring' },
      { label: 'D', text: 'last year' }
    ],
    correct_label: 'A',
    correction: 'discovered',
    explanation: 'Al haber una referencia de tiempo específica en pasado ("last year"), debe usarse el pasado simple, no el presente perfecto.'
  },
  {
    id: 25,
    category: 'Preposition Usage',
    full_sentence: "The results of the experiment were consistent to the researcher's initial predictions.",
    options: [
      { label: 'A', text: 'results' },
      { label: 'B', text: 'were consistent to' },
      { label: 'C', text: 'initial' },
      { label: 'D', text: 'predictions' }
    ],
    correct_label: 'B',
    correction: 'were consistent with',
    explanation: 'La expresión correcta en inglés es "consistent with", no "consistent to".'
  },
  {
    id: 26,
    category: 'Countable/Uncountable Nouns',
    full_sentence: 'She gave us several advices about how to prepare for the technical interview.',
    options: [
      { label: 'A', text: 'several advices' },
      { label: 'B', text: 'about' },
      { label: 'C', text: 'prepare' },
      { label: 'D', text: 'technical' }
    ],
    correct_label: 'A',
    correction: 'several pieces of advice',
    explanation: '"Advice" es incontable en inglés y no tiene forma plural; se necesita "pieces of advice" o simplemente "advice".'
  },
  {
    id: 27,
    category: 'Gerund vs Infinitive',
    full_sentence: 'The manager suggested to postpone the launch until the testing phase was complete.',
    options: [
      { label: 'A', text: 'suggested to postpone' },
      { label: 'B', text: 'launch' },
      { label: 'C', text: 'testing phase' },
      { label: 'D', text: 'complete' }
    ],
    correct_label: 'A',
    correction: 'suggested postponing',
    explanation: 'El verbo "suggest" va seguido de gerundio ("suggest postponing"), no de infinitivo.'
  },
  {
    id: 28,
    category: 'Pronoun Agreement',
    full_sentence: 'If a customer has a complaint, they should fill out this specific form immediately.',
    options: [
      { label: 'A', text: 'a customer' },
      { label: 'B', text: 'they' },
      { label: 'C', text: 'this specific' },
      { label: 'D', text: 'immediately' }
    ],
    correct_label: 'B',
    correction: 'he or she',
    explanation: '"A customer" es singular, por lo que el pronombre correspondiente en un registro formal debe ser "he or she", no "they".'
  },
  {
    id: 29,
    category: 'Comparative/Superlative',
    full_sentence: 'This is the most efficientest method the team has developed so far.',
    options: [
      { label: 'A', text: 'the most efficientest' },
      { label: 'B', text: 'method' },
      { label: 'C', text: 'has developed' },
      { label: 'D', text: 'so far' }
    ],
    correct_label: 'A',
    correction: 'the most efficient',
    explanation: 'No se puede combinar "most" con la terminación "-est"; el superlativo correcto es "the most efficient".'
  },
  {
    id: 30,
    category: 'Subject-Verb Agreement',
    full_sentence: 'Statistics show that the number of students enrolling in online courses have increased significantly.',
    options: [
      { label: 'A', text: 'Statistics show' },
      { label: 'B', text: 'the number of' },
      { label: 'C', text: 'have increased' },
      { label: 'D', text: 'significantly' }
    ],
    correct_label: 'C',
    correction: 'has increased',
    explanation: '"The number of" funciona como sujeto singular, por lo que el verbo debe ser "has increased", no "have increased".'
  }
];