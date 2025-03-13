import type { Question } from '@/types/survey';

export const questionsHeteroFemale: Question[] = [
  { 
    id: 'pos-f1', 
    text: 'Pozycja Amazonki',
    description: "Czy lubisz być na górze i kontrolować rytm podczas stosunku? Ta pozycja daje Ci pełną kontrolę nad tempem i głębokością, pozwalając na stymulację najwrażliwszych miejsc.",
    illustration: '/images/illustrations/techniques/Pozycja_Amazonki_(discover,_explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'pos-f2', 
    text: 'Pozycja misjonarska',
    description: "Pozycja klasyczna, z mężczyzną na górze - ceniona za bliskość i intymność. Umożliwia głęboki kontakt wzrokowy i pocałunki, budując więź podczas stosunku.",
    illustration: '/images/illustrations/techniques/Pozycja_misjonarska_(discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f3', 
    text: 'Pozycja "na pieska"',
    description: "Pozycja od tyłu, która pozwala na głębszą penetrację. Daje partnerowi dostęp do Twojego punktu G i umożliwia stymulację łechtaczki ręką dla dodatkowej przyjemności.",
    illustration: '/images/illustrations/techniques/Pozycja_na_pieska_(discover,_explore,_exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f6', 
    text: 'Pozycja "na królową"',
    description: "Leżysz na plecach z uniesionymi biodrami, partner klęczy. Ta pozycja pozwala na głęboką penetrację przy jednoczesnym kontakcie wzrokowym i możliwości pieszczot.",
    illustration: '/images/illustrations/techniques/Pozycja_na_królową_(discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f7', 
    text: 'Pozycja "jeździec"',
    description: "Siedzisz na partnerze twarzą do jego twarzy. Daje to możliwość przytulania się i całowania, przy jednoczesnej stymulacji łechtaczki przez tarcie o jego ciało.",
    illustration: '/images/illustrations/techniques/Pozycja_jeździec_(discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'pos-f8', 
    text: 'Pozycja "odwrócona amazońska"',
    description: "Siedzisz na partnerze tyłem do jego twarzy. Ta pozycja oferuje intensywną stymulację punktu G i pozwala Ci kontrolować tempo, jednocześnie dając mu fascynujący widok.",
    illustration: '/images/illustrations/techniques/Pozycja_odwrócona_amazońska_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Pozycja_leniwego_pieska_(discover).png',
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
    illustration: '/images/illustrations/techniques/Pozycja_kruka_(69)_(explore).png',
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
    illustration: '/images/illustrations/techniques/Pozycja_lotus_(discover,_explore,_exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'pos-f14', 
    text: 'Pozycja "łyżeczki"',
    description: "Oboje leżycie na boku, partner za Tobą. Przyjemna, delikatna pozycja, idealna na romantyczne chwile, pozwalająca na obejmowanie i intymną bliskość.",
    illustration: '/images/illustrations/techniques/Pozycja_łyżeczki_(discover).png',
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
    illustration: '/images/illustrations/techniques/Pozycja_mostek_(exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'rol-f1', 
    text: 'Nauczycielka i student',
    description: "Odgrywanie ról nauczycielki i ucznia - przejmujesz kontrolę w roli nauczycielki? Fantazja o władzy i wiedzy, gdzie Ty stajesz się przewodniczką, a on chętnym do nauki uczniem.",
    illustration: '/images/illustrations/techniques/Nauczycielka_i_student.png',
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
    illustration: '/images/illustrations/techniques/Randka_z_Tindera_(discover,_explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'rol-f3', 
    text: 'Samotna żona i "złota rączka"',
    description: "Odgrywanie fantazji o samotnej kobiecie i przystojnym hydrauliku/majsterkowiczu. Klasyczny scenariusz pełen napięcia seksualnego i spontaniczności, gdy on przychodzi coś naprawić.",
    illustration: '/images/illustrations/techniques/Złota_rączka_i_samotna_żona.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'rol-f4', 
    text: 'Pacjentka i lekarz',
    description: "Odgrywanie roli pacjentki badanej przez lekarza. Fantazja o profesjonalizmie, który zamienia się w intymne doświadczenie, pełne zaufania i odkrywania swojego ciała.",
    illustration: '/images/illustrations/techniques/Uwodzenie_np._pacjentka_i_lekarz.png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'toys-f1', 
    text: 'Zabawki dla niej',
    description: "Czy chciałabyś, żeby partner używał wibratorów i innych zabawek dla twojej przyjemności? Zabawki erotyczne mogą zintensyfikować orgazmy i otworzyć nowe wymiary przyjemności.",
    illustration: '/images/illustrations/techniques/Zabawki_dla_niej_(discover).png',
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
    description: "Czy chciałabyś eksperymentować z zabawkami dla przyjemności partnera? Akcesoria zaprojektowane dla mężczyzn mogą znacząco wzbogacić wasze wspólne doświadczenia seksualne.",
    illustration: '/images/illustrations/techniques/Zabawki_dla_niego_(discover).png',
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
    illustration: '/images/illustrations/techniques/Użycie_olejków_do_masażu_erotycznego_(discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'mas-f2', 
    text: 'Pieszczoty lodem i ciepłem',
    description: "Eksperymentowanie z kontrastami temperatur podczas pieszczot. Kostki lodu i ciepłe oleje mogą zintensyfikować doznania i uwrażliwić Twoją skórę na najlżejszy dotyk.",
    illustration: '/images/illustrations/techniques/Pieszczoty_lodem_i_ciepłem_(discover,_explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'mas-f3', 
    text: 'Seks po omacku',
    description: "Eksplorowanie ciała partnera bez użycia wzroku. Wyłączenie jednego zmysłu wzmacnia pozostałe, intensyfikując dotyk, smak i zapach, co prowadzi do niezwykłych doznań.",
    illustration: '/images/illustrations/techniques/Seks_po_omacku_(explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'adv-f1', 
    text: 'Zabawy z bitą śmietaną',
    description: "Smarowanie ciała partnera bitą śmietaną i zlizywanie jej. Słodka, zmysłowa zabawa łącząca przyjemności kulinarne z erotycznymi dla jeszcze intensywniejszych doznań.",
    illustration: '/images/illustrations/techniques/Zabawy_z_bitą_śmietaną_(explore,_exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'adv-f2', 
    text: 'Klatka na penisa',
    description: "Zabawka która kontroluje erekcję i orgazm Twojego partnera. Klatka na penisa to zaawansowana zabawka BDSM, która pozwala Ci przejąć pełną kontrolę nad jego męskością.",
    illustration: '/images/illustrations/techniques/Klatka_na_penisa_(exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['exceed'] 
    }
  },
  { 
    id: 'oral-f1', 
    text: 'Seks oralny dla niej',
    description: "Czy lubisz gdy partner pieści Cię ustami? Pieszczenie łechtaczki i warg sromowych językiem może doprowadzić do intensywnych orgazmów i głębokiej bliskości.",
    illustration: '/images/illustrations/techniques/Seks_oralny_dla_niej_(discover).png',
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
    description: "Czy lubisz sprawiać przyjemność partnerowi ustami? Pieszczenie penisa ustami to wyjątkowa forma intymności, która może być zarówno preludium jak i głównym punktem spotkania.",
    illustration: '/images/illustrations/techniques/Seks_oralny_dla_niego_(discover).png',
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
    description: "Zaawansowana technika seksu oralnego, gdzie przyjmujesz penisa głęboko do gardła. Wymaga zaufania, praktyki i komunikacji, ale może dawać partnerowi intensywne doznania.",
    illustration: '/images/illustrations/techniques/Głębokie_gardło_(exceed).png',
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
    illustration: '/images/illustrations/techniques/Masaż_tantryczny_dla_pary_(explore,_exceed).png',
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
    illustration: '/images/illustrations/techniques/Masaż_tantryczny_dla_niego_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Masaż_tantryczny_dla_niej_(discover,_explore).png',
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
    description: "Wielokrotne doprowadzanie partnera na skraj orgazmu i wstrzymywanie go. Ta technika daje Ci kontrolę nad jego przyjemnością i może prowadzić do znacznie intensywniejszych orgazmów.",
    illustration: '/images/illustrations/techniques/Jego_edging_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Jej_edging_(discover,_explore).png',
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
    description: "Pieszczenie penisa partnera między Twoimi piersiami. Ta technika może być zarówno formą gry wstępnej jak i doprowadzić go do orgazmu, dając Ci kontrolę nad jego przyjemnością.",
    illustration: '/images/illustrations/techniques/Titfuck_(discover,_explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'adv-f4', 
    text: 'Footjob',
    description: "Pieszczenie penisa partnera Twoimi stopami. Ta nietypowa forma pieszczot może być bardzo przyjemna dla niego i stanowić ekscytujące urozmaicenie waszego życia seksualnego.",
    illustration: '/images/illustrations/techniques/Footjob_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Fingering_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Wzajemna_masturbacja_(discover).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'striptiz-f1', 
    text: 'Striptiz dla niej',
    description: "Czy chciałabyś, żeby partner zatańczył dla Ciebie zmysłowy taniec rozbierany? Obserwowanie jak powoli odsłania swoje ciało może być niezwykle pobudzającym doświadczeniem.",
    illustration: '/images/illustrations/techniques/Striptiz_dla_niej_(discover).png',
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
    description: "Czy chciałabyś wykonać dla partnera taniec rozbierany? Zmysłowy pokaz może być doskonałą grą wstępną i sposobem na budowanie napięcia seksualnego przed zbliżeniem.",
    illustration: '/images/illustrations/techniques/Striptiz_dla_niego_(discover).png',
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
    description: "Czy lubisz nosić koronkową lub jedwabną bieliznę dla partnera? Elegancka bielizna może podkreślić walory Twojego ciała i stworzyć erotyczną atmosferę oczekiwania.",
    illustration: '/images/illustrations/techniques/Seksowna_bielizna_(discover).png',
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
    illustration: '/images/illustrations/techniques/Własny_film_erotyczny_(explore,_exceed).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'sensual-f3', 
    text: 'Sexting',
    description: "Czy lubisz wymieniać się z partnerem pikantymi wiadomościami i zdjęciami? Budowanie napięcia przez cały dzień może prowadzić do niezwykle namiętnego spotkania wieczorem.",
    illustration: '/images/illustrations/techniques/Sexting_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Dirty_talk_(discover).png',
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
    illustration: '/images/illustrations/techniques/Rozmowy_o_przeszłości_seksualnej_(exceed).png',
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
    illustration: '/images/illustrations/techniques/Wzajemna_lekka_dominacja_(discover,_explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'dom-f2', 
    text: 'On dominuje nad nią',
    description: "Pozwolenie partnerowi przejąć kontrolę nad seksem. Dla wielu par taki układ jest podniecający, daje poczucie bezpieczeństwa i pozwala spełniać różne fantazje.",
    illustration: '/images/illustrations/techniques/On_dominuje_nad_nią_(discover,_explore).png',
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
    description: "Przejęcie kontroli i kierowanie przebiegiem zbliżenia. Bycie dominującą może być niezwykle wyzwalające i pozwolić Ci odkryć nowe wymiary własnej seksualności.",
    illustration: '/images/illustrations/techniques/Ona_dominuje_nad_nim_(discover,_explore).png',
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
    illustration: '/images/illustrations/techniques/Pełna_dominacja_i_uległość_(exceed).png',
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
    illustration: '/images/illustrations/techniques/Seks_z_lekkim_podduszaniem_(explore).png',
    forConfig: { 
      userGender: 'female',
      partnerGender: 'male',
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'loc-f1', 
    text: 'Seks w miejscu publicznym',
    description: "Czy pociąga