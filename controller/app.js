const arrayOfObjetForSearch = [];

const objectOfArraysForDropdown = {
  ingredients: [],
  appareils: [],
  ustensils: [],
};

const toCompareForTags = [];

const isADropdownOpen = {
  isOpen: false,
  category: '',
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
    <div class="mt-3 col-12 col-md-3 col-lg-2 dropdown" data-category="${key}">
      <div class="container p-1">
        <div class="row">
          <div class="btn-group p-0">
            <button class="col-11 col-md-9 btn btn-secondary btn-morphing bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0" type="button" data-category="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</button>
            <input class="col-11 text-morphing bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0 rounded-start" data-category="${key}" data-hidden="true" placeholder="Rechercher parmis les ${key}">
            <button class="col btn btn-secondary dropdown-toggle dropdown-toggle-split bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0" id="dropdownMenuButton" type="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" data-category="${key}"></button>
            <form class="dropdown-menu bg-${colorsOfDropwdown[countForColorsOfDropdown]} text-white" aria-labelledby="dropdownMenuButton" data-category="${key}">
                <div class="d-flex flex-wrap" data-category="${key}" data-color="${colorsOfDropwdown[countForColorsOfDropdown]}">
                    ${objectOfArraysForDropdown[key].map((el) => `
                    <a class="w-item dropdown-item text-truncate" data-category="${key}" data-content="${el.toLowerCase()}" href="#" data-category="${key}">${el}</a>
                    `).join('')}
                </div>
            </form>
          </div>
        </div>
      </div>
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
          <div class="col mt-3">
            <div class="card h-100" data-id="${data.id}">
                <img src="./assets/src/OC.jpg" style="height: 230px; width: 100%; display: block;" class="card-img-top fit-img" alt="image">
                <div class="card-body">
                    <div class="row">
                        <h5 class="card-title col">${data.name}</h5>
                        <p class="card-text col-4 text-end"><span class="far fa-clock"></span><b>${data.time}min</b></p>
                    </div>
                    <div class="row fs-7">
                        <div class="container col-6">
                        ${data.ingredients.map((ingredient) => `
                        <p class=" card-text mb-0">  <b>${ingredient.ingredient}</b>: ${displayIfNotUndefined(ingredient.quantity)} ${displayIfNotUndefined(ingredient.unit)}</p>`).join('')}
                        </div>
                        <div class="container col-6">
                            <p class="truncate-multilign">${data.description}</p>
                        </div>
                            
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
// FILLING DATAS

function populateArrayToCompareForTags() {
  arrayOfObjetForSearch.forEach((el) => {
    const arrayToPush = [];
    arrayToPush.push(el.appareils);
    el.ustensils.forEach((ustensil) => arrayToPush.push(ustensil));
    el.ingredients.forEach((ingredient) => arrayToPush.push(ingredient.ingredient));
    toCompareForTags.push({
      id: el.id,
      values: arrayToPush,
    });
  });
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
  populateArrayToCompareForTags();
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

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// DROPDOWN DISPLAYING
// _________________________________________________________________________________________________

// make container of dropdown bigger while dropdown is open for screen bigger than 768px
// category is for which dropdown, openClose tell if i'm opening or closing. When opening dropdown
// the container get bigger, it get his initial size when closing
function biggerContainer(category, openClose) {
  const dropdownContainer = document.querySelector(`.dropdown[data-category="${category}"]`);
  const mediaQuery = 'screen and (min-width:768px)';
  const matched = window.matchMedia(mediaQuery).matches;

  if (openClose) {
    matched ? dropdownContainer.classList.add('w-50') : '';
  } else {
    matched ? dropdownContainer.classList.remove('w-50') : '';
  }
}

// open or close dropdown menu, category correspond to data-category in DOM, openClose is bool
// true -> opening | false -> closing
function openCloseDropdown(category, openClose) {
  const dropdownForm = document.querySelector(`.dropdown-menu[data-category="${category}"]`);
  const morphingBtn = document.querySelector(`.btn-morphing[data-category="${category}"]`);
  const morphingText = document.querySelector(`.text-morphing[data-category="${category}"]`);

  dropdownForm.classList.toggle('show');
  morphingText.dataset.hidden = !openClose;
  morphingBtn.dataset.hidden = openClose;
  biggerContainer(category, openClose);
}

document.querySelector('.container-dropdown').addEventListener('click', (event) => {
  const targetCategory = event.target.dataset.category;
  let isOpenToReturn = true;
  let categoryToReturn = targetCategory;

  if (event.target.tagName === 'BUTTON') {
    if (isADropdownOpen.isOpen) {
      if (isADropdownOpen.category === targetCategory) {
        openCloseDropdown(targetCategory, false);
        isOpenToReturn = false;
        categoryToReturn = '';
      } else {
        openCloseDropdown(isADropdownOpen.category, false);
        openCloseDropdown(targetCategory, true);
      }
    } else {
      openCloseDropdown(targetCategory, true);
    }

    isADropdownOpen.isOpen = isOpenToReturn;
    isADropdownOpen.category = categoryToReturn;
  }

  if (event.target.tagName === 'A') {
    const contentOfTag = event.target.dataset.content;
    const search = new Searching(1, 2, contentOfTag);

    // add or remove tag from DOM
    search.toggleTag();

    // closing dropdown
    openCloseDropdown(targetCategory, false);
    isADropdownOpen.isOpen = false;
    isADropdownOpen.category = '';
  }
});


document.querySelector('.container-tag').addEventListener('click', (event) => {
  // while I click on the closing cross of a tag, it remove the concerned tag
  if (event.target.tagName === 'IMG') {
    const contentOfTag = event.target.parentNode.dataset.content;
    const search = new Searching('', '', contentOfTag);

    // add or remove tag from DOM
    search.toggleTag();
  }
});