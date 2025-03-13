import type { Question } from '@/types/survey';

export const questionsAdditional: Question[] = [
  // Pytania dla relacji jednopłciowych męskich
  { 
    id: 'mm-pos1', 
    text: 'Pozycja misjonarska',
    description: "Klasyczna pozycja twarzą w twarz, jeden partner na górze",
    illustration: '/images/illustrations/techniques/missionary-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos2', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację",
    illustration: '/images/illustrations/techniques/doggy.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'mm-pos3', 
    text: 'Pozycja "łyżeczki"',
    description: "Obaj partnerzy leżą na boku, jeden za drugim",
    illustration: '/images/illustrations/techniques/spoon-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos4', 
    text: 'Pozycja "jeździec"',
    description: "Jeden partner siedzi na drugim twarzą do twarzy",
    illustration: '/images/illustrations/techniques/rider-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos5', 
    text: 'Pozycja "odwrócony jeździec"',
    description: "Jeden partner siedzi na drugim tyłem do twarzy",
    illustration: '/images/illustrations/techniques/reverse-rider-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos6', 
    text: 'Pozycja "bokiem z bliskim kontaktem"',
    description: "Obaj partnerzy leżą na boku twarzą do siebie",
    illustration: '/images/illustrations/techniques/side-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos7', 
    text: 'Pozycja "na brzuchu"',
    description: "Jeden partner leży płasko na brzuchu, drugi wchodzi od tyłu",
    illustration: '/images/illustrations/techniques/prone-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos8', 
    text: 'Pozycja "na sofie"',
    description: "Jeden partner siedzi na sofie, drugi na nim",
    illustration: '/images/illustrations/techniques/sofa-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos9', 
    text: 'Pozycja "twarzą w twarz, siedząc"',
    description: "Obaj partnerzy siedzą twarzą do siebie",
    illustration: '/images/illustrations/techniques/face-to-face-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos10', 
    text: 'Pozycja "69"',
    description: "Obaj partnerzy jednocześnie sprawiają sobie przyjemność oralnie",
    illustration: '/images/illustrations/techniques/69.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'mm-pos11', 
    text: 'Pozycja "lotus"',
    description: "Obaj partnerzy siedzą twarzą do siebie, nogi splecione",
    illustration: '/images/illustrations/techniques/lotus-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'mm-pos12', 
    text: 'Pozycja "stojąca"',
    description: "Obaj partnerzy stoją, jeden za drugim",
    illustration: '/images/illustrations/techniques/standing-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'mm-role1', 
    text: 'Nauczyciel i uczeń',
    description: "Odgrywanie ról nauczyciela i ucznia",
    illustration: '/images/illustrations/techniques/Nauczycielka i student.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-role2', 
    text: 'Policjant i zatrzymany',
    description: "Odgrywanie ról policjanta i zatrzymanego",
    illustration: '/images/illustrations/techniques/police-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-role3', 
    text: 'Szef i pracownik',
    description: "Odgrywanie ról szefa i pracownika",
    illustration: '/images/illustrations/techniques/boss-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-sens1', 
    text: 'Seksowna bielizna',
    description: "Noszenie seksownej bielizny dla partnera",
    illustration: '/images/illustrations/techniques/underwear-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-sens2', 
    text: 'Sexting',
    description: "Wysyłanie pikantnych wiadomości i zdjęć",
    illustration: '/images/illustrations/techniques/Dirty talk (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'mm-adv1', 
    text: 'Pełna dominacja i uległość',
    description: "Jeden partner całkowicie dominuje, drugi jest uległy",
    illustration: '/images/illustrations/techniques/domination.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'mm-adv2', 
    text: 'Seks z elementami BDSM',
    description: "Wykorzystanie kajdanek, opasek na oczy, itp.",
    illustration: '/images/illustrations/techniques/bdsm-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  
  // Dodatkowe pytania dla par heteroseksualnych
  { 
    id: 'dom-f2', 
    text: 'On dominuje nad nią',
    description: "Partner przejmuje kontrolę i dominuje w relacji seksualnej",
    illustration: '/images/illustrations/techniques/On dominuje nad nią (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'dom-f3', 
    text: 'Ona dominuje nad nim',
    description: "Partnerka przejmuje kontrolę i dominuje w relacji seksualnej",
    illustration: '/images/illustrations/techniques/Ona dominuje nad nim (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'toys-f1', 
    text: 'Zabawki dla niej',
    description: "Wykorzystanie zabawek erotycznych dla kobiet",
    illustration: '/images/illustrations/techniques/Zabawki dla niej (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'toys-f2', 
    text: 'Zabawki dla niego',
    description: "Wykorzystanie zabawek erotycznych dla mężczyzn",
    illustration: '/images/illustrations/techniques/Zabawki dla niego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'oral-f1', 
    text: 'Seks oralny dla niej',
    description: "Partner dostarcza partnerce przyjemności oralnej",
    illustration: '/images/illustrations/techniques/Seks oralny dla niej (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'edg-f1', 
    text: 'Jego edging',
    description: "Wielokrotne doprowadzanie partnera na skraj orgazmu i wstrzymywanie go. Ta technika może prowadzić do znacznie intensywniejszych orgazmów i lepszej kontroli nad wytryskiem.",
    illustration: '/images/illustrations/techniques/eding-him.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "edge",
    pairPriority: 1
  },
  { 
    id: 'edg-f2', 
    text: 'Jej edging',
    description: "Wielokrotne doprowadzanie Cię na skraj orgazmu i wstrzymywanie go. Ta technika wymaga wyczucia i komunikacji, ale może prowadzić do niezwykle intensywnych orgazmów.",
    illustration: '/images/illustrations/techniques/edging-her.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "edge",
    pairPriority: 2
  },
  { 
    id: 'striptiz-f1', 
    text: 'Striptiz dla niej',
    description: "Czy chciałabyś, żeby partner wykonał dla Ciebie taniec rozbierany? Zmysłowy pokaz może być doskonałą grą wstępną i sposobem na budowanie napięcia seksualnego.",
    illustration: '/images/illustrations/techniques/Striptiz dla niego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 1
  },
  { 
    id: 'striptiz-f2', 
    text: 'Striptiz dla niego',
    description: "Czy chciałabyś zatańczyć dla partnera zmysłowy taniec rozbierany? Pokazanie swojego ciała w ten sposób może być niezwykle uwodzicielskie i podkreślić Twoją pewność siebie.",
    illustration: '/images/illustrations/techniques/Striptiz dla niego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 2
  }
];
