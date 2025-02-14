/**
 * @jest-environment jsdom
 */

describe("Search functionality", () => {
  let searchInput, searchBtn, resultDisplay;

  beforeEach(() => {
    // Tvinga om-laddning av alla moduler så att script.js körs om varje test
    jest.resetModules();

    // Skapa en minimal HTML-struktur
    document.body.innerHTML = `
      <input type="text" id="searchInput" />
      <button id="searchBtn">Sök</button>
      <div id="resultDisplay"></div>
    `;

    // Sätt upp en (tom) global variabel 'persone' innan scriptet laddas
    // (Motsvarande 'var persone = ""' i en vanlig webbläsare.)
    window.persone = "";

    // Ladda in scriptet EFTER att vi har satt window.persone
    // Nu kan scriptet referera till 'persone' utan ReferenceError
    require("./src/script.js");

    // Hämta elementen för snabb åtkomst i testerna
    searchInput = document.getElementById("searchInput");
    searchBtn = document.getElementById("searchBtn");
    resultDisplay = document.getElementById("resultDisplay");
  });

  it("ska visa 'Namn hittades!Erik' om searchValue matchar persone", () => {
    // Sätt persone till något
    window.persone = "TestNamn";

    // Sätt samma text i inputfältet
    searchInput.value = "TestNamn";

    // Klicka på knappen
    searchBtn.click();

    // Koden loopar över people och eftersom 'found' blir true
    // men ingen "break" finns kommer sista värdet ('Erik') skrivas ut
    expect(resultDisplay.textContent).toBe("Namn hittades!Erik");
  });

  it("ska visa 'Namn hittades inte.' om searchValue INTE matchar persone", () => {
    // Sätt persone till ett värde
    window.persone = "TestNamn";

    // Men sätt input till något annat
    searchInput.value = "AnnatNamn";

    // Klicka på knappen
    searchBtn.click();

    // Då blir found aldrig true => "Namn hittades inte."
    expect(resultDisplay.textContent).toBe("Namn hittades inte.");
  });
});
