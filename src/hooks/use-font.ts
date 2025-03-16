
import { useState, useEffect } from 'react';

export function useFont() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const fontVariables = "font-sans antialiased";

  useEffect(() => {
    // Tutaj mogłaby być logika ładowania czcionek
    setFontLoaded(true);
  }, []);

  return fontVariables;
}
