
import type { Question } from '@/types/survey';

export const questionsHeteroMale: Question[] = [
  { 
    id: 'pos-m1', 
    text: 'Pozycja Amazonki',
    description: "Czy lubisz gdy Twoja partnerka jest na górze i kontroluje rytm?",
    illustration: '/lovable-uploads/pozycja-amazonki.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-m2', 
    text: 'Pozycja misjonarska',
    description: "Pozycja klasyczna, z mężczyzną na górze - ceniona za bliskość i intymność",
    illustration: '/lovable-uploads/missionary.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m3', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację",
    illustration: '/lovable-uploads/doggy.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-m4', 
    text: 'Pozycja "wodnik"',
    description: "Pozycja w której partnerka siedzi na tobie twarzą do ciebie, a wy oboje siedzicie",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-m5', 
    text: 'Pozycja "syreny"',
    description: "Kobieta leży na boku, a ty klęczysz między jej nogami",
    illustration: '/lovable-uploads/syrena.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-m6', 
    text: 'Pozycja "na królową"',
    description: "Kobieta leży na plecach z uniesionymi biodrami, mężczyzna klęczy",
    illustration: '/lovable-uploads/krolowa.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m7', 
    text: 'Pozycja "jeździec"',
    description: "Kobieta siedzi na tobie twarzą do twojej twarzy",
    illustration: '/lovable-uploads/riding.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m8', 
    text: 'Pozycja "odwrócona amazońska"',
    description: "Kobieta siedzi na tobie tyłem do twojej twarzy",
    illustration: '/lovable-uploads/odwrocona.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-m9', 
    text: 'Pozycja "leniwego pieska"',
    description: "Kobieta leży płasko na brzuchu, a ty wchodzisz od tyłu",
    illustration: '/lovable-uploads/leniwa.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m10', 
    text: 'Pozycja "katapulta"',
    description: "Kobieta leży na plecach z nogami uniesionymi na twoich ramionach",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'pos-m11', 
    text: 'Pozycja "misjonarska odwrócona"',
    description: "Ty leżysz na plecach, a kobieta jest na górze, ale oparta na rękach i kolanach",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-m12', 
    text: 'Pozycja "kruka" (69)',
    description: "Pozycja, w której oboje jednocześnie sprawiacie sobie przyjemność oralnie",
    illustration: '/lovable-uploads/69.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'rol-m1', 
    text: 'Nauczycielka i student',
    description: "Odgrywanie ról nauczycielki i ucznia - kto będzie prowadził lekcje?",
    illustration: '/lovable-uploads/nauczycielka.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'rol-m2', 
    text: 'Randka z Tindera',
    description: "Odgrywanie ról osób, które właśnie poznały się przez aplikację randkową",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'rol-m3', 
    text: '"Złota rączka" i samotna żona',
    description: "Odgrywanie fantazji o hydrauliku/majsterkowiczu i samotnej kobiecie",
    illustration: '/lovable-uploads/handyman.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'toys-m1', 
    text: 'Zabawki dla niej',
    description: "Czy chciałbyś użyć wibratorów, masażerów i innych zabawek dla przyjemności partnerki?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 1
  },
  { 
    id: 'toys-m2', 
    text: 'Zabawki dla niego',
    description: "Czy chciałbyś eksperymentować z zabawkami dla twojej przyjemności?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 2
  },
  { 
    id: 'oral-m1', 
    text: 'Seks oralny dla niej',
    description: "Czy lubisz sprawiać przyjemność partnerce ustami?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 1
  },
  { 
    id: 'oral-m2', 
    text: 'Seks oralny dla niego',
    description: "Czy lubisz gdy partnerka pieści cię ustami?",
    illustration: '/lovable-uploads/seks-oralny-dla-niego.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 2
  },
  { 
    id: 'striptiz-m1', 
    text: 'Striptiz dla niej',
    description: "Czy chciałbyś zatańczyć dla partnerki zmysłowy taniec rozbierany?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 1
  },
  { 
    id: 'striptiz-m2', 
    text: 'Striptiz dla niego',
    description: "Czy chciałbyś, żeby partnerka wykonała dla ciebie taniec rozbierany?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 2
  },
  { 
    id: 'sensual-m1', 
    text: 'Seksowna bielizna',
    description: "Czy podnieca cię widok partnerki w koronkowej lub jedwabnej bieliźnie?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'sensual-m2', 
    text: 'Sexting',
    description: "Czy lubisz wymieniać się z partnerką pikantymi wiadomościami i zdjęciami?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-m1', 
    text: 'Seks w miejscu publicznym',
    description: "Czy pociąga cię myśl o seksie w miejscu, gdzie ktoś mógłby was zobaczyć?",
    illustration: '/placeholder.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'adv-m2', 
    text: 'Pełna dominacja i uległość',
    description: "Czy pociąga cię pełna dominacja lub uległość w relacji seksualnej?",
    illustration: '/lovable-uploads/domination.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  }
];
