import { Question } from './SurveyContext';

export const questionsDatabase: Question[] = [
  // POZYCJE SEKSUALNE
  { 
    id: 'p1', 
    text: 'Pozycja Amazonki',
    description: "Czy chcesz poczuć pełną kontrolę i intensyfikację doznań? Pozycja Amazonki daje możliwość prowadzenia rytmu i eksplorowania różnych kątów penetracji. Dzięki bliskiemu kontaktowi możecie obserwować swoje reakcje i budować napięcie, koncentrując się na własnym tempie oraz rytmie oddechu.",
    illustration: '/images/illustrations/positions/pozycja-amazonki.svg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'p2', 
    text: 'Pozycja misjonarska',
    description: "Czy cenisz bliskość i możliwość patrzenia sobie w oczy podczas intymnych chwil? Pozycja misjonarska to klasyczna i komfortowa forma bliskości, pozwalająca na głęboki kontakt zarówno fizyczny, jak i emocjonalny. Subtelne zmiany kąta lub tempa mogą całkowicie zmienić odczucia i sprawić, że ta pozycja stanie się jeszcze bardziej satysfakcjonująca.",
    illustration: '/images/illustrations/positions/missionary.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'p3', 
    text: 'Pozycja na pieska',
    description: "Czy masz ochotę na pozycję, która zapewnia intensywne doznania i daje przestrzeń do eksperymentowania? Pozycja na pieska pozwala na głębszą penetrację, a jednocześnie daje możliwość eksploracji dynamiki dominacji i uległości. Możecie dostosować kąt, tempo i intensywność do własnych preferencji, odkrywając nowe sposoby na budowanie napięcia i przyjemności.",
    illustration: '/images/illustrations/positions/doggy.svg',
    forConfig: { 
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'p5', 
    text: 'Pozycja syreny',
    description: "Czy chcesz doświadczyć pozycji, która sprzyja zarówno bliskości, jak i głębokim doznaniom? Pozycja syreny opiera się na delikatnych, płynnych ruchach i pełnym kontakcie ciał, co zwiększa intensywność przeżyć. Możesz eksplorować różne kąty, dostosowując ruchy do własnego komfortu i preferencji.",
    illustration: '/images/illustrations/positions/syrena.svg',
    forConfig: { 
      gameLevel: ['discover', 'explore', 'exceed'] 
    }
  },
  { 
    id: 'p6', 
    text: 'Pozycja na królową',
    description: "Czy masz ochotę na pozycję, która łączy komfort i możliwość kontroli tempa? Pozycja na królową pozwala na eksplorowanie głębszych doznań oraz bliskości, dając jednocześnie pełną swobodę ruchów i dostosowania rytmu do własnych potrzeb.",
    illustration: '/images/illustrations/positions/krolowa.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'p7', 
    text: 'Pozycja jeździec',
    description: "Czy chcesz w pełni kontrolować rytm i intensywność? Pozycja jeździec daje możliwość prowadzenia tempa i eksplorowania różnych kątów, pozwalając na większą świadomość własnych doznań. To doskonały sposób na zwiększenie intymności i urozmaicenie wspólnych chwil.",
    illustration: '/images/illustrations/positions/riding.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'p8', 
    text: 'Pozycja odwrócona amazońska',
    description: "Czy masz ochotę na odwróconą wersję klasycznej pozycji, która pozwala na nowe doznania i intensywniejsze odczuwanie bliskości? Pozycja odwrócona amazońska daje pełną kontrolę nad tempem i kątem penetracji, pozwalając na eksperymentowanie z różnymi rodzajami ruchów i stymulacji.",
    illustration: '/images/illustrations/positions/odwrocona.svg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'p9', 
    text: 'Pozycja leniwego pieska',
    description: "Czy szukasz pozycji, która zapewnia zarówno głębokie doznania, jak i wygodę? Pozycja leniwego pieska pozwala na komfortowe ułożenie ciała, sprzyjające zarówno delikatnym, jak i bardziej intensywnym ruchom. Świetna opcja dla tych, którzy cenią bliskość i swobodę eksploracji.",
    illustration: '/images/illustrations/positions/leniwa.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'p12', 
    text: 'Pozycja 69',
    description: "Czy chcesz odkrywać przyjemność w pozycji, która pozwala na jednoczesne doświadczanie przyjemności? Pozycja kruka, znana także jako 69, daje możliwość eksplorowania wzajemnych doznań, pozwalając na pogłębienie intymnej bliskości.",
    illustration: '/images/illustrations/positions/69.svg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },,

  // FANTAZJE I ODGRYWANIE RÓL
  { 
    id: 'r1', 
    text: 'Nauczycielka i student',
    description: "Czy masz ochotę na grę, w której jedna osoba przejmuje rolę doświadczonego nauczyciela, a druga ucznia, gotowego na nowe doznania? To klasyczna fantazja, która pozwala na eksplorację dynamiki dominacji i uległości w sposób pełen napięcia i ekscytacji. Możecie ustalić własne zasady tej gry i odkryć, jak różnorodne mogą być scenariusze prowadzące do wzajemnej przyjemności.",
    illustration: '/images/illustrations/roles/nauczycielka.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'r2', 
    text: 'Randka z Tindera',
    description: "Czy masz ochotę na ekscytację pierwszego spotkania, nawet jeśli znacie się od dawna? Fantazja związana z randką z nieznajomym może dodać dreszczyku emocji do Waszej relacji. Możecie umówić się w nowym miejscu, udawać, że spotykacie się po raz pierwszy i odkrywać się na nowo w atmosferze tajemnicy i flirtu.",
    illustration: '/images/illustrations/roles/leniwa.svg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'r3', 
    text: 'Złota rączka i samotna żona',
    description: "Czy masz ochotę na scenariusz pełen napięcia i subtelnej prowokacji? W tej grze jedna osoba wciela się w rolę odwiedzającego specjalisty, który nieoczekiwanie przyciąga uwagę drugiej. To okazja do eksperymentowania z uwodzeniem, stopniowym budowaniem napięcia i eksplorowania zakazanych fantazji w pełni bezpiecznym środowisku.",
    illustration: '/images/illustrations/roles/handyman.svg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'r4', 
    text: 'Uwodzenie, np. pacjentka i lekarz',
    description: "Czy kiedykolwiek fantazjowaliście o zakazanym pożądaniu w sytuacji, gdzie granice profesjonalizmu i namiętności zaczynają się zacierać? Możecie wcielić się w role, w których budowanie napięcia odbywa się powoli, przez spojrzenia, dotyk i subtelne gesty, aż do kulminacji pełnej intensywnych doznań.",
    illustration: '/images/illustrations/roles/leniwa.svg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'r5', 
    text: 'Pełna dominacja i uległość',
    description: "Czy jesteście gotowi na eksplorację skrajnych ról, w których jedna osoba przejmuje pełną kontrolę, a druga poddaje się intensywnym doznaniom? Ta fantazja pozwala na odkrywanie dynamiki władzy i uległości w atmosferze pełnego zaufania, komunikacji i wzajemnej zgody. Możecie eksplorować granice dominacji i uległości w sposób, który wzmacnia Waszą relację i pozwala na nowe formy intymności.",
    illustration: '/images/illustrations/roles/domination.svg',
    forConfig: { 
      gameLevel: ['exceed'] 
    }
  },

  // UROZMAICENIA I ZABAWKI
  { 
    id: 'u1', 
    text: 'Seksowna bielizna',
    description: "Czy zastanawiałaś/eś się, jak odpowiedni strój może wpłynąć na atmosferę i podniecenie? Seksowna bielizna to nie tylko element gry wstępnej, ale również sposób na budowanie pewności siebie i podkreślenie własnej atrakcyjności. Możecie wspólnie wybierać i odkrywać, jakie materiały, kolory i fasony najlepiej podkreślają Wasze atuty i podgrzewają atmosferę.",
    illustration: '/images/illustrations/toys/seksowna-bielizna.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'u2', 
    text: 'Sexting – wysyłanie treści erotycznych',
    description: "Czy masz ochotę na grę słów i obrazów, która podsyci napięcie między Wami nawet na odległość? Sexting to forma intymnej komunikacji, w której możecie dzielić się swoimi pragnieniami, budować napięcie poprzez opisy doznań i odkrywać, jak bardzo słowa mogą pobudzać wyobraźnię. To doskonały sposób na podtrzymywanie bliskości i eksperymentowanie z erotycznym językiem w komfortowy sposób.",
    illustration: '/images/illustrations/tools/sexting.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'u3', 
    text: 'Striptiz dla niej',
    description: "Czy chcesz, by napięcie budowało się stopniowo, a każda warstwa ubrania opadała w rytm muzyki? Striptiz to gra pełna uwodzenia i kontroli, w której liczy się nie tylko ruch, ale również kontakt wzrokowy, subtelne gesty i pewność siebie. Możesz pozwolić sobie na swobodę ekspresji, skupiając się na przyjemności płynącej z samego procesu uwodzenia.",
    illustration: '/images/illustrations/activities/striptiz-dla-niej.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 1
  },
  { 
    id: 'u4', 
    text: 'Striptiz dla niego',
    description: "Czy masz ochotę stać się obiektem pożądania, stopniowo odkrywając swoje ciało w grze pełnej napięcia? Striptiz to nie tylko taniec, ale również okazja do budowania pewności siebie i kontrolowania tempa uwodzenia. Liczy się każdy ruch, spojrzenie i delikatne prowokowanie, które stopniowo zwiększa ekscytację.",
    illustration: '/images/illustrations/activities/striptiz-dla-niego.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "striptiz",
    pairPriority: 2
  },
  { 
    id: 'u5', 
    text: 'Wspólne oglądanie filmów porno',
    description: "Czy zastanawialiście się, jak filmy erotyczne mogą stać się inspiracją do nowych doznań? Wspólne oglądanie filmów porno może być sposobem na otwartą rozmowę o preferencjach, fantazjach i pragnieniach, a także na eksplorowanie nowych pomysłów w komfortowej atmosferze. To okazja do dzielenia się swoimi reakcjami i odkrywania, co najbardziej Was pobudza.",
    illustration: '/images/illustrations/activities/oglądanie-filmow.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'u6', 
    text: 'Zmysłowy taniec erotyczny',
    description: "Czy chcesz uwodzić ruchem i spojrzeniem, budując napięcie między Wami krok po kroku? Zmysłowy taniec erotyczny pozwala na pełną ekspresję ciała i emocji, tworząc grę uwodzenia, w której napięcie rośnie z każdym kolejnym ruchem. To doskonały sposób na przełamanie barier, podniesienie pewności siebie i eksplorację erotycznej energii w nowy, ekscytujący sposób.",
    illustration: '/images/illustrations/activities/taniec-erotyczny.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'u7', 
    text: 'Zabawy z bitą śmietaną',
    description: "Czy macie ochotę na połączenie zmysłowych pieszczot z elementem niespodzianki? Zabawy z bitą śmietaną, czekoladą czy miodem to sposób na angażowanie wszystkich zmysłów i eksplorowanie nowych form przyjemności. Smak, zapach i dotyk łączą się w grę pełną śmiechu, przyjemności i ekscytującej spontaniczności.",
    illustration: '/images/illustrations/tools/bita-smietana.jpg',
    forConfig: { 
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'u8', 
    text: 'Rozbierany poker z obcymi',
    description: "Czy chcielibyście dodać do swojej intymności element ryzyka i ekscytacji? Rozbierany poker w towarzystwie innych osób to gra, w której napięcie buduje się stopniowo, a każdy ruch może prowadzić do coraz śmielszych odsłon. To okazja do eksplorowania granic komfortu, gry z pokusą i budowania napięcia w zupełnie nowym kontekście.",
    illustration: '/images/illustrations/activities/poker-obcy.jpg',
    forConfig: { 
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'u9', 
    text: 'Rozbierany poker ze znajomymi',
    description: "Czy masz ochotę na grę, która łączy napięcie, rywalizację i element ekscytacji? Rozbierany poker ze znajomymi to forma subtelnej prowokacji i budowania napięcia poprzez stopniowe odkrywanie siebie nawzajem. Grając, możecie testować swoje granice, sprawdzać reakcje i cieszyć się atmosferą nieskrępowanej zabawy, w której nie wszystko musi prowadzić do finału – czasem samo napięcie jest największą nagrodą.",
    illustration: '/images/illustrations/activities/poker-znajomi.jpg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'u10', 
    text: 'Cyberseks z obcymi',
    description: "Czy chcesz odkryć, jak anonimowość i dystans mogą podsycić erotyczne napięcie? Cyberseks z nieznajomymi to przestrzeń do eksploracji fantazji w bezpiecznych warunkach, pozwalająca na uwolnienie wyobraźni i odkrywanie nowych form podniecenia. Możesz eksperymentować z erotycznymi rozmowami, wymianą zdjęć lub wideo, poznając reakcje i preferencje drugiej strony, zachowując przy tym pełną kontrolę nad sytuacją.",
    illustration: '/images/illustrations/activities/cyberseks.jpg',
    forConfig: { 
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'u11', 
    text: 'Własny film erotyczny',
    description: "Czy zastanawialiście się, jak wyglądałoby zobaczenie siebie w roli głównych bohaterów własnej sceny erotycznej? Nagranie filmu może być nie tylko ekscytującym doświadczeniem, ale również okazją do lepszego poznania swojego ciała i preferencji. To doskonały sposób na eksplorowanie granic komfortu oraz stworzenie prywatnej, intymnej pamiątki, którą możecie odtwarzać i analizować w dowolnym momencie.",
    illustration: '/images/illustrations/activities/wlasny-film.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },

  // TECHNIKI I PRAKTYKI
  { 
    id: 't1', 
    text: 'Zabawy z opaską na oczy',
    description: "Czy chcesz odkryć, jak odcięcie jednego ze zmysłów może spotęgować intensywność doznań? Zabawy z opaską na oczy pozwalają na zwiększenie wrażliwości na dotyk, dźwięki i temperaturę, sprawiając, że każda pieszczota staje się bardziej ekscytująca. Element niespodzianki i brak kontroli dodają do gry intrygujące napięcie, które buduje atmosferę pełną oczekiwania i przyjemności.",
    illustration: '/images/illustrations/tools/opaska-na-oczy.jpg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 't2', 
    text: 'Pieszczoty lodem i ciepłem',
    description: "Czy masz ochotę na eksplorację nowych doznań poprzez kontrast temperatur? Pieszczoty lodem i ciepłem to technika, która potrafi wzmacniać intensywność doznań i pobudzać zmysły w nieoczekiwany sposób. Delikatne muśnięcia zimnym lodem, przeplatane ciepłym oddechem lub rozgrzanymi dłońmi, mogą otworzyć drzwi do zupełnie nowego poziomu przyjemności.",
    illustration: '/images/illustrations/tools/lod-cieplo.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 't3', 
    text: 'Użycie olejków do masażu erotycznego',
    description: "Czy masz ochotę na masaż, który zamienia się w grę pełną zmysłowości? Olejki do masażu sprawiają, że każdy dotyk jest bardziej płynny i intensywny, a ciała mogą się gładko ślizgać po sobie, wzmacniając wzajemne doznania. Możecie eksplorować powolne, długie ruchy, które pobudzają i relaksują jednocześnie, tworząc atmosferę pełną intymności i bliskości.",
    illustration: '/images/illustrations/tools/olejki-masaz.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 't4', 
    text: 'Seks z użyciem lodu lub ciepłych płynów',
    description: "Czy masz ochotę na pobudzenie zmysłów poprzez subtelne zmiany temperatury? Użycie lodu lub ciepłych płynów może wzmacniać doznania i sprawiać, że każdy dotyk staje się bardziej intensywny. Eksperymentowanie z temperaturą to świetny sposób na dodanie nowych bodźców do wspólnych chwil, pozwalając odkrywać reakcje ciała w intrygujący sposób.",
    illustration: '/images/illustrations/techniques/lod-plyny.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 't5', 
    text: 'Titfuck – międzypiersiowe zabawy penisem',
    description: "Czy masz ochotę na formę intymnej pieszczoty, która pozwala na bliski kontakt i eksplorację nowych doznań? Międzypiersiowe pieszczoty to technika, która może stanowić doskonały element gry wstępnej lub samodzielną formę przyjemności. Możecie eksperymentować z tempem, naciskiem i dodatkowymi bodźcami, aby w pełni dopasować doznania do własnych preferencji.",
    illustration: '/images/illustrations/techniques/titfuck.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 't6', 
    text: 'Footjob – pieszczenie penisa stopami',
    description: "Czy masz ochotę na eksplorację nowych form dotyku i stymulacji? Footjob to technika, która pozwala na użycie stóp jako narzędzia do pieszczot, dodając do gry element nieoczekiwanego podniecenia i zabawy. Możecie eksperymentować z tempem, naciskiem oraz wykorzystaniem dodatkowych bodźców, takich jak olejki do masażu, dla wzmocnienia doznań.",
    illustration: '/images/illustrations/techniques/footjob.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 't7', 
    text: 'Fingering – penetracja pochwy palcami',
    description: "Czy chcesz eksplorować przyjemność poprzez precyzyjne pieszczoty? Fingering pozwala na stopniowe budowanie napięcia i odkrywanie, które ruchy i techniki przynoszą najwięcej satysfakcji. Możecie skupić się na delikatnym pobudzaniu wrażliwych punktów, eksperymentując z różnymi rodzajami dotyku i nacisku, aby znaleźć to, co sprawia największą rozkosz.",
    illustration: '/images/illustrations/techniques/fingering.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 't8', 
    text: 'Po omacku – eksplorowanie ciała bez wzroku',
    description: "Czy chcesz doświadczyć intymności w sposób, który wyostrza każdy dotyk? Eksplorowanie ciała po omacku, bez użycia wzroku, pozwala skupić się na subtelnych bodźcach i stopniowym odkrywaniu nowych obszarów przyjemności. Możecie w pełni polegać na dotyku, oddechu i dźwiękach, budując napięcie i emocjonalne połączenie poprzez każdą chwilę spędzoną na tej zmysłowej podróży.",
    illustration: '/images/illustrations/techniques/po-omacku.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 't9', 
    text: 'Seks oralny dla niej',
    description: "Czy chcesz doświadczyć przyjemności poprzez zmysłowe, pełne uważności pieszczoty? Seks oralny to forma intymności, która pozwala na eksplorację czułych stref i budowanie napięcia poprzez różnorodne techniki stymulacji. Możecie eksperymentować z tempem, naciskiem i delikatnymi przerwami, aby odkryć, które ruchy przynoszą największą rozkosz. Kluczem jest uważność na reakcje i otwartość na komunikację, by stworzyć niezapomniane doznania.",
    illustration: '/images/illustrations/techniques/oral-dla-niej.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "seks-oralny",
    pairPriority: 1
  },
  { 
    id: 't10', 
    text: 'Seks oralny dla niego',
    description: "Czy chcesz odkryć, jak subtelność dotyku i rytm oddechu mogą intensyfikować przyjemność? Seks oralny to forma eksploracji, w której liczy się zarówno technika, jak i emocjonalne połączenie. Możecie eksperymentować z tempem, naciskiem i różnymi sposobami stymulacji, dopasowując rytm do reakcji ciała. To doskonały sposób na budowanie intymności i wzmacnianie wzajemnego zaufania.",
    illustration: '/images/illustrations/techniques/seks-oralny-dla-niego.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "seks-oralny",
    pairPriority: 2
  },
  { 
    id: 't11', 
    text: 'Wzajemna lekka dominacja',
    description: "Czy chcesz eksperymentować z dynamiką władzy i kontroli w sposób subtelny, a jednocześnie ekscytujący? Wzajemna lekka dominacja to gra oparta na zaufaniu, w której możecie zamieniać się rolami i odkrywać, jak przejmowanie inicjatywy wpływa na intensywność doznań. Delikatne komendy, ograniczenie ruchów czy kontrolowanie tempa to tylko niektóre elementy, które mogą dodać pikanterii i wzbogacić wspólne doświadczenia.",
    illustration: '/images/illustrations/techniques/wzajemna-dominacja.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 't12', 
    text: 'On dominuje nad nią',
    description: "Czy chcesz odkryć, jak poddanie się kontroli partnera może spotęgować intensywność doznań? Dominacja to nie tylko przejmowanie władzy, ale również świadomość, jak subtelne gesty, ton głosu czy kontrolowanie tempa mogą wpłynąć na budowanie napięcia. Kluczem do satysfakcjonującej dynamiki jest wzajemne zaufanie i otwartość na komunikację, by każda chwila była komfortowa i pełna ekscytacji.",
    illustration: '/images/illustrations/techniques/on-dominuje.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 't13', 
    text: 'Seks z lekkim podduszaniem',
    description: "Czy chcesz eksplorować intensywność doznań poprzez kontrolowane napięcie? Seks z lekkim podduszaniem to technika, która może potęgować odczucia, ale wymaga pełnej komunikacji i zaufania. Możecie eksperymentować z subtelnymi naciskami i kontrolą oddechu, zawsze dbając o bezpieczeństwo i komfort obu stron. Kluczem do udanej eksploracji tej fantazji jest stopniowe budowanie napięcia i reagowanie na potrzeby drugiej osoby.",
    illustration: '/images/illustrations/techniques/podduszanie.jpg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 't14', 
    text: 'Klatka na penisa',
    description: "Czy chcesz eksplorować sferę kontroli i poddaństwa w nowy, ekscytujący sposób? Klatka na penisa to element gry w dominację, który pozwala na budowanie napięcia i testowanie granic uległości. Możecie odkrywać, jak ograniczenie dostępu do przyjemności wpływa na wzajemne pożądanie i intensywność doznań, nadając grze element oczekiwania i kontrolowanej frustracji.",
    illustration: '/images/illustrations/toys/klatka-na-penisa.jpg',
    forConfig: { 
      gameLevel: ['exceed'] 
    }
  },

  // MIEJSCA
  { 
    id: 'm1', 
    text: 'Seks w samochodzie',
    description: "Czy chcesz dodać element spontaniczności i ekscytacji do Waszego życia intymnego? Seks w samochodzie łączy w sobie adrenalinę i bliskość, tworząc intensywne doznania nawet w ograniczonej przestrzeni. Możecie eksplorować różne pozycje, bawiąc się dynamiką ograniczonego ruchu i atmosferą zakazanej przyjemności, jednocześnie dbając o komfort i bezpieczeństwo.",
    illustration: '/images/illustrations/places/samochod.jpg',
    forConfig: { 
      gameLevel: ['discover', 'explore'] 
    }
  },
  { 
    id: 'm2', 
    text: 'Seks w trakcie kąpieli',
    description: "Czy chcesz połączyć relaksującą atmosferę kąpieli z eksploracją nowych doznań? Seks w wodzie dodaje wyjątkowej płynności ruchom i wzmacnia poczucie bliskości. Ciepła woda, delikatne światło i zapach olejków eterycznych mogą spotęgować atmosferę intymności, tworząc niepowtarzalne przeżycie pełne sensualności i głębokiego kontaktu.",
    illustration: '/images/illustrations/places/kapiel.jpg',
    forConfig: { 
      gameLevel: ['explore'] 
    }
  },
  { 
    id: 'm3', 
    text: 'Seks w windzie',
    description: "Czy ekscytuje Cię myśl o namiętnej chwili w miejscu, gdzie każdy moment może przynieść niespodziewaną przerwę? Seks w windzie łączy w sobie spontaniczność i element ryzyka, co może podnieść poziom ekscytacji. Ograniczona przestrzeń sprawia, że każdy dotyk jest bardziej intensywny, a świadomość, że drzwi mogą się w każdej chwili otworzyć, dodaje dreszczyku emocji.",
    illustration: '/images/illustrations/places/winda.jpg',
    forConfig: { 
      gameLevel: ['explore', 'exceed'] 
    }
  },
  { 
    id: 'm4', 
    text: 'Seks w miejscu publicznym',
    description: "Czy chcesz dodać do intymności element zakazanego dreszczyku? Seks w miejscu publicznym to fantazja związana z ekscytacją wynikającą z ryzyka bycia przyłapanym. Możecie eksplorować tę formę bliskości w sposób subtelny i kontrolowany, dbając o to, by każda chwila była pełna napięcia i emocji, a jednocześnie bezpieczna i zgodna z granicami komfortu.",
    illustration: '/images/illustrations/places/miejsce-publiczne.jpg',
    forConfig: { 
      gameLevel: ['explore', 'exceed'] 
    }
  },

  // KOMUNIKACJA I WZBOGACENIA
  { 
    id: 'k1', 
    text: 'Szeptanie do ucha i dirty talk',
    description: "Czy chcesz odkryć, jak bardzo słowa mogą pobudzać wyobraźnię i wzmacniać napięcie erotyczne? Szeptanie do ucha i dirty talk to sposoby na budowanie ekscytacji poprzez subtelne komunikaty, delikatne prowokacje i opisowanie pragnień. Możecie stopniowo eksplorować różne style – od czułych komplementów po bardziej odważne wyznania, dopasowując ton i treść do wzajemnych reakcji.",
    illustration: '/images/illustrations/communication/dirty-talk.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  },
  { 
    id: 'k2', 
    text: 'Zabawki dla niego',
    description: "Czy chcesz odkryć nowe sposoby na przyjemność, sięgając po gadżety erotyczne? Wibracyjne pierścienie, stymulatory prostaty czy masażery mogą otworzyć drzwi do nowych doznań i pomóc w eksploracji ciała w bardziej świadomy sposób. Możecie włączyć zabawki do wspólnej gry lub pozwolić na samotne eksperymentowanie, które pomoże lepiej poznać własne potrzeby.",
    illustration: '/images/illustrations/toys/zabawki-dla-niego.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "zabawki",
    pairPriority: 1
  },
  { 
    id: 'k3', 
    text: 'Zabawki dla niej',
    description: "Czy chcesz eksplorować swoje ciało na nowych poziomach przyjemności? Wibratory, masażery czy kulki gejszy mogą wzbogacić doświadczenia i pomóc w odkryciu intensywniejszych doznań. Możecie eksperymentować samodzielnie lub włączyć gadżety do wspólnych chwil, tworząc ekscytujące doświadczenie pełne nowych bodźców i możliwości.",
    illustration: '/images/illustrations/toys/zabawki-dla-niej.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "zabawki",
    pairPriority: 2
  },
  { 
    id: 'k4', 
    text: 'Jej edging',
    description: "Czy chciałabyś doświadczyć intensywniejszego, dłuższego orgazmu poprzez kontrolowanie momentu szczytowania? Edging polega na doprowadzaniu Cię do granicy rozkoszy, a następnie chwilowym przerwaniu stymulacji, by napięcie seksualne narastało. Twój partner może stosować różne techniki – od delikatnych pieszczot łechtaczki, przez seks oralny, po penetrację – zatrzymując się tuż przed szczytem, by po chwili zacząć od nowa. Ta metoda pozwala na stopniowe budowanie napięcia, zwiększając intensywność ostatecznej rozkoszy i sprawiając, że finał staje się jeszcze bardziej eksplozją przyjemności.",
    illustration: '/images/illustrations/techniques/edging-her.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "edging",
    pairPriority: 1
  },
  { 
    id: 'k5', 
    text: 'Jego edging',
    description: "Czy zastanawiałaś się, jak wydłużyć przyjemność partnera i sprawić, by jego orgazm był jeszcze intensywniejszy? Edging to technika polegająca na doprowadzaniu go do granicy szczytowania, a następnie zatrzymaniu stymulacji tuż przed kulminacją, pozwalając napięciu seksualnemu narastać. Możesz wykorzystać dłonie, usta lub inne formy pieszczot, obserwując jego reakcje i budując napięcie stopniowo. Powtarzanie tego cyklu kilka razy sprawia, że finał staje się znacznie mocniejszy i bardziej satysfakcjonujący, a jednocześnie pozwala Wam na dłuższą, bardziej intensywną grę wstępną.",
    illustration: '/images/illustrations/techniques/eding-him.svg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "edging",
    pairPriority: 2
  },
  { 
    id: 'k6', 
    text: 'Masaż tantryczny dla niego',
    description: "Czy chciałabyś podarować swojemu partnerowi chwilę niezwykłej zmysłowości, relaksu i głębokiej bliskości? Masaż tantryczny dla mężczyzny to praktyka, w której poświęcasz pełną uwagę jego ciału, zaczynając od delikatnych pieszczot stóp, nóg oraz pleców i stopniowo kierując się w stronę bardziej wrażliwych miejsc. Techniki tantryczne obejmują świadome oddychanie oraz uważne dotykanie, co pozwala partnerowi głębiej odczuwać przyjemność oraz buduje między Wami intensywną, emocjonalną więź.",
    illustration: '/images/illustrations/techniques/masaz-tantryczny-dla-niego.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "masaz-tantryczny",
    pairPriority: 1
  },
  { 
    id: 'k7', 
    text: 'Masaż tantryczny dla niej',
    description: "Czy myślałaś o tym, jakby to było, gdyby Twój partner całkowicie skupił się na celebrowaniu Twojego ciała i zmysłów? Masaż tantryczny to nie tylko forma relaksu, ale także sposób na pogłębienie intymnej więzi. Twój partner zaczyna od delikatnych, powolnych ruchów – najpierw na dłoniach i stopach, stopniowo przesuwając się w górę, by rozgrzać całe ciało. Każdy dotyk ma na celu pobudzenie energii i zwiększenie wrażliwości na przyjemność. Masaż obejmuje plecy, biodra, pośladki, piersi, aż po najbardziej wrażliwe strefy, pozwalając Ci całkowicie zanurzyć się w doznaniach. Nie chodzi o szybkie spełnienie, lecz o podróż przez ciało, która pozwala odkrywać przyjemność w nowy, głęboko zmysłowy sposób.",
    illustration: '/images/illustrations/techniques/masaz-tantryczny-dla-niej.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    },
    pairGroup: "masaz-tantryczny",
    pairPriority: 2
  },
  { 
    id: 'k8', 
    text: 'Slow sex',
    description: "Czy zastanawiałaś się nad tym, jak by było delektować się każdym momentem bliskości, świadomie zwalniając tempo stosunku? Slow sex pozwala na skupienie się na każdym ruchu, każdym dotyku i każdym pocałunku, zwiększając poczucie bliskości emocjonalnej i fizycznej. Kluczową zasadą slow seksu jest świadome oddychanie i zwolnienie tempa, co pozwala na intensyfikację doznań oraz głębsze przeżywanie wzajemnej obecności. Dzięki tej praktyce możecie nauczyć się czerpać przyjemność z całej drogi, nie tylko z finału, budując jednocześnie głębszą, bardziej świadomą więź.",
    illustration: '/images/illustrations/techniques/slow-sex.jpg',
    forConfig: { 
      gameLevel: ['discover'] 
    }
  }
];