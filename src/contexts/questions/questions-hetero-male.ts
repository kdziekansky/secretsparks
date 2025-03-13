
import type { Question } from '@/types/survey';

export const questionsHeteroMale: Question[] = [
  { 
    id: 'pos-m1', 
    text: 'Pozycja Amazonki',
    description: "Czy lubisz gdy Twoja partnerka jest na górze i kontroluje rytm? Ta pozycja daje kobiecie pełną kontrolę nad tempem i głębokością, a Tobie wspaniały widok.",
    illustration: '/images/illustrations/techniques/Pozycja Amazonki (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-m2', 
    text: 'Pozycja misjonarska',
    description: "Pozycja klasyczna, z mężczyzną na górze - ceniona za bliskość i intymność. Umożliwia głęboki kontakt wzrokowy i pocałunki, budując więź podczas stosunku.",
    illustration: '/images/illustrations/techniques/Pozycja jeździec (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m3', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację. Daje dostęp do punktu G partnerki i umożliwia swobodne ruchy biodrami, zwiększając intensywność doznań.",
    illustration: '/images/illustrations/techniques/doggy.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-m6', 
    text: 'Pozycja "na królową"',
    description: "Kobieta leży na plecach z uniesionymi biodrami, a Ty klęczysz. Ta pozycja pozwala na głęboką penetrację przy jednoczesnym kontakcie wzrokowym i pieszczeniu ciała partnerki.",
    illustration: '/images/illustrations/techniques/Pozycja na królową (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m7', 
    text: 'Pozycja "jeździec"',
    description: "Kobieta siedzi na Tobie twarzą do Twojej twarzy. Daje to możliwość przytulania się i całowania przy jednoczesnym stymulowaniu łechtaczki partnerki przez tarcie.",
    illustration: '/images/illustrations/techniques/Pozycja jeździec (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m8', 
    text: 'Pozycja "odwrócona amazońska"',
    description: "Kobieta siedzi na Tobie tyłem do Twojej twarzy. Ta pozycja oferuje wyjątkowe widoki i dostęp do pieszczenia pleców, pośladków i innych części ciała partnerki.",
    illustration: '/images/illustrations/techniques/Pozycja odwrócona amazońska (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-m9', 
    text: 'Pozycja "leniwego pieska"',
    description: "Kobieta leży płasko na brzuchu, a Ty wchodzisz od tyłu. Idealny wybór, gdy chcecie połączyć odpoczynek z przyjemnością, oferując głęboką penetrację przy minimalnym wysiłku.",
    illustration: '/images/illustrations/techniques/Pozycja łyżeczki (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m12', 
    text: 'Pozycja "kruka" (69)',
    description: "Pozycja, w której oboje jednocześnie sprawiacie sobie przyjemność oralnie. Fantastyczny sposób, by dawać i otrzymywać przyjemność w tym samym czasie.",
    illustration: '/images/illustrations/techniques/69.svg',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'pos-m13', 
    text: 'Pozycja "lotus"',
    description: "Siedzisz ze skrzyżowanymi nogami, a partnerka siada na Tobie, oplatając Cię nogami. Ta intymna pozycja sprzyja głębokiemu połączeniu duchowemu i fizycznemu.",
    illustration: '/images/illustrations/techniques/Pozycja lotus (discover, explore, exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-m14', 
    text: 'Pozycja "łyżeczki"',
    description: "Oboje leżycie na boku, Ty za partnerką. Przyjemna, delikatna pozycja, idealna na romantyczne chwile, pozwalająca na obejmowanie ciała partnerki i intymną bliskość.",
    illustration: '/images/illustrations/techniques/Pozycja łyżeczki (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-m15', 
    text: 'Pozycja "mostek"',
    description: "Partnerka opiera się na rękach i nogach tworząc łuk, a Ty klękasz między jej nogami. Wymagająca pozycja oferująca intensywne doznania i możliwość głębokiej penetracji.",
    illustration: '/images/illustrations/techniques/Pozycja mostek (exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'rol-m1', 
    text: 'Nauczycielka i student',
    description: "Odgrywanie ról nauczycielki i ucznia - kto będzie prowadził lekcje? Fantazja o władzy i wiedzy, gdzie jeden z was staje się przewodnikiem, a drugi chętnym do nauki uczniem.",
    illustration: '/images/illustrations/techniques/Nauczycielka i student.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'rol-m2', 
    text: 'Randka z Tindera',
    description: "Odgrywanie ról osób, które właśnie poznały się przez aplikację randkową. Ekscytacja pierwszego spotkania i odkrywania siebie nawzajem, jakbyście widzieli się po raz pierwszy.",
    illustration: '/images/illustrations/techniques/Randka z Tindera (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'rol-m3', 
    text: '"Złota rączka" i samotna żona',
    description: "Odgrywanie fantazji o hydrauliku/majsterkowiczu i samotnej kobiecie. Klasyczny scenariusz pełen napięcia seksualnego i spontaniczności, gdy przychodzisz naprawić coś w jej domu.",
    illustration: '/images/illustrations/techniques/Uwodzenie, np. pacjentka i lekarz.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'rol-m4', 
    text: 'Pacjentka i lekarz',
    description: "Wciel się w rolę lekarza badającego swoją pacjentkę. Fantazja o profesjonalizmie, który zamienia się w intymne doświadczenie, pełne zaufania i troski o ciało partnerki.",
    illustration: '/images/illustrations/techniques/Uwodzenie, np. pacjentka i lekarz.png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'toys-m1', 
    text: 'Zabawki dla niej',
    description: "Czy chciałbyś użyć wibratorów, masażerów i innych zabawek dla przyjemności partnerki? Zabawki erotyczne mogą zintensyfikować jej orgazmy i otworzyć nowe wymiary przyjemności.",
    illustration: '/images/illustrations/techniques/Zabawki dla niej (discover).png',
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
    description: "Czy chciałbyś eksperymentować z zabawkami dla twojej przyjemności? Poznaj akcesoria zaprojektowane specjalnie dla mężczyzn, które mogą wzbogacić Twoje doznania seksualne.",
    illustration: '/images/illustrations/techniques/Zabawki dla niego (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 2
  },
  { 
    id: 'mas-m1', 
    text: 'Użycie olejków do masażu erotycznego',
    description: "Czy myślałeś o zmysłowym masażu z użyciem pachnących olejków? To doskonały sposób na relaks, który może płynnie przejść w erotyczne pieszczoty i namiętny seks.",
    illustration: '/images/illustrations/techniques/Użycie olejków do masażu erotycznego (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mas-m2', 
    text: 'Pieszczoty lodem i ciepłem',
    description: "Eksperymentowanie z kontrastami temperatur podczas pieszczot. Kostki lodu i ciepłe oleje mogą zintensyfikować doznania i uwrażliwić skórę na najlżejszy dotyk.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla niej (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'mas-m3', 
    text: 'Seks po omacku',
    description: "Eksplorowanie ciała partnerki bez użycia wzroku. Wyłączenie jednego zmysłu wzmacnia pozostałe, intensyfikując dotyk, smak i zapach, co prowadzi do niezwykłych doznań.",
    illustration: '/images/illustrations/techniques/Seks po omacku (explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'adv-m1', 
    text: 'Zabawy z bitą śmietaną',
    description: "Smarowanie ciała partnerki bitą śmietaną i zlizywanie jej. Słodka, zmysłowa zabawa łącząca przyjemności kulinarne z erotyzmem dla jeszcze intensywniejszych doznań.",
    illustration: '/images/illustrations/techniques/Zabawy z bitą śmietaną (explore, exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'adv-m2', 
    text: 'Klatka na penisa',
    description: "Zabawka która kontroluje Twoją erekcję i orgazm. Klatka na penisa to zaawansowana zabawka BDSM, która pozwala partnerce przejąć pełną kontrolę nad Twoją męskością.",
    illustration: '/images/illustrations/techniques/Klatka na penisa (exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'oral-m1', 
    text: 'Seks oralny dla niej',
    description: "Czy lubisz sprawiać przyjemność partnerce ustami? Pieszczenie jej łechtaczki i warg sromowych językiem może doprowadzić do intensywnych orgazmów i głębokiej bliskości.",
    illustration: '/images/illustrations/techniques/Seks oralny dla niej (discover).png',
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
    description: "Czy lubisz gdy partnerka pieści Cię ustami? Pieszczenie penisa ustami to wspaniałe doznanie, które może być zarówno preludium jak i głównym punktem erotycznego spotkania.",
    illustration: '/images/illustrations/techniques/Seks oralny dla niego (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 2
  },
  { 
    id: 'oral-m3', 
    text: 'Głębokie gardło',
    description: "Zaawansowana technika seksu oralnego, gdzie partnerka przyjmuje penisa głęboko do gardła. Wymaga zaufania, praktyki i komunikacji, ale oferuje intensywne doznania.",
    illustration: '/images/illustrations/techniques/Głębokie gardło (exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'tan-m1', 
    text: 'Masaż tantryczny dla pary',
    description: "Wzajemny masaż całego ciała oparty na starożytnych technikach tantry. To doświadczenie łączące duchowość z erotyzmem, prowadzące do głębszego połączenia między wami.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla pary (explore, exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'tan-m2', 
    text: 'Masaż tantryczny dla niego',
    description: "Czy chciałbyś otrzymać od partnerki masaż całego ciała oparty na tantry? To głębokie doświadczenie relaksacyjne i seksualne, które może prowadzić do intensywnych orgazmów.",
    illustration: '/images/illustrations/techniques/Masaż tantryczny dla niego (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "tantra",
    pairPriority: 1
  },
  { 
    id: 'tan-m3', 
    text: 'Masaż tantryczny dla niej',
    description: "Czy chciałbyś dać partnerce tantryczny masaż całego ciała? Nauka tej starożytnej sztuki może pomóc Ci lepiej rozumieć jej ciało i prowadzić ją do niesamowitych doznań.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla niej (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "tantra",
    pairPriority: 2
  },
  { 
    id: 'edg-m1', 
    text: 'Jego edging',
    description: "Wielokrotne doprowadzanie Cię na skraj orgazmu i wstrzymywanie go. Ta technika może prowadzić do znacznie intensywniejszych orgazmów i lepszej kontroli nad wytryskiem.",
    illustration: '/images/illustrations/techniques/Jego edging (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "edge",
    pairPriority: 1
  },
  { 
    id: 'edg-m2', 
    text: 'Jej edging',
    description: "Wielokrotne doprowadzanie partnerki na skraj orgazmu i wstrzymywanie go. Ta technika wymaga wyczucia i komunikacji, ale może prowadzić do niezwykle intensywnych orgazmów.",
    illustration: '/images/illustrations/techniques/Jej edging (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "edge",
    pairPriority: 2
  },
  { 
    id: 'adv-m3', 
    text: 'Titfuck',
    description: "Pieszczenie penisa między piersiami partnerki. Ta technika może być zarówno formą gry wstępnej jak i doprowadzić do orgazmu, oferując niepowtarzalne wizualne i fizyczne doznania.",
    illustration: '/images/illustrations/techniques/Titfuck (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-m4', 
    text: 'Footjob',
    description: "Pieszczenie penisa stopami partnerki. Ta nietypowa forma pieszczot może być bardzo przyjemna i stanowić ekscytujące urozmaicenie waszego życia seksualnego.",
    illustration: '/images/illustrations/techniques/Footjob (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-m5', 
    text: 'Fingering',
    description: "Penetracja pochwy palcami. Technika ta pozwala na precyzyjną stymulację punktu G partnerki i może być niezwykle przyjemna zarówno jako gra wstępna, jak i główna aktywność.",
    illustration: '/images/illustrations/techniques/Fingering (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-m6', 
    text: 'Wzajemna masturbacja',
    description: "Masturbowanie się w obecności partnerki, podczas gdy ona również się masturbuje. Intymne dzielenie się przyjemnością, która pozwala lepiej poznać własne preferencje.",
    illustration: '/images/illustrations/techniques/Wzajemna masturbacja (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'striptiz-m1', 
    text: 'Striptiz dla niej',
    description: "Czy chciałbyś zatańczyć dla partnerki zmysłowy taniec rozbierany? Pokazanie swojego ciała w ten sposób może być niezwykle uwodzicielskie i podkreślić Twoją pewność siebie.",
    illustration: '/images/illustrations/techniques/Striptiz dla niego (discover).png',
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
    description: "Czy chciałbyś, żeby partnerka wykonała dla Ciebie taniec rozbierany? Zmysłowy pokaz może być doskonałą grą wstępną i sposobem na budowanie napięcia seksualnego.",
    illustration: '/images/illustrations/techniques/Striptiz dla niego (discover).png',
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
    description: "Czy podnieca Cię widok partnerki w koronkowej lub jedwabnej bieliźnie? Elegancka bielizna może podkreślić walory ciała i stworzyć erotyczną atmosferę oczekiwania.",
    illustration: '/images/illustrations/techniques/Seksowna bielizna (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'sensual-m2', 
    text: 'Własny film erotyczny',
    description: "Nagranie wspólnego filmu dla własnej przyjemności. Dokumentowanie waszych intymnych chwil może być ekscytujące i pozwala zobaczyć siebie z nowej perspektywy.",
    illustration: '/images/illustrations/techniques/Własny film erotyczny (explore, exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'sensual-m3', 
    text: 'Sexting',
    description: "Czy lubisz wymieniać się z partnerką pikantnymi wiadomościami i zdjęciami? Budowanie napięcia przez cały dzień może prowadzić do niezwykle namiętnego spotkania wieczorem.",
    illustration: '/images/illustrations/techniques/Dirty talk (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'com-m1', 
    text: 'Dirty talk',
    description: "Wypowiadanie nieprzyzwoitych słów i fantazji podczas seksu. Erotyczne słowa mogą stymulować umysł - najważniejszy organ seksualny - i znacząco zwiększyć podniecenie.",
    illustration: '/images/illustrations/techniques/Dirty talk (discover).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'com-m2', 
    text: 'Rozmowy o przeszłości seksualnej',
    description: "Dzielenie się historiami o poprzednich doświadczeniach seksualnych. Dla niektórych par takie rozmowy mogą być podniecające i budować większą intymność i zaufanie.",
    illustration: '/images/illustrations/techniques/Rozmowy o przeszłości seksualnej (exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'dom-m1', 
    text: 'Wzajemna lekka dominacja',
    description: "Naprzemienne przejmowanie kontroli podczas seksu. Zmienianie ról dominującego i uległego może dodać dynamiki waszemu życiu seksualnemu i zaspokoić różne potrzeby.",
    illustration: '/images/illustrations/techniques/Wzajemna lekka dominacja (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'dom-m2', 
    text: 'On dominuje nad nią',
    description: "Przejęcie kontroli i kierowanie przebiegiem zbliżenia. Dla wielu par taki układ jest podniecający, daje poczucie bezpieczeństwa i pozwala spełniać różne fantazje.",
    illustration: '/images/illustrations/techniques/On dominuje nad nią (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "dom",
    pairPriority: 1
  },
  { 
    id: 'dom-m3', 
    text: 'Ona dominuje nad nim',
    description: "Pozwolenie partnerce przejąć kontrolę nad seksem. Oddanie się w jej ręce może być niezwykle wyzwalające i pozwolić Ci doświadczyć nowych wymiarów przyjemności.",
    illustration: '/images/illustrations/techniques/Ona dominuje nad nim (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "dom",
    pairPriority: 2
  },
  { 
    id: 'dom-m4', 
    text: 'Pełna dominacja i uległość',
    description: "Czy pociąga Cię pełna dominacja lub uległość w relacji seksualnej? Głębsze eksplorowanie dynamiki władzy może prowadzić do intensywnych, transformujących doświadczeń.",
    illustration: '/images/illustrations/techniques/Pełna dominacja i uległość (exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'dom-m5', 
    text: 'Seks z lekkim podduszaniem',
    description: "Kontrolowane ograniczanie dopływu powietrza dla zwiększenia doznań. Ta praktyka wymaga absolutnego zaufania, wiedzy i ostrożności, ale może intensyfikować orgazmy.",
    illustration: '/images/illustrations/techniques/Seks z lekkim podduszaniem (explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'loc-m1', 
    text: 'Seks w miejscu publicznym',
    description: "Czy pociąga Cię myśl o seksie w miejscu, gdzie ktoś mógłby was zobaczyć? Dreszczyk emocji związany z ryzykiem przyłapania może znacząco zwiększyć poziom adrenaliny i przyjemności.",
    illustration: '/images/illustrations/techniques/Seks w miejscu publicznym (explore, exceed).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'loc-m2', 
    text: 'Seks w samochodzie',
    description: "Spontaniczny seks w zaparkowanym aucie. Ograniczona przestrzeń wymusza kreatywność w pozycjach, a element ryzyka dodaje pikanterii całemu doświadczeniu.",
    illustration: '/images/illustrations/techniques/Seks w samochodzie (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'loc-m3', 
    text: 'Seks w trakcie kąpieli',
    description: "Miłość w wannie lub pod prysznicem. Woda i mydło tworzą doskonały lubykant, a ciepło i bliskość sprzyjają relaksowi i przyjemności.",
    illustration: '/images/illustrations/techniques/Seks w trakcie kąpieli (discover, explore).png',
    forConfig: { 
      userGender: 'male',
      partnerGender: 'female',
      gameLevel: ['discover', 'explore'] 
    }
  }
];
