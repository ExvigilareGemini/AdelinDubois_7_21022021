const arrayOfObjetForSearch = [];
const objectOfArraysForDropdown = {
  ingredients: [],
  appareils: [],
  ustensils: [],
};

const colorsOfDropwdown = ['primary', 'info', 'warning'];
let countForColorsOfDropdown = -1;

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// DYNAMIC CREATION OF HTML BASED ON RECIPE.JS.
// _________________________________________________________________________________________________

// _________________________________________________________________________________________________
// CREATION OF DROPDOWNS BUTTON

// populate arrays ingredient, appareils & ustensils in objectOfArraysForDropdown
function populateObjectOfArraysForDropdown() {
  arrayOfObjetForSearch.forEach((el) => {
    // populate ingredient[]
    el.ingredients.forEach((ingredientArray) => {
      let isInArray = false;

      objectOfArraysForDropdown.ingredients.forEach((ingredientDropdown) => {
        if (ingredientArray.ingredient === ingredientDropdown) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        objectOfArraysForDropdown.ingredients.push(ingredientArray.ingredient);
      }
    });

    // populate ustensils[]
    el.ustensils.forEach((ustensilArray) => {
      let isInArray = false;

      objectOfArraysForDropdown.ustensils.forEach((ustensilDropdown) => {
        if (ustensilArray === ustensilDropdown) {
          isInArray = true;
        }
      });
      if (!isInArray) {
        objectOfArraysForDropdown.ustensils.push(ustensilArray);
      }
    });

    // populate appareil[]
    let isInArray = false;
    objectOfArraysForDropdown.appareils.forEach((appareilDropdown) => {
      if (el.appareils === appareilDropdown) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      objectOfArraysForDropdown.appareils.push(el.appareils);
    }
  });
}

// creating HTML of a dropdown button, using key value to gat datas in objectOfArraysForDropdown
// set the color, title(first letter uppercase) and listing every elements contain in corresponding
// element (ingredient, appareil et ustensil)
function dropdownHTMLGenerator(key) {
  countForColorsOfDropdown += 1;
  return `
    <div class="dropdown mt-3 col-12 col-md-3 col-lg-2" >
        <button class="btn btn-secondary dropdown-toggle bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0 w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
        <form class="dropdown-menu dropdown-large bg-${colorsOfDropwdown[countForColorsOfDropdown]} text-white" aria-labelledby="dropdownMenuButton">
            <div class="d-flex flex-wrap" data-category="${key}">
                ${objectOfArraysForDropdown[key].map((el) => `
                <a class="w-50 dropdown-item text-truncate" href="#">${el}</a>
                `).join('')}
            </div>
        </form>
    </div>
    `;
}

// return compiled html with map and join, using keys of objectOfArraysForDropdown and calling
// dropdownHTMLGenerator
function dropdownHTMLCompiler() {
  const keys = Object.keys(objectOfArraysForDropdown);
  const arrayToReturn = keys.map(dropdownHTMLGenerator).join('');
  return arrayToReturn;
}

// _________________________________________________________________________________________________
// CREATION OF CARDS

// F04
// Create the array of object used for the search functionnality
function createArrayOfObjectsForSearch(data) {
  arrayOfObjetForSearch.push({
    id: data.id,
    title: data.name,
    ingredients: data.ingredients,
    description: data.description,
    appareils: data.appliance,
    ustensils: data.ustensils,
  });
}

// display the value if not undefined
function displayIfNotUndefined(value) {
  if (value !== undefined) {
    return value;
  }

  return '';
}

// F05
// generate html content of 1 photographer displayed (.photograph) using template strings and
// populate with objectphotographer
// call F04 to create th array of object used for the searching
// argument: object photographer from data.json
function cardsHTMLGenerator(data) {
  createArrayOfObjectsForSearch(data);
  return `
            <div class="card mh-500 col-12 col-md-6 mt-3 p-0" data-id="${data.id}">
                <img src="./assets/src/red.png" style="height: 230px; width: 100%; display: block;" class="card-img-top" alt="image">
                <div class="card-body">
                    <div class="row">
                        <h5 class="card-title col-6">${data.name}</h5>
                        <p class="card-text col-6 text-end"><span class="far fa-clock"></span><b>${data.time}min</b></p>
                    </div>
                    <div class="row">
                        <div class="container col-6">
                        ${data.ingredients.map((ingredient) => `
                        <p class=" card-text mb-0">  <b>${ingredient.ingredient}</b>: ${displayIfNotUndefined(ingredient.quantity)} ${displayIfNotUndefined(ingredient.unit)}</p>`).join('')}
                        </div>
                        <div class="container col-6">
                            <p class="block-with-text">${data.description}</p>
                        </div>
                            
                    </div>
                </div>
            </div>`;
}

// F06
// function that create all the block of HTML that is needed to be displayed,
// takes data and create a new array using .map and F05 (cardsHTMLGenerator)
// argument: datas from JSON
function cardHTMLCompiler(data) {
  return data.map(cardsHTMLGenerator).join('');
}

// _________________________________________________________________________________________________
// INSERTING HTML AND FETCH DATAS

// F08
// function inserting HTML create in F06 (cardHTMLCompiler),
// then call F07 (isRedirectFromPhotographerPage)
// argument: is datas form JSON passing to F09 (fetchDataToCreateIndexHTML)
function insertCreatedHTML(data) {
  document.querySelector('.container-cards').insertAdjacentHTML('afterbegin', cardHTMLCompiler(data));
  populateObjectOfArraysForDropdown();
  document.querySelector('.container-dropdown').insertAdjacentHTML('beforeend', dropdownHTMLCompiler());
}

// F09
// function that get datas in the /src/data.json and chain with .then
// the response is tranform into json, then call F08
// called in index.html
function fetchDataToCreateCardHTML() {
  fetch('./controller/src/recipes.js')
    .then((resp) => resp.json())
    .then((data) => insertCreatedHTML(data))
    .catch((error) => console.log(`Erreur : ${error}`));
}
