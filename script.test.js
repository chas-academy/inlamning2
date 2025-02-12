/**
 * @jest-environment jsdom
 */

// In most Jest setups, you do *not* need to import { expect } from "@jest/globals";
// Jest provides a global `expect` automatically.

describe("Search functionality", () => {
  beforeEach(() => {
    // Sätt upp en "falsk" HTML-struktur
    document.body.innerHTML = `
      <input type="text" id="searchInput" />
      <button id="searchBtn">Sök</button>
      <div id="resultDisplay"></div>
    `;

    require("./src/script.js");
  });

  it("Name found", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const resultDisplay = document.getElementById("resultDisplay");

    // Mock the search function
    const mockSearchFunction = jest.fn((name) => `Namn hittades: ${name}`);
    window.searchFunction = mockSearchFunction;

    const testName = "Anna";
    searchInput.value = testName;
    searchBtn.click();

    // Kontrollera resultatet
    expect(mockSearchFunction).toHaveBeenCalledWith(testName);
    expect(resultDisplay.textContent).toBe(`Namn hittades: ${testName}`);
  });
});
