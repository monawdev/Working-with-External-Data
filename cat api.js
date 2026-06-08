const breedSelect = document.getElementById("breedSelect");

const API_KEY = "live_mwfq0dh7VonMxaxQGXO0WDaO8WOX9mlX8sKAWCzz59QcNst2oJsV3sQx0XwnnU8r";
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

breedSelect.addEventListener("change", async (e) => {
  const breedId = e.target.value;

  const carousel = document.getElementById("carousel");
  const infoDump = document.getElementById("infoDump");

  // clear old content
  carousel.innerHTML = "";
  infoDump.innerHTML = "";

  try {
    const response = await fetch(
      `${BASE_URL}/images/search?breed_ids=${breedId}&limit=5`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    const images = await response.json();

    // 🖼️ build carousel images
    images.forEach((imgObj) => {
      const img = document.createElement("img");
      img.src = imgObj.url;
      img.style.width = "200px";
      carousel.appendChild(img);
    });

    // 📄 breed info
    const breed = images[0]?.breeds?.[0];

    if (breed) {
      infoDump.innerHTML = `
        <h2>${breed.name}</h2>
        <p>${breed.description}</p>
        <p><strong>Origin:</strong> ${breed.origin}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
      `;
    }

  } catch (error) {
    console.error("Error loading breed images:", error);
  }
});