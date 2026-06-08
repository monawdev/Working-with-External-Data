const breedSelect = document.getElementById("breedSelect");
const carousel = document.getElementById("carousel");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// ✅ YOUR API KEY
const API_KEY = "live_mwfq0dh7VonMxaxQGXO0WDaO8WOX9mlX8sKAWCzz59QcNst2oJsV3sQx0XwnnU8r";

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

// ---------------- INTERCEPTORS ----------------
axios.interceptors.request.use((config) => {
  document.body.style.cursor = "progress";
  progressBar.style.width = "0%";
  return config;
});

axios.interceptors.response.use((response) => {
  document.body.style.cursor = "default";
  return response;
});

// ---------------- PROGRESS ----------------
function updateProgress(event) {
  if (!event.total) return;

  const percent = Math.round((event.loaded * 100) / event.total);
  progressBar.style.width = percent + "%";
}

// ---------------- RENDER CAROUSEL ----------------
function renderCarousel(images) {
  carousel.innerHTML = "";

  images.forEach((img) => {
    const image = document.createElement("img");
    image.src = img.url;
    image.dataset.id = img.id;
    carousel.appendChild(image);
  });
}

// ---------------- LOAD BREEDS ----------------
async function loadBreeds() {
  const res = await axios.get("/breeds");

  res.data.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

loadBreeds();

// ---------------- BREED CHANGE ----------------
breedSelect.addEventListener("change", async (e) => {
  const breedId = e.target.value;

  if (!breedId) return;

  const res = await axios.get("/images/search", {
    params: {
      breed_ids: breedId,
      limit: 5
    },
    onDownloadProgress: updateProgress
  });

  const images = res.data;

  renderCarousel(images);

  const breed = images[0]?.breeds?.[0];

  if (breed) {
    infoDump.innerHTML = `
      <h2>${breed.name}</h2>
      <p>${breed.description}</p>
      <p><b>Origin:</b> ${breed.origin}</p>
      <p><b>Temperament:</b> ${breed.temperament}</p>
    `;
  }
});

// ---------------- FAVORITES ----------------
async function toggleFavourite(imageId) {
  await axios.post("/favourites", {
    image_id: imageId
  });
}

// click image to favorite
carousel.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    toggleFavourite(e.target.dataset.id);
  }
});

// ---------------- GET FAVORITES ----------------
getFavouritesBtn.addEventListener("click", async () => {
  const res = await axios.get("/favourites");

  const images = res.data.map((fav) => ({
    url: fav.image.url,
    id: fav.image_id
  }));

  renderCarousel(images);
  infoDump.innerHTML = "<h2>Favorites</h2>";
});

// ---------------- LOAD BREEDS ----------------
async function loadBreeds() {
  const res = await axios.get("/breeds");

  res.data.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

loadBreeds();

// ---------------- BREED CHANGE ----------------
breedSelect.addEventListener("change", async (e) => {
  const breedId = e.target.value;

  if (!breedId) return;

  const res = await axios.get("/images/search", {
    params: {
      breed_ids: breedId,
      limit: 5
    },
    onDownloadProgress: updateProgress
  });

  const images = res.data;

  renderCarousel(images);

  const breed = images[0]?.breeds?.[0];

  if (breed) {
    infoDump.innerHTML = `
      <h2>${breed.name}</h2>
      <p>${breed.description}</p>
      <p><b>Origin:</b> ${breed.origin}</p>
      <p><b>Temperament:</b> ${breed.temperament}</p>
    `;
  }
});

// ---------------- FAVORITES ----------------
async function toggleFavourite(imageId) {
  await axios.post("/favourites", {
    image_id: imageId
  });
}

// click image to favorite
carousel.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    toggleFavourite(e.target.dataset.id);
  }
});

// ---------------- GET FAVORITES ----------------
getFavouritesBtn.addEventListener("click", async () => {
  const res = await axios.get("/favourites");

  const images = res.data.map((fav) => ({
    url: fav.image.url,
    id: fav.image_id
  }));

  renderCarousel(images);
  infoDump.innerHTML = "<h2>Favorites</h2>";
});