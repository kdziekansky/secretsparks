
import type { Question } from '@/types/survey';

export const questionsAdditional: Question[] = [
  // Pytania dla relacji jednopłciowych męskich
  { 
    id: 'mm-pos1', 
    text: 'Pozycja misjonarska',
    description: "Klasyczna pozycja twarzą w twarz, jeden partner na górze",
    illustration: '/public/lovable-uploads/5d52fc0b-4dbf-4319-962a-2f4f3e39858f.png',
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
    illustration: '/public/lovable-uploads/34c3f0f2-415a-4c4f-8379-c6acab714fb9.png',
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
    illustration: '/public/lovable-uploads/26fa64af-2207-47d2-822d-1b2080d706d5.png',
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
    illustration: '/public/lovable-uploads/fb2cd6c8-738a-43f4-a800-063383c6e446.png',
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
    illustration: '/public/lovable-uploads/8bc5ec93-052f-47b6-856f-6d832a13c44b.png',
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
    illustration: '/public/lovable-uploads/1079c5c1-8c85-4430-93fe-d8f27924d3cd.png',
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
    illustration: '/public/lovable-uploads/6ddee796-969d-487f-8e27-f485ded7c439.png',
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
    illustration: '/public/lovable-uploads/6aae3c97-6130-41b6-9a4d-ad9e3d01eab1.png',
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
    illustration: '/public/lovable-uploads/ad30e355-5a5b-4e62-9c19-a892d09fc3ec.png',
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
    illustration: '/public/lovable-uploads/a8d08304-2c11-44b9-8f10-5d1d894535fc.png',
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
    illustration: '/public/lovable-uploads/1a7c4b0b-fafc-4591-bbdf-e8a094cb1c47.png',
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
    illustration: '/public/lovable-uploads/fc2104c6-e3be-4199-9b89-693400c8c09c.png',
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
    illustration: '/public/lovable-uploads/5d7ba334-7ede-4624-9d42-f18a62cb60b9.png',
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
    illustration: '/public/lovable-uploads/252aa887-06e8-45f2-83b3-78076f61c357.png',
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
    illustration: '/public/lovable-uploads/2cea51bb-7af9-432f-b3ca-8a56cd064349.png',
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
    illustration: '/public/lovable-uploads/59fe144d-3b4c-4680-bf31-bea200c45c97.png',
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
    illustration: '/public/lovable-uploads/b3e921fe-64c7-4311-b3d6-a0d974cd2bc0.png',
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
    illustration: '/public/lovable-uploads/14ef8c38-93c4-4a85-942e-2ae7f26bc601.png',
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
    illustration: '/public/lovable-uploads/1489d0b9-67a7-436b-9263-7c39d034a10e.png',
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
    illustration: '/public/lovable-uploads/762061e8-d9b8-4c51-bd72-0943a7d8defd.png',
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
    illustration: '/public/lovable-uploads/5348ecde-d859-45bc-85ee-9db9f493167b.png',
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
    illustration: '/public/lovable-uploads/3e0e9882-216f-4781-89d5-55eb142466bf.png',
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
    illustration: '/public/lovable-uploads/1c1b6236-65f4-4c34-a8db-d74ea4975f2a.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 2
  }
];
