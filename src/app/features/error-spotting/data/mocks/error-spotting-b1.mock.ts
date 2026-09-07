import { Question } from '@features/error-spotting/domain/models';

export const ERROR_SPOTTING_MOCK_DATA_B1: Question[] = [
  // --- Passive Voice ---
  {
    id: 1,
    category: 'Passive Voice',
    full_sentence: 'The new policy was implement without prior notice to the staff members.',
    options: [
      { label: 'A', text: 'was implement' },
      { label: 'B', text: 'without' },
      { label: 'C', text: 'prior notice' },
      { label: 'D', text: 'staff members' }
    ],
    correct_label: 'A',
    correction: 'was implemented',
    explanation: 'La voz pasiva requiere be + participio pasado ("implemented"), no la forma base del verbo.'
  },
  {
    id: 2,
    category: 'Passive Voice',
    full_sentence: 'The bridge is being repair by a team of engineers this month.',
    options: [
      { label: 'A', text: 'is being repair' },
      { label: 'B', text: 'by a team' },
      { label: 'C', text: 'engineers' },
      { label: 'D', text: 'this month' }
    ],
    correct_label: 'A',
    correction: 'is being repaired',
    explanation: 'En la pasiva progresiva ("is being + participio"), se necesita "repaired", no "repair".'
  },
  {
    id: 3,
    category: 'Passive Voice',
    full_sentence: 'The documents were signing by the director before the meeting started.',
    options: [
      { label: 'A', text: 'were signing' },
      { label: 'B', text: 'by the director' },
      { label: 'C', text: 'before' },
      { label: 'D', text: 'started' }
    ],
    correct_label: 'A',
    correction: 'were signed',
    explanation: 'El sujeto "documents" recibe la acción, por lo que se requiere voz pasiva ("were signed"), no "were signing".'
  },
  {
    id: 4,
    category: 'Passive Voice',
    full_sentence: 'The proposal has been reject by the committee due to budget constraints.',
    options: [
      { label: 'A', text: 'has been reject' },
      { label: 'B', text: 'committee' },
      { label: 'C', text: 'due to' },
      { label: 'D', text: 'constraints' }
    ],
    correct_label: 'A',
    correction: 'has been rejected',
    explanation: 'La pasiva perfecta requiere participio pasado completo ("has been rejected").'
  },
  {
    id: 5,
    category: 'Passive Voice',
    full_sentence: 'The new regulations will enforced starting next month.',
    options: [
      { label: 'A', text: 'regulations' },
      { label: 'B', text: 'will enforced' },
      { label: 'C', text: 'starting' },
      { label: 'D', text: 'next month' }
    ],
    correct_label: 'B',
    correction: 'will be enforced',
    explanation: 'Falta el auxiliar "be" en la pasiva futura: debe ser "will be enforced".'
  },
  {
    id: 6,
    category: 'Passive Voice',
    full_sentence: 'The award was give to the student who worked hardest during the semester.',
    options: [
      { label: 'A', text: 'was give' },
      { label: 'B', text: 'to the student' },
      { label: 'C', text: 'worked hardest' },
      { label: 'D', text: 'during the semester' }
    ],
    correct_label: 'A',
    correction: 'was given',
    explanation: 'El participio pasado de "give" es "given"; la pasiva requiere esta forma, no la base del verbo.'
  },

  // --- Subject-Verb Agreement (Intervening Phrases) ---
  {
    id: 7,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The manager, along with her assistants, are reviewing the quarterly report.',
    options: [
      { label: 'A', text: 'The manager' },
      { label: 'B', text: 'along with her assistants' },
      { label: 'C', text: 'are reviewing' },
      { label: 'D', text: 'quarterly report' }
    ],
    correct_label: 'C',
    correction: 'is reviewing',
    explanation: 'El sujeto principal es "The manager" (singular); la frase "along with..." no cambia el número del verbo.'
  },
  {
    id: 8,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The results of the survey, together with additional data, has been published online.',
    options: [
      { label: 'A', text: 'The results' },
      { label: 'B', text: 'together with' },
      { label: 'C', text: 'has been published' },
      { label: 'D', text: 'online' }
    ],
    correct_label: 'C',
    correction: 'have been published',
    explanation: 'El sujeto principal "results" es plural, por lo que el verbo debe ser "have been published".'
  },
  {
    id: 9,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The committee, as well as the board members, meet every Thursday to discuss policy changes.',
    options: [
      { label: 'A', text: 'The committee' },
      { label: 'B', text: 'as well as the board members' },
      { label: 'C', text: 'meet' },
      { label: 'D', text: 'every Thursday' }
    ],
    correct_label: 'C',
    correction: 'meets',
    explanation: '"The committee" es singular; "as well as" no altera el número gramatical del sujeto, así que el verbo debe ser "meets".'
  },
  {
    id: 10,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The box of old photographs, covered in dust, were found in the attic.',
    options: [
      { label: 'A', text: 'The box' },
      { label: 'B', text: 'covered in dust' },
      { label: 'C', text: 'were found' },
      { label: 'D', text: 'in the attic' }
    ],
    correct_label: 'C',
    correction: 'was found',
    explanation: 'El sujeto es "The box" (singular); la frase intermedia "covered in dust" no cambia esto, por lo que se necesita "was found".'
  },
  {
    id: 11,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The teacher, along with her students, were preparing the classroom for the science fair.',
    options: [
      { label: 'A', text: 'The teacher' },
      { label: 'B', text: 'along with her students' },
      { label: 'C', text: 'were preparing' },
      { label: 'D', text: 'science fair' }
    ],
    correct_label: 'C',
    correction: 'was preparing',
    explanation: 'El sujeto principal "The teacher" es singular; el verbo correcto es "was preparing".'
  },
  {
    id: 12,
    category: 'Subject-Verb Agreement (Intervening Phrases)',
    full_sentence: 'The list of requirements, despite several revisions, remain unclear to new employees.',
    options: [
      { label: 'A', text: 'The list' },
      { label: 'B', text: 'despite several revisions' },
      { label: 'C', text: 'remain' },
      { label: 'D', text: 'new employees' }
    ],
    correct_label: 'C',
    correction: 'remains',
    explanation: 'El sujeto principal es "The list" (singular), por lo que el verbo debe ser "remains".'
  },

  // --- Expletive Structures (there is/are, it is) ---
  {
    id: 13,
    category: 'Expletive Structures',
    full_sentence: 'There is several reasons why the project was delayed last quarter.',
    options: [
      { label: 'A', text: 'There is' },
      { label: 'B', text: 'several reasons' },
      { label: 'C', text: 'was delayed' },
      { label: 'D', text: 'last quarter' }
    ],
    correct_label: 'A',
    correction: 'There are',
    explanation: '"Reasons" es plural, por lo que la estructura expletiva correcta es "There are".'
  },
  {
    id: 14,
    category: 'Expletive Structures',
    full_sentence: 'It are important to submit the application before the deadline.',
    options: [
      { label: 'A', text: 'It are' },
      { label: 'B', text: 'important' },
      { label: 'C', text: 'submit' },
      { label: 'D', text: 'before the deadline' }
    ],
    correct_label: 'A',
    correction: 'It is',
    explanation: 'El sujeto expletivo "it" siempre concuerda con el verbo en singular: "It is".'
  },
  {
    id: 15,
    category: 'Expletive Structures',
    full_sentence: 'There was many students waiting outside the auditorium for the results.',
    options: [
      { label: 'A', text: 'There was' },
      { label: 'B', text: 'many students' },
      { label: 'C', text: 'waiting' },
      { label: 'D', text: 'for the results' }
    ],
    correct_label: 'A',
    correction: 'There were',
    explanation: 'El sujeto lógico "many students" es plural, así que se requiere "There were".'
  },
  {
    id: 16,
    category: 'Expletive Structures',
    full_sentence: 'There is a lot of opportunities for growth in this new department.',
    options: [
      { label: 'A', text: 'There is' },
      { label: 'B', text: 'a lot of opportunities' },
      { label: 'C', text: 'for growth' },
      { label: 'D', text: 'this new department' }
    ],
    correct_label: 'A',
    correction: 'There are',
    explanation: '"Opportunities" es plural, por lo que corresponde "There are", no "There is".'
  },
  {
    id: 17,
    category: 'Expletive Structures',
    full_sentence: 'It essential that every employee should attend the training session next week.',
    options: [
      { label: 'A', text: 'It essential' },
      { label: 'B', text: 'should attend' },
      { label: 'C', text: 'training session' },
      { label: 'D', text: 'next week' }
    ],
    correct_label: 'A',
    correction: 'It is essential',
    explanation: 'Falta el verbo "is" en la estructura expletiva; debe ser "It is essential".'
  },
  {
    id: 18,
    category: 'Expletive Structures',
    full_sentence: 'There exists many theories about the origin of the universe among scientists.',
    options: [
      { label: 'A', text: 'There exists' },
      { label: 'B', text: 'many theories' },
      { label: 'C', text: 'origin' },
      { label: 'D', text: 'among scientists' }
    ],
    correct_label: 'A',
    correction: 'There exist',
    explanation: 'El sujeto lógico "many theories" es plural, por lo que el verbo debe concordar: "There exist".'
  },

  // --- Infinitive / Gerund Objects ---
  {
    id: 19,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'She decided joining the new committee after careful consideration.',
    options: [
      { label: 'A', text: 'She decided' },
      { label: 'B', text: 'joining' },
      { label: 'C', text: 'after careful' },
      { label: 'D', text: 'consideration' }
    ],
    correct_label: 'B',
    correction: 'to join',
    explanation: 'El verbo "decide" siempre va seguido de infinitivo ("decided to join"), no de gerundio.'
  },
  {
    id: 20,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'The teacher encouraged the students study harder for the final exam.',
    options: [
      { label: 'A', text: 'encouraged' },
      { label: 'B', text: 'the students' },
      { label: 'C', text: 'study' },
      { label: 'D', text: 'final exam' }
    ],
    correct_label: 'C',
    correction: 'to study',
    explanation: '"Encourage" requiere objeto + infinitivo: "encouraged the students to study".'
  },
  {
    id: 21,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'He finished to write the report before the deadline.',
    options: [
      { label: 'A', text: 'He finished' },
      { label: 'B', text: 'to write' },
      { label: 'C', text: 'before' },
      { label: 'D', text: 'the deadline' }
    ],
    correct_label: 'B',
    correction: 'writing',
    explanation: 'El verbo "finish" siempre va seguido de gerundio ("finished writing"), nunca de infinitivo.'
  },
  {
    id: 22,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'They postponed to launch the product until next quarter.',
    options: [
      { label: 'A', text: 'They postponed' },
      { label: 'B', text: 'to launch' },
      { label: 'C', text: 'the product' },
      { label: 'D', text: 'next quarter' }
    ],
    correct_label: 'B',
    correction: 'launching',
    explanation: '"Postpone" requiere gerundio ("postponed launching"), no infinitivo.'
  },
  {
    id: 23,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'The manager insisted to review every document personally.',
    options: [
      { label: 'A', text: 'insisted' },
      { label: 'B', text: 'to review' },
      { label: 'C', text: 'every document' },
      { label: 'D', text: 'personally' }
    ],
    correct_label: 'B',
    correction: 'on reviewing',
    explanation: '"Insist" se combina con "on" + gerundio ("insisted on reviewing"), no con infinitivo.'
  },
  {
    id: 24,
    category: 'Infinitive/Gerund Objects',
    full_sentence: 'She denied to take the missing files from the office.',
    options: [
      { label: 'A', text: 'She denied' },
      { label: 'B', text: 'to take' },
      { label: 'C', text: 'missing files' },
      { label: 'D', text: 'from the office' }
    ],
    correct_label: 'B',
    correction: 'taking',
    explanation: 'El verbo "deny" requiere gerundio ("denied taking"), no infinitivo.'
  },

  // --- Clause Connectors ---
  {
    id: 25,
    category: 'Clause Connectors',
    full_sentence: 'Although the weather was terrible, but the game continued as scheduled.',
    options: [
      { label: 'A', text: 'Although' },
      { label: 'B', text: 'was terrible' },
      { label: 'C', text: 'but the game' },
      { label: 'D', text: 'as scheduled' }
    ],
    correct_label: 'C',
    correction: 'the game',
    explanation: 'No se puede usar "although" y "but" juntos para conectar las mismas cláusulas; uno de los dos sobra.'
  },
  {
    id: 26,
    category: 'Clause Connectors',
    full_sentence: 'Since the manager was busy, so the meeting was postponed until Friday.',
    options: [
      { label: 'A', text: 'Since' },
      { label: 'B', text: 'was busy' },
      { label: 'C', text: 'so the meeting' },
      { label: 'D', text: 'until Friday' }
    ],
    correct_label: 'C',
    correction: 'the meeting',
    explanation: '"Since" ya conecta ambas cláusulas; agregar "so" es redundante y gramaticalmente incorrecto.'
  },
  {
    id: 27,
    category: 'Clause Connectors',
    full_sentence: 'Before the workshop begins, participants must to register at the front desk.',
    options: [
      { label: 'A', text: 'Before the workshop' },
      { label: 'B', text: 'begins' },
      { label: 'C', text: 'must to register' },
      { label: 'D', text: 'front desk' }
    ],
    correct_label: 'C',
    correction: 'must register',
    explanation: 'El modal "must" va seguido del verbo en forma base, sin "to": "must register".'
  },
  {
    id: 28,
    category: 'Clause Connectors',
    full_sentence: 'If the company will invest more in training, employees will perform better.',
    options: [
      { label: 'A', text: 'If the company' },
      { label: 'B', text: 'will invest' },
      { label: 'C', text: 'employees' },
      { label: 'D', text: 'will perform' }
    ],
    correct_label: 'B',
    correction: 'invests',
    explanation: 'En el condicional tipo 1, la cláusula con "if" usa presente simple, no "will": "invests".'
  },
  {
    id: 29,
    category: 'Clause Connectors',
    full_sentence: 'After the report finished, the team started to celebrate their achievement.',
    options: [
      { label: 'A', text: 'After the report' },
      { label: 'B', text: 'finished' },
      { label: 'C', text: 'started to celebrate' },
      { label: 'D', text: 'achievement' }
    ],
    correct_label: 'B',
    correction: 'was finished',
    explanation: 'El "report" recibe la acción de terminar, por lo que se necesita la voz pasiva: "was finished".'
  },
  {
    id: 30,
    category: 'Clause Connectors',
    full_sentence: 'Because of the traffic was heavy, we arrived late to the conference.',
    options: [
      { label: 'A', text: 'Because of' },
      { label: 'B', text: 'was heavy' },
      { label: 'C', text: 'we arrived' },
      { label: 'D', text: 'to the conference' }
    ],
    correct_label: 'A',
    correction: 'Because',
    explanation: '"Because of" va seguido de un sustantivo, no de una cláusula completa (sujeto + verbo); aquí se necesita "Because".'
  }
];