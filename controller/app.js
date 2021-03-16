const arrayOfRecipes = [];

const tagChecked = [];

const objectOfArraysForDropdown = {
  ingredients: [],
  appareils: [],
  ustensils: [],
};

const isADropdownOpen = {
  isOpen: false,
  category: '',
};

const colorsOfDropwdown = ['primary', 'info', 'warning'];
let countForColorsOfDropdown = -1;

const arrayOfObjectForFiltering = [];

const dropdownCategories = ['ingredients', 'appareils', 'ustensils'];

let isItAClosingTagClick = false;
let valueIsComingFromMainInput = false;
let mainInputLessThan3Caracters = true;

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// DYNAMIC CREATION OF HTML & FILLING DATAS
// _________________________________________________________________________________________________

// _________________________________________________________________________________________________
// FILLING DATAS

/**
 * Populate the array of object arrayOfRecipes
 *
 * @param {object} data Object from recipes.json
 */
function populateArrayOfRecipes(data) {
  arrayOfRecipes.push({
    id: data.id,
    title: data.name,
    ingredients: data.ingredients,
    description: data.description,
    appareils: data.appliance,
    ustensils: data.ustensils,
  });
}

/**
 * Populate arrays ingredient, appareils & ustensils in objectOfArraysForDropdown with arrayOfRecipes
 */
