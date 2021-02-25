// event delegation listening click on dropdown-item
document.querySelector('.container-dropdown').addEventListener('click', (event) => {
  const valueOfSearch = event.target.textContent;
  const { category } = event.target.parentNode.dataset;
  if (event.target.tagName === 'A') {
    displayCardFromTags(category, valueOfSearch);
  }
});

function displayCardFromTags(category, valueOfSearch) {
  const newArraySorted = testingCategory(category, valueOfSearch);
  document.querySelectorAll('.card').forEach((card) => card.dataset.hidden = true);
  newArraySorted.forEach((object) => document.querySelector(`[data-id="${object.id}"]`).dataset.hidden = false);
}

function testingCategory(category, valueOfSearch) {
  switch (category) {
    case 'ingredients':
      return searchingCorrespondanceInArrayOfObject(category, valueOfSearch);
    case 'ustensils':
      return searchingCorrespondanceInArray(category, valueOfSearch);
    case 'appareils':
      return searchingCorrespondanceInProperty(category, valueOfSearch);
    default:
      console.log('defaut');
  }
}

function searchingCorrespondanceInProperty(category, valueOfSearch) {
  return arrayOfObjetForSearch.filter((object) => object[category] === valueOfSearch);
}

function searchingCorrespondanceInArray(category, valueOfSearch) {
  return arrayOfObjetForSearch.filter((object) => sortArray(object, category, valueOfSearch));
}

function searchingCorrespondanceInArrayOfObject(category, valueOfSearch) {
  return arrayOfObjetForSearch.filter((object) => sortArrayOfIngredient(object, category, valueOfSearch));
}

function sortArray(object, category, valueOfSearch) {
  let valueToReturn = false;
  object[category].forEach((el) => {
    if (el === valueOfSearch) {
      valueToReturn = true;
    }
  });
  return valueToReturn;
}

function sortArrayOfIngredient(object, category, valueOfSearch) {
  let valueToReturn = false;
  object[category].forEach((el) => {
    if (el.ingredient === valueOfSearch) {
      valueToReturn = true;
    }
  });
  return valueToReturn;
}
