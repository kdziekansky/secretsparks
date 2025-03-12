
import type { Question } from '@/types/survey';

export const questionsHeteroFemale: Question[] = [
  { 
    id: 'pos-f1', 
    text: 'Pozycja Amazonki',
    description: "Czy lubisz być na górze i kontrolować rytm podczas stosunku?",
    illustration: '/lovable-uploads/pozycja-amazonki.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f2', 
    text: 'Pozycja misjonarska',
    description: "Pozycja klasyczna, z mężczyzną na górze - ceniona za bliskość i intymność",
    illustration: '/lovable-uploads/missionary.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f3', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację",
    illustration: '/lovable-uploads/doggy.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f4', 
    text: 'Pozycja "wodnik"',
    description: "Pozycja w której siedzisz na partnerze twarzą do niego, a oboje siedzicie",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f5', 
    text: 'Pozycja "syreny"',
    description: "Leżysz na boku, a partner klęczy między twoimi nogami",
    illustration: '/lovable-uploads/syrena.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f6', 
    text: 'Pozycja "na królową"',
    description: "Leżysz na plecach z uniesionymi biodrami, partner klęczy",
    illustration: '/lovable-uploads/krolowa.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f7', 
    text: 'Pozycja "jeździec"',
    description: "Siedzisz na partnerze twarzą do jego twarzy",
    illustration: '/lovable-uploads/riding.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f8', 
    text: 'Pozycja "odwrócona amazońska"',
    description: "Siedzisz na partnerze tyłem do jego twarzy",
    illustration: '/lovable-uploads/odwrocona.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f9', 
    text: 'Pozycja "leniwego pieska"',
    description: "Leżysz płasko na brzuchu, a partner wchodzi od tyłu",
    illustration: '/lovable-uploads/leniwa.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f10', 
    text: 'Pozycja "katapulta"',
    description: "Leżysz na plecach z nogami uniesionymi na ramionach partnera",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'pos-f11', 
    text: 'Pozycja "misjonarska odwrócona"',
    description: "Partner leży na plecach, a ty jesteś na górze, ale oparta na rękach i kolanach",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f12', 
    text: 'Pozycja "kruka" (69)',
    description: "Pozycja, w której oboje jednocześnie sprawiacie sobie przyjemność oralnie",
    illustration: '/lovable-uploads/69.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'rol-f1', 
    text: 'Nauczycielka i student',
    description: "Odgrywanie ról nauczycielki i ucznia - przejmujesz kontrolę w roli nauczycielki?",
    illustration: '/lovable-uploads/nauczycielka.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'rol-f2', 
    text: 'Randka z Tindera',
    description: "Odgrywanie ról osób, które właśnie poznały się przez aplikację randkową",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'rol-f3', 
    text: 'Samotna żona i "złota rączka"',
    description: "Odgrywanie fantazji o samotnej kobiecie i przystojnym hydrauliku/majsterkowiczu",
    illustration: '/lovable-uploads/handyman.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'toys-f1', 
    text: 'Zabawki dla niej',
    description: "Czy chciałabyś, żeby partner używał wibratorów i innych zabawek dla twojej przyjemności?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 1
  },
  { 
    id: 'toys-f2', 
    text: 'Zabawki dla niego',
    description: "Czy chciałabyś eksperymentować z zabawkami dla przyjemności partnera?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 2
  },
  { 
    id: 'oral-f1', 
    text: 'Seks oralny dla niej',
    description: "Czy lubisz gdy partner pieści cię ustami?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 1
  },
  { 
    id: 'oral-f2', 
    text: 'Seks oralny dla niego',
    description: "Czy lubisz sprawiać przyjemność partnerowi ustami?",
    illustration: '/lovable-uploads/seks-oralny-dla-niego.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 2
  },
  { 
    id: 'striptiz-f1', 
    text: 'Striptiz dla niej',
    description: "Czy chciałabyś, żeby partner zatańczył dla ciebie zmysłowy taniec rozbierany?",
    illustration: '/placeholder.svg',
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
    description: "Czy chciałabyś wykonać dla partnera taniec rozbierany?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 2
  },
  { 
    id: 'sensual-f1', 
    text: 'Seksowna bielizna',
    description: "Czy lubisz nosić koronkową lub jedwabną bieliznę dla partnera?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'sensual-f2', 
    text: 'Sexting',
    description: "Czy lubisz wymieniać się z partnerem pikantymi wiadomościami i zdjęciami?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-f1', 
    text: 'Seks w miejscu publicznym',
    description: "Czy pociąga cię myśl o seksie w miejscu, gdzie ktoś mógłby was zobaczyć?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'adv-f2', 
    text: 'Pełna dominacja i uległość',
    description: "Czy pociąga cię pełna dominacja lub uległość w relacji seksualnej?",
    illustration: '/lovable-uploads/domination.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  }
];