function populateObjectOfArraysForDropdown() {
  arrayOfRecipes.forEach((el) => {
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

/**
 * Populate the array of object used for the filtering functionnality with arrayOfRecipes
 */
function populateArrayForFiltering() {
  arrayOfRecipes.forEach((el) => {
    const ustensildOfObj = el.ustensils.join('|');
    const ingredientsOfObject = el.ingredients.map((a) => a.ingredient.toLowerCase()).join('|');

    arrayOfObjectForFiltering.push({
      id: el.id,
      title: el.title,
      ingredients: ingredientsOfObject,
      description: el.description,
      appareils: el.appareils,
      ustensils: ustensildOfObj,
    });
  });
}

// _________________________________________________________________________________________________
// CREATION OF DROPDOWNS BUTTON

/**
 * Creating HTML of a dropdown button, using key param to get datas in objectOfArraysForDropdown
 *
 * @param {string} key Name of the category (ingredients, appareils or ustensils)
 * @returns {string} HTML of a dropdown button
 */
function dropdownHTMLGenerator(key) {
  countForColorsOfDropdown += 1;
  return `
    <div class="mt-3 col-12 col-md-3 col-lg-2 dropdown" data-category="${key}">
      <div class="container p-1">
        <div class="row">
          <div class="btn-group p-0">
            <button class="col-11 col-md-9 btn btn-secondary btn-morphing bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0" type="button" data-category="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</button>
            <input class="col-11 text-morphing bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0 rounded-start" data-category="${key}" data-hidden="true"" placeholder="Rechercher parmis les ${key}">
            <button class="col btn btn-secondary dropdown-toggle dropdown-toggle-split bg-${colorsOfDropwdown[countForColorsOfDropdown]} border-0" id="dropdownMenuButton" type="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" data-category="${key}"></button>
            <form class="dropdown-menu bg-${colorsOfDropwdown[countForColorsOfDropdown]} text-white w-100" aria-labelledby="dropdownMenuButton" data-category="${key}">
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

/**
 * Fusionning each block of HTML string from function dropdownHTMLGenerator into one
 *
 * @returns {string} HTML block of all dropdown
 */
function dropdownHTMLFusion() {
  const keys = Object.keys(objectOfArraysForDropdown);
  const stringToReturn = keys.map(dropdownHTMLGenerator).join('');
  return stringToReturn;
}

// _________________________________________________________________________________________________
// CREATION OF CARDS

/**
 * Creating HTML of a card, using object data coming from recipes.json
 *
 * @param {object} data Object from recipes.json
 * @returns {string} HTML of a card
 */
function cardsHTMLGenerator(data) {
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
                        <p class=" card-text mb-0">  <b>${ingredient.ingredient}</b>: ${ingredient.quantity !== undefined ? ingredient.quantity : ''} ${ingredient.unit !== undefined ? ingredient.unit : ''}</p>`).join('')}
                        </div>
                        <div class="container col-6">
                            <p class="truncate-multilign">${data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>`;
}

/**
 * Fusionning each block of HTML string from function cardsHTMLGenerator into one
 *
 * @param {object[]} datas Array of objects from recipes.json
 * @returns {string} HTML block of all cards
 */
function cardHTMLFusion(datas) {
  return datas.map(cardsHTMLGenerator).join('');
}

// _________________________________________________________________________________________________
// INSERTING HTML AND FETCH DATAS

/**
 * Insert created HTML inside index.html
 *
 * @param {object[]} datas Array of objects from recipes.json
 */
function insertCreatedHTML(datas) {
  document.querySelector('.container-cards').insertAdjacentHTML('afterbegin', cardHTMLFusion(datas));
  document.querySelector('.container-dropdown').insertAdjacentHTML('beforeend', dropdownHTMLFusion());
}

/**
 * Function caller, first filling datas then HTML creator
 *
 * @param {object[]} datas Array of objects from recipes.json
 */
function computingDatas(datas) {
  datas.forEach((data) => { populateArrayOfRecipes(data); });
  populateObjectOfArraysForDropdown();
  populateArrayForFiltering();
  insertCreatedHTML(datas);
}

/** Fetch datas about recipes inside recipes.json
 *
 */
function fetchDataToCreateHTML() {
  fetch('./controller/src/recipes.json')
    .then((resp) => resp.json())
    .then((datas) => computingDatas(datas))
    .catch((error) => console.log(`Erreur : ${error}`));
}

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// DROPDOWN DISPLAYING
// _________________________________________________________________________________________________

/** Making dropdown bigger/smaller when opening/closing dropdown when screen width > 767px
 *
 * @param {string} category Category of the dropdown (ingredients, appareils, ustensils)
 * @param {boolean} openClose True -> opening dropdown | False -> closing dropdown
 */
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

/** Open or close the dropdown corresponding to category
 *
 * @param {string} category Category of the dropdown (ingredients, appareils, ustensils)
 * @param {boolean} openClose True -> opening dropdown | False -> closing dropdown
 */
function openCloseDropdown(category, openClose) {
  const dropdownForm = document.querySelector(`.dropdown-menu[data-category="${category}"]`);
  const morphingBtn = document.querySelector(`.btn-morphing[data-category="${category}"]`);
  const morphingText = document.querySelector(`.text-morphing[data-category="${category}"]`);

  dropdownForm.classList.toggle('show');
  morphingText.dataset.hidden = !openClose;
  morphingBtn.dataset.hidden = openClose;
  biggerContainer(category, openClose);
}

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// CONTENT DISPLAYING
// _________________________________________________________________________________________________

/** Display the content of one dropdown corresponding to category
 *
 * @param {strings[]} newArrayFiltered Array containing the content of the dropdown
 * @param {strings} categoryOfDropdown Category of the dropdown to refresh
 */
function refreshContentOfDropdown(newArrayFiltered, categoryOfDropdown) {
  document.querySelectorAll(`.dropdown-item[data-category="${categoryOfDropdown}"]`).forEach((el) => {
    el.dataset.hidden = true;
  });
  newArrayFiltered.forEach((valueFiltered) => {
    document.querySelector(`.dropdown-item[data-content="${valueFiltered.toLowerCase()}"]`).dataset.hidden = false;
  });
}

/** Display the content of each dropdowns using array dropdownContentToDisplay
 *
 */
function refreshContentOfDropdowns() {
  dropdownContentToDisplay.forEach((dropdownContent) => {
    document.querySelectorAll(`.dropdown-item[data-content="${dropdownContent}"]`).forEach((dropItem) => {
      dropItem.dataset.hidden = false;
    });
  });
}

/** Add/Remove tag from HTML
 *
 * @param {string} contentOfTag Content of tag
 * @param {*} categoryOfTag Category of tag (ingredients, appareils or ustensils)
 */
function toggleTag(contentOfTag, categoryOfTag) {
  if (tagChecked.some((el) => el.value.includes(contentOfTag))) {
    const indexOfTagToRemove = tagChecked.findIndex((el) => el.value === contentOfTag);
    tagChecked.splice(indexOfTagToRemove, 1);
    document.querySelector(`[data-content="${contentOfTag}"]`).remove();
  } else {
    tagChecked.push({ origin: categoryOfTag, value: contentOfTag });
    document.querySelector('.container-tag').insertAdjacentHTML('beforeend', `
                <span class="badge bg-primary p-2 mt-3" data-category="${categoryOfTag}" data-content="${contentOfTag}">${contentOfTag}
                  <img class="tag-close-cross" src="./assets/src/x-circle.svg" alt="closing cross">
                </span>
                `);
  }
}

/** Filter and refresh content of HTML
 *
 * @param {string} actualSearch Value of search
 */
function filterContent(actualSearch) {
  const newArrayFiltered = createNewArrayByComparingStrings(actualSearch);

  document.querySelectorAll('.card').forEach((card) => { card.parentNode.dataset.hidden = true; });
  document.querySelectorAll('.dropdown-item').forEach((dropItem) => { dropItem.dataset.hidden = true; });

  filterDropdownContentToDisplay(newArrayFiltered);
  refreshContentOfDropdowns();

  if (newArrayFiltered.length === 0) {
    document.querySelector('.empty-message').dataset.hidden = false;
  } else {
    document.querySelector('.empty-message').dataset.hidden = true;
    newArrayFiltered.forEach((el) => {
      document.querySelector(`[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
    });
  }

}

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// EVENTS
// _________________________________________________________________________________________________

