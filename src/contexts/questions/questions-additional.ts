
import type { Question } from '@/types/survey';

export const questionsAdditional: Question[] = [
  // Tutaj można dodać pytania, które są uniwersalne dla wszystkich konfiguracji
  // lub specjalne pytania dla relacji jednopłciowych
  { 
    id: 'mm-pos1', 
    text: 'Pozycja misjonarska',
    description: "Klasyczna pozycja twarzą w twarz, jeden partner na górze",
    illustration: '/lovable-uploads/missionary-mm.png',
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
    illustration: '/lovable-uploads/doggy-mm.png',
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
    illustration: '/lovable-uploads/spoon-mm.png',
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
    illustration: '/lovable-uploads/rider-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mm-pos5', 
    text: 'Pozycja "odwrócona jeździec"',
    description: "Jeden partner siedzi na drugim tyłem do twarzy",
    illustration: '/lovable-uploads/reverse-rider-mm.png',
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
    illustration: '/lovable-uploads/side-mm.png',
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
    illustration: '/lovable-uploads/prone-mm.png',
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
    illustration: '/lovable-uploads/sofa-mm.png',
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
    illustration: '/lovable-uploads/face-to-face-mm.png',
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
    illustration: '/lovable-uploads/69-mm.png',
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
    illustration: '/lovable-uploads/lotus-mm.png',
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
    illustration: '/lovable-uploads/standing-mm.png',
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
    illustration: '/lovable-uploads/teacher-student-mm.png',
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
    illustration: '/lovable-uploads/police-mm.png',
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
    illustration: '/lovable-uploads/boss-mm.png',
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
    illustration: '/lovable-uploads/underwear-mm.png',
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
    illustration: '/lovable-uploads/sexting-mm.png',
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
    illustration: '/lovable-uploads/domination-mm.png',
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
    illustration: '/lovable-uploads/bdsm-mm.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  // Dodane poprawione ścieżki do obrazów, które powodowały błędy
  { 
    id: 'dom-f2', 
    text: 'On dominuje nad nią',
    description: "Partner przejmuje kontrolę i dominuje w relacji seksualnej",
    illustration: '/lovable-uploads/domination.svg',
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
    illustration: '/lovable-uploads/domination.svg',
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
    illustration: '/lovable-uploads/toys-for-her.png',
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
    illustration: '/lovable-uploads/toys-for-him.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'oral-f1', 
    text: 'Seks oralny dla niej',
    description: "Partner dostarcza partnercie przyjemności oralnej",
    illustration: '/lovable-uploads/syrena.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  }
];
