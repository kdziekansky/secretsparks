
import type { Question } from '@/types/survey';

export const questionsHeteroFemale: Question[] = [
  { 
    id: 'pos-f1', 
    text: 'Pozycja Amazonki',
    description: "Czy lubisz być na górze i kontrolować rytm? Ta pozycja daje Ci pełną kontrolę nad tempem i głębokością, pozwalając na optymalne doznania.",
    illustration: '/images/illustrations/techniques/Pozycja Amazonki (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f2', 
    text: 'Pozycja misjonarska',
    description: "Klasyczna pozycja z mężczyzną na górze, ceniona za bliskość i intymność. Umożliwia głęboki kontakt wzrokowy i pocałunki, budując więź podczas stosunku.",
    illustration: '/images/illustrations/techniques/Pozycja jeździec (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f3', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację. Oferuje intensywną stymulację punktu G i pozwala partnerowi na swobodne ruchy biodrami.",
    illustration: '/images/illustrations/techniques/doggy.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f6', 
    text: 'Pozycja "na królową"',
    description: "Leżysz na plecach z uniesionymi biodrami, a partner klęczy. Ta pozycja pozwala na głęboką penetrację przy jednoczesnym kontakcie wzrokowym.",
    illustration: '/images/illustrations/techniques/Pozycja na królową (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f7', 
    text: 'Pozycja "jeździec"',
    description: "Siedzisz na partnerze twarzą do jego twarzy. Daje to możliwość przytulania się i całowania przy jednoczesnym stymulowaniu łechtaczki przez tarcie.",
    illustration: '/images/illustrations/techniques/Pozycja jeździec (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f8', 
    text: 'Pozycja "odwrócona amazońska"',
    description: "Siedzisz na partnerze tyłem do jego twarzy. Ty kontrolujesz tempo i głębokość, a partner ma doskonały widok na Twoje plecy i pośladki.",
    illustration: '/images/illustrations/techniques/Pozycja odwrócona amazońska (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f9', 
    text: 'Pozycja "leniwego pieska"',
    description: "Leżysz płasko na brzuchu, a partner wchodzi od tyłu. Idealny wybór, gdy chcecie połączyć odpoczynek z przyjemnością, oferując głęboką penetrację przy minimalnym wysiłku.",
    illustration: '/images/illustrations/techniques/Pozycja łyżeczki (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f12', 
    text: 'Pozycja "kruka" (69)',
    description: "Pozycja, w której oboje jednocześnie sprawiacie sobie przyjemność oralnie. Fantastyczny sposób, by dawać i otrzymywać przyjemność w tym samym czasie.",
    illustration: '/images/illustrations/techniques/69.svg',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'pos-f13', 
    text: 'Pozycja "lotus"',
    description: "Partner siedzi ze skrzyżowanymi nogami, a Ty siadasz na nim, oplatając go nogami. Ta intymna pozycja sprzyja głębokiemu połączeniu duchowemu i fizycznemu.",
    illustration: '/images/illustrations/techniques/Pozycja lotus (discover, explore, exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f14', 
    text: 'Pozycja "łyżeczki"',
    description: "Oboje leżycie na boku, partner za Tobą. Przyjemna, delikatna pozycja, idealna na romantyczne chwile, pozwalająca na obejmowanie całego Twojego ciała.",
    illustration: '/images/illustrations/techniques/Pozycja łyżeczki (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f15', 
    text: 'Pozycja "mostek"',
    description: "Opierasz się na rękach i nogach tworząc łuk, a partner klęka między Twoimi nogami. Wymagająca pozycja oferująca intensywne doznania i możliwość głębokiej penetracji.",
    illustration: '/images/illustrations/techniques/Pozycja mostek (exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'rol-f1', 
    text: 'Nauczycielka i student',
    description: "Odgrywanie ról nauczycielki i ucznia - kto będzie prowadził lekcje? Fantazja o władzy i wiedzy, która może rozpalić wyobraźnię i dodać pikanterii waszemu zbliżeniu.",
    illustration: '/images/illustrations/techniques/Nauczycielka i student.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'rol-f2', 
    text: 'Randka z Tindera',
    description: "Odgrywanie ról osób, które właśnie poznały się przez aplikację randkową. Ekscytacja pierwszego spotkania i odkrywania siebie nawzajem, jakbyście widzieli się po raz pierwszy.",
    illustration: '/images/illustrations/techniques/Randka z Tindera (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'rol-f3', 
    text: '"Złota rączka" i samotna pani',
    description: "Odgrywanie fantazji o hydrauliku/majsterkowiczu i samotnej kobiecie. Klasyczny scenariusz pełen napięcia seksualnego i spontaniczności, gdy przychodzi naprawić coś w Twoim domu.",
    illustration: '/images/illustrations/techniques/Uwodzenie, np. pacjentka i lekarz.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'rol-f4', 
    text: 'Pacjentka i lekarz',
    description: "Wciel się w rolę pacjentki badanej przez lekarza. Fantazja o profesjonalizmie, który zamienia się w erotyczne spotkanie, pełne zaufania i troski o Twoje ciało.",
    illustration: '/images/illustrations/techniques/Uwodzenie, np. pacjentka i lekarz.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'toys-f1', 
    text: 'Zabawki dla niej',
    description: "Czy chciałabyś użyć wibratorów, masażerów i innych zabawek dla swojej przyjemności? Zabawki erotyczne mogą zintensyfikować Twoje orgazmy i otworzyć nowe wymiary przyjemności.",
    illustration: '/images/illustrations/techniques/Zabawki dla niej (discover).png',
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
    description: "Czy chciałabyś eksperymentować z zabawkami dla jego przyjemności? Poznaj akcesoria zaprojektowane specjalnie dla mężczyzn, które mogą wzbogacić jego doznania seksualne.",
    illustration: '/images/illustrations/techniques/Zabawki dla niego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "toys",
    pairPriority: 2
  },
  { 
    id: 'mas-f1', 
    text: 'Użycie olejków do masażu erotycznego',
    description: "Czy myślałaś o zmysłowym masażu z użyciem pachnących olejków? To doskonały sposób na relaks, który może płynnie przejść w erotyczne pieszczoty i namiętny seks.",
    illustration: '/images/illustrations/techniques/Użycie olejków do masażu erotycznego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mas-f2', 
    text: 'Pieszczoty lodem i ciepłem',
    description: "Eksperymentowanie z kontrastami temperatur podczas pieszczot. Kostki lodu i ciepłe oleje mogą zintensyfikować doznania i uwrażliwić skórę na najlżejszy dotyk.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla niej (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'mas-f3', 
    text: 'Seks po omacku',
    description: "Eksplorowanie ciała w pełnej ciemności. Wyłączenie wzroku wzmacnia pozostałe zmysły, intensyfikując dotyk, smak i zapach, co prowadzi do niezwykłych doznań.",
    illustration: '/images/illustrations/techniques/Seks po omacku (explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'adv-f1', 
    text: 'Zabawy z bitą śmietaną',
    description: "Smarowanie ciała bitą śmietaną i zlizywanie jej. Słodka, zmysłowa zabawa łącząca przyjemności kulinarne z erotyzmem dla jeszcze intensywniejszych doznań.",
    illustration: '/images/illustrations/techniques/Zabawy z bitą śmietaną (explore, exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'adv-f2', 
    text: 'Klatka na penisa',
    description: "Zabawka która kontroluje erekcję partnera i jego orgazm. Klatka na penisa to zaawansowana zabawka BDSM, która daje Ci pełną kontrolę nad jego męskością.",
    illustration: '/images/illustrations/techniques/Klatka na penisa (exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'oral-f1', 
    text: 'Seks oralny dla niej',
    description: "Czy lubisz, gdy partner pieści Cię ustami? Stymulacja łechtaczki i warg sromowych językiem może prowadzić do intensywnych orgazmów i głębokiej bliskości.",
    illustration: '/images/illustrations/techniques/Seks oralny dla niej (discover).png',
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
    description: "Czy lubisz pieścić partnera ustami? Pieszczenie penisa ustami to wspaniały sposób na dawanie przyjemności, który może być zarówno preludium jak i głównym punktem erotycznego spotkania.",
    illustration: '/images/illustrations/techniques/Seks oralny dla niego (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    },
    pairGroup: "oral",
    pairPriority: 2
  },
  { 
    id: 'oral-f3', 
    text: 'Głębokie gardło',
    description: "Zaawansowana technika seksu oralnego, gdzie przyjmujesz penisa głęboko do gardła. Wymaga zaufania, praktyki i komunikacji, ale oferuje niezwykłe doznania dla Twojego partnera.",
    illustration: '/images/illustrations/techniques/Głębokie gardło (exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'tan-f1', 
    text: 'Masaż tantryczny dla pary',
    description: "Wzajemny masaż całego ciała oparty na starożytnych technikach tantry. To doświadczenie łączące duchowość z erotyzmem, prowadzące do głębszego połączenia między wami.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla pary (explore, exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'tan-f2', 
    text: 'Masaż tantryczny dla niego',
    description: "Czy chciałabyś dać partnerowi tantryczny masaż całego ciała? Nauka tej starożytnej sztuki może pomóc Ci lepiej rozumieć jego ciało i prowadzić go do niesamowitych doznań.",
    illustration: '/images/illustrations/techniques/Masaż tantryczny dla niego (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "tantra",
    pairPriority: 1
  },
  { 
    id: 'tan-f3', 
    text: 'Masaż tantryczny dla niej',
    description: "Czy chciałabyś otrzymać od partnera masaż całego ciała oparty na technikach tantry? To głębokie doświadczenie relaksacyjne i seksualne, które może prowadzić do intensywnych orgazmów.",
    illustration: '/images/illustrations/techniques/Massaż tantryczny dla niej (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "tantra",
    pairPriority: 2
  },
  { 
    id: 'edg-f1', 
    text: 'Jego edging',
    description: "Wielokrotne doprowadzanie partnera na skraj orgazmu i wstrzymywanie go. Ta technika może prowadzić do znacznie intensywniejszych orgazmów i lepszej kontroli nad wytryskiem.",
    illustration: '/images/illustrations/techniques/Jego edging (discover, explore).png',
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
    illustration: '/images/illustrations/techniques/Jej edging (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "edge",
    pairPriority: 2
  },
  { 
    id: 'adv-f3', 
    text: 'Titfuck',
    description: "Pieszczenie penisa partnera między Twoimi piersiami. Ta technika może być zarówno formą gry wstępnej jak i doprowadzić do orgazmu, oferując mu niepowtarzalne wizualne i fizyczne doznania.",
    illustration: '/images/illustrations/techniques/Titfuck (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-f4', 
    text: 'Footjob',
    description: "Pieszczenie penisa partnera stopami. Ta nietypowa forma pieszczot może być bardzo przyjemna dla niego i stanowić ekscytujące urozmaicenie waszego życia seksualnego.",
    illustration: '/images/illustrations/techniques/Footjob (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-f5', 
    text: 'Fingering',
    description: "Penetracja Twojej pochwy palcami partnera. Technika ta pozwala na precyzyjną stymulację punktu G i może być niezwykle przyjemna zarówno jako gra wstępna, jak i główna aktywność.",
    illustration: '/images/illustrations/techniques/Fingering (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-f6', 
    text: 'Wzajemna masturbacja',
    description: "Masturbowanie się w obecności partnera, podczas gdy on również się masturbuje. Intymne dzielenie się przyjemnością, która pozwala lepiej poznać własne preferencje.",
    illustration: '/images/illustrations/techniques/Wzajemna masturbacja (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
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
  },
  { 
    id: 'sensual-f1', 
    text: 'Seksowna bielizna',
    description: "Czy podnieca Cię noszenie koronkowej lub jedwabnej bielizny? Elegancka bielizna może podkreślić walory Twojego ciała i stworzyć erotyczną atmosferę oczekiwania.",
    illustration: '/images/illustrations/techniques/Seksowna bielizna (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'sensual-f2', 
    text: 'Własny film erotyczny',
    description: "Nagranie wspólnego filmu dla własnej przyjemności. Dokumentowanie waszych intymnych chwil może być ekscytujące i pozwala zobaczyć siebie z nowej perspektywy.",
    illustration: '/images/illustrations/techniques/Własny film erotyczny (explore, exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'sensual-f3', 
    text: 'Sexting',
    description: "Czy lubisz wymieniać się z partnerem pikantnymi wiadomościami i zdjęciami? Budowanie napięcia przez cały dzień może prowadzić do niezwykle namiętnego spotkania wieczorem.",
    illustration: '/images/illustrations/techniques/Dirty talk (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'com-f1', 
    text: 'Dirty talk',
    description: "Wypowiadanie nieprzyzwoitych słów i fantazji podczas seksu. Erotyczne słowa mogą stymulować umysł - najważniejszy organ seksualny - i znacząco zwiększyć podniecenie.",
    illustration: '/images/illustrations/techniques/Dirty talk (discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'com-f2', 
    text: 'Rozmowy o przeszłości seksualnej',
    description: "Dzielenie się historiami o poprzednich doświadczeniach seksualnych. Dla niektórych par takie rozmowy mogą być podniecające i budować większą intymność i zaufanie.",
    illustration: '/images/illustrations/techniques/Rozmowy o przeszłości seksualnej (exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'dom-f1', 
    text: 'Wzajemna lekka dominacja',
    description: "Naprzemienne przejmowanie kontroli podczas seksu. Zmienianie ról dominującej i uległej może dodać dynamiki waszemu życiu seksualnemu i zaspokoić różne potrzeby.",
    illustration: '/images/illustrations/techniques/Wzajemna lekka dominacja (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'dom-f2', 
    text: 'On dominuje nad nią',
    description: "Pozwolenie partnerowi przejąć kontrolę i kierować przebiegiem zbliżenia. Dla wielu kobiet oddanie kontroli może być bardzo wyzwalające i podniecające.",
    illustration: '/images/illustrations/techniques/On dominuje nad nią (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "dom",
    pairPriority: 1
  },
  { 
    id: 'dom-f3', 
    text: 'Ona dominuje nad nim',
    description: "Przejęcie kontroli nad seksem. Bycie dominującą daje możliwość decydowania o tempie, pozycjach i całym przebiegu stosunku, a także realizacji własnych fantazji.",
    illustration: '/images/illustrations/techniques/Ona dominuje nad nim (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    },
    pairGroup: "dom",
    pairPriority: 2
  },
  { 
    id: 'dom-f4', 
    text: 'Pełna dominacja i uległość',
    description: "Czy pociąga Cię pełna dominacja lub uległość w relacji seksualnej? Głębsze eksplorowanie dynamiki władzy może prowadzić do intensywnych, transformujących doświadczeń.",
    illustration: '/images/illustrations/techniques/Pełna dominacja i uległość (exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'dom-f5', 
    text: 'Seks z lekkim podduszaniem',
    description: "Kontrolowane ograniczanie dopływu powietrza dla zwiększenia doznań. Ta praktyka wymaga absolutnego zaufania, wiedzy i ostrożności, ale może intensyfikować orgazmy.",
    illustration: '/images/illustrations/techniques/Seks z lekkim podduszaniem (explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'loc-f1', 
    text: 'Seks w miejscu publicznym',
    description: "Czy pociąga Cię myśl o seksie w miejscu, gdzie ktoś mógłby was zobaczyć? Dreszczyk emocji związany z ryzykiem przyłapania może znacząco zwiększyć poziom adrenaliny i przyjemności.",
    illustration: '/images/illustrations/techniques/Seks w miejscu publicznym (explore, exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'loc-f2', 
    text: 'Seks w samochodzie',
    description: "Spontaniczny seks w zaparkowanym aucie. Ograniczona przestrzeń wymusza kreatywność w pozycjach, a element ryzyka dodaje pikanterii całemu doświadczeniu.",
    illustration: '/images/illustrations/techniques/Seks w samochodzie (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'loc-f3', 
    text: 'Seks w trakcie kąpieli',
    description: "Miłość w wannie lub pod prysznicem. Woda i mydło tworzą doskonały lubrykat, a ciepło i bliskość sprzyjają relaksowi i przyjemności.",
    illustration: '/images/illustrations/techniques/Seks w trakcie kąpieli (discover, explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  }
];