// MAIN INPUT
document.querySelector('.search-entry').addEventListener('input', () => {
  const actualSearch = document.querySelector('.search-entry').value.toLowerCase();
  if (actualSearch.length > 2) {
    valueIsComingFromMainInput = true;
    mainInputLessThan3Caracters = false;
    filterContent(actualSearch);
  } else {
    valueIsComingFromMainInput = true;
    mainInputLessThan3Caracters = true;
    filterContent(actualSearch);
    // document.querySelectorAll('.card').forEach((card) => { card.parentNode.dataset.hidden = false; });
  }
});

// DROPDOWN INPUT
document.querySelector('.container-dropdown').addEventListener('input', (event) => {
  const categoryOfTarget = event.target.dataset.category; // ingredient, appareils, ustensils
  const targetValue = event.target.value.toLowerCase();

  const newArrayFiltered = filteringArrayDropdownInput(categoryOfTarget, targetValue);
  refreshContentOfDropdown(newArrayFiltered, categoryOfTarget);
});

// DROPDOWN CLICK EVENTS
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

  // TAG events
  if (event.target.tagName === 'A') {
    const contentOfTag = event.target.dataset.content;
    const categoryOfTag = event.target.dataset.category;
    // const search = new Searching('', whichCategoryIsIt, contentOfTag, true);

    // // add or remove tag from DOM
    toggleTag(contentOfTag, categoryOfTag);
    filterContent(contentOfTag);

    // closing dropdown
    openCloseDropdown(targetCategory, false);
    isADropdownOpen.isOpen = false;
    isADropdownOpen.category = '';
  }
});

// CLOSING CROSS TAG
document.querySelector('.container-tag').addEventListener('click', (event) => {
  // while I click on the closing cross of a tag, it remove the concerned tag
  if (event.target.tagName === 'IMG') {
    const contentOfTag = event.target.parentNode.dataset.content;
    const categoryOfTag = event.target.parentNode.dataset.category;

    // add or remove tag from DOM
    toggleTag(contentOfTag, categoryOfTag);
    isItAClosingTagClick = true;
    filterContent(contentOfTag);
  }
});
