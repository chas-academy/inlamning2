/**
 * @jest-environment jsdom
 */
import { initSearch } from "./src/script.js";

describe("Test av sökfunktionalitet", () => {
  beforeEach(() => {
    // Nollställ (eller återskapa) DOM inför varje test
    document.body.innerHTML = `
      <input type="text" id="searchInput" />
      <button id="searchBtn">Sök</button>
      <div id="resultDisplay"></div>
    `;
  });

  test("visar 'Namn hittades: X' när namnet finns i arrayen", () => {
    // 1. Definiera en godtycklig people-array
    const people = ["Anna", "Johan", "Lisa", "Erik"];

    // 2. Initiera vår sökfunktionalitet med arrayen
    initSearch(people);

    // 3. Mata in ett namn som vi vet finns i listan
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "Lisa";

    // 4. Simulera klick på "Sök"-knappen
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.click();

    // 5. Förvänta oss att resultatet uppdateras korrekt
    const resultDisplay = document.getElementById("resultDisplay");
    expect(resultDisplay.textContent).toBe("Namn hittades: Lisa");
  });

  test("visar 'Namn hittades inte.' när namnet saknas i arrayen", () => {
    // 1. Definiera en godtycklig people-array (kan vara en helt annan)
    const people = ["Kalle", "Beata", "Zara"];

    // 2. Initiera vår sökfunktionalitet
    initSearch(people);

    // 3. Mata in ett namn som inte finns i vår (godtyckliga) lista
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "Anna"; // Finns inte i ["Kalle", "Beata", "Zara"]

    // 4. Simulera klick
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.click();

    // 5. Kontrollera resultat
    const resultDisplay = document.getElementById("resultDisplay");
    expect(resultDisplay.textContent).toBe("Namn hittades inte.");
  });
});
