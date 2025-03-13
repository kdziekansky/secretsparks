
import type { Question } from '@/types/survey';

export const questionsAdditional: Question[] = [
  // Tutaj można dodać pytania, które są uniwersalne dla wszystkich konfiguracji
  // lub specjalne pytania dla relacji jednopłciowych
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
    illustration: '/images/illustrations/techniques/doggy-mm.png',
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
    illustration: '/images/illustrations/techniques/69-mm.png',
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
    illustration: '/images/illustrations/techniques/teacher-student-mm.png',
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
    illustration: '/images/illustrations/techniques/sexting-mm.png',
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
    illustration: '/images/illustrations/techniques/domination-mm.png',
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
  // Dodane poprawione ścieżki do obrazów, które powodowały błędy
  { 
    id: 'dom-f2', 
    text: 'On dominuje nad nią',
    description: "Partner przejmuje kontrolę i dominuje w relacji seksualnej",
    illustration: '/images/illustrations/techniques/domination.svg',
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
    illustration: '/images/illustrations/techniques/domination.svg',
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
    illustration: '/images/illustrations/techniques/toys-for-her.png',
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
    illustration: '/images/illustrations/techniques/toys-for-him.png',
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
    illustration: '/images/illustrations/techniques/syrena.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  // Dodajemy nowe pytania z poprawionymi ścieżkami
  { 
    id: 'edg-f1', 
    text: 'Jego edging',
    description: "Kontrolowana stymulacja partnera z opóźnianiem orgazmu",
    illustration: '/images/illustrations/techniques/eding-him.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'edg-f2', 
    text: 'Jej edging',
    description: "Kontrolowana stymulacja partnerki z opóźnianiem orgazmu",
    illustration: '/images/illustrations/techniques/edging-her.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'striptiz-f1', 
    text: 'Striptiz dla niej',
    description: "Partner wykonuje striptiz dla partnerki",
    illustration: '/images/illustrations/techniques/striptease-for-her.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'striptiz-f2', 
    text: 'Striptiz dla niego',
    description: "Partnerka wykonuje striptiz dla partnera",
    illustration: '/images/illustrations/techniques/striptease-for-him.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  }
];
