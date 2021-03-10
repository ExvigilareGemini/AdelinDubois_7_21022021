const filteredArrayOfRecipes = [];
const filteredArrayOfRecipesWithTags = [];
const filteredObjectOfArrayForDropdown = {};

let filteredArrayWithMainInput = [];
let dropdownContentToDisplay = [];

console.log('V2 branch');

// look if actualSearch is present in the elementToCompare, if so, return the object
function comparingString(elementToCompare, actualSearch) {
  let returnValue;
  // si le titre contient la recherche actuelle
  if (elementToCompare.title.toLowerCase().includes(actualSearch)) {
    returnValue = elementToCompare;
  } else if (elementToCompare.description.toLowerCase().includes(actualSearch)) {
    returnValue = elementToCompare;
  } else if (elementToCompare.ingredients.includes(actualSearch)) {
    returnValue = elementToCompare;
  }
  return returnValue;
}

function filterRecipesWithTags(arrayToFilterWithTags) {
  let arrayFilteredWithTags = [];

  if (tagChecked.length > 0) {
    arrayFilteredWithTags = arrayToFilterWithTags.filter((obj) => {
      let isAllTagInIt = true;
      tagChecked.forEach((tag) => {
        if (!obj[tag.origin].toLowerCase().includes(tag.value)) {
          isAllTagInIt = false;
        }
      });
      return isAllTagInIt;
    });
  } else {
    arrayFilteredWithTags = arrayToFilterWithTags;
  }
  return arrayFilteredWithTags;
}

function createNewArrayByComparingStrings(actualSearch) {
  let arrayToFilterWithTags = [];
  if (isItAClosingTagClick) {
    if (mainInputLessThan3Caracters) {
      arrayToFilterWithTags = arrayOfObjectForFiltering;
    } else {
      arrayToFilterWithTags = filteredArrayWithMainInput;
    }
    isItAClosingTagClick = false;
  } else if (valueIsComingFromMainInput) {
    arrayToFilterWithTags = arrayOfObjectForFiltering.filter((el) => comparingString(el, actualSearch));
    filteredArrayWithMainInput = arrayToFilterWithTags;
    valueIsComingFromMainInput = false;
  } else if (filteredArrayWithMainInput.length === 0) {
    arrayToFilterWithTags = arrayOfObjectForFiltering.filter((el) => comparingString(el, actualSearch));
  } else {
    arrayToFilterWithTags = filteredArrayWithMainInput.filter((el) => comparingString(el, actualSearch));
  }
  const arrayToReturn = filterRecipesWithTags(arrayToFilterWithTags);
  return arrayToReturn;
}

function filteringArrayDropdownInput(category, targetValue) {
  let arrayFiltered = [];
  if (dropdownContentToDisplay.length === 0) {
    arrayFiltered = objectOfArraysForDropdown[category].filter((el) => el.toLowerCase().includes(targetValue));
  } else {
    arrayFiltered = dropdownContentToDisplay.filter((el) => el.toLowerCase().includes(targetValue));
  }
  return arrayFiltered;
}

function filterDropdownContentToDisplay(arrayFiltered) {
  dropdownContentToDisplay = [];
  dropdownCategories.forEach((cat) => {
    document.querySelectorAll(`.dropdown-item[data-category="${cat}"]`).forEach((dropItem) => {
      arrayFiltered.forEach((obj) => {
        dropItem.dataset.hidden = true;
        if (obj[cat].toLowerCase().includes(dropItem.dataset.content.toLowerCase())) {
          dropdownContentToDisplay.push(dropItem.dataset.content);
        }
      });
    });
  });
}
