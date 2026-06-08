<<<<<<< HEAD
async function initialLoad() {
  const response = await fetch("API_URL");
  const breeds = await response.json();

  breeds.forEach((breed) => {
    const option = document.createElement("option");

    option.value = breed.id;
    option.textContent = breed.name;

    breedSelect.appendChild(option);
  });
}

=======
async function initialLoad() {
  const response = await fetch("API_URL");
  const breeds = await response.json();

  breeds.forEach((breed) => {
    const option = document.createElement("option");

    option.value = breed.id;
    option.textContent = breed.name;

    breedSelect.appendChild(option);
  });
}

>>>>>>> 4aacada5b6fbada8658bef9c51ada3f74df5bc4d
initialLoad();