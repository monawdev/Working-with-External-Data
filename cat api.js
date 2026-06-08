const breedSelect = document.getElementById("breedSelect");

const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.thecatapi.com/v1";

async function initialLoad() {
  try {
    const response = await fetch(`${BASE_URL}/breeds`, {
      headers: {
        "x-api-key": API_KEY
      }
    });

    const breeds = await response.json();

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;

      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to load breeds:", error);
  }
}

initialLoad();