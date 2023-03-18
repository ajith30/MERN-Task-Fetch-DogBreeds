//Making request to the server and fetching the resources using fetch() with Async/await from Dog API
const getBreedList = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const message = data.message;

    const breedList = Object.keys(message);
    createDropdown(breedList);
  } catch (err) {
    console.log("The error is:", err);
  }
};

getBreedList();

// Creating Dropdown section to choose with all the Dogs Breed names
const createDropdown = (breedList) => {
  document.getElementById("breed").innerHTML = `
    <select class="form-select" onchange="showBreed(this.value)" name="" id="list">
        <option>Choose a dog breed</option>
        ${breedList
          .map((breed) => {
            return `<option>${breed}</option>`;
          })
          .join("")}
    </select>
    `;
};

//Displaying the different selected dog breed images for every 5 seconds.
const showBreed = async (breed) => {
  if (breed !== "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    const imageArray = data.message;
    generateDog(imageArray);
    setInterval(generateDog, 5000, imageArray);
  }
};

//Generating random number between imageArray and displaying the selected dog image.
const generateDog = (imageArray) => {
  const max = imageArray.length - 1;
  const min = 0;
  const dogs = Math.floor(Math.random() * (max - min + 1) + min);

  const dog = document.getElementById("dog-img");
  dog.innerHTML = `
    <img class="img-fluid rounded" src="${imageArray[dogs]}" alt="">
    `;
};
