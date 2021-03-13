let filteredArrayWithMainInput = [];
let dropdownContentToDisplay = [];

console.log('V2 branch');

/** Check if a value is inside a recipe object
 *
 * @param {object} objectToCompare Object in which the searching is made
 * @param {string} actualSearch Value of search
 * @returns {boolean} True -> is includes in it | False -> is not
 */
function isInIt(objectToCompare, actualSearch) {
  let returnValue = false;
  if (objectToCompare.title.toLowerCase().includes(actualSearch)) {
    returnValue = true;
  } else if (objectToCompare.description.toLowerCase().includes(actualSearch)) {
    returnValue = true;
  } else if (objectToCompare.ingredients.toLowerCase().includes(actualSearch)) {
    returnValue = true;
  }
  return returnValue;
}

/** Filter an array with tags that are checked, all tags must be contains in an object
 *
 * @param {object[]} arrayToFilterWithTags Array containing recipes object
 * @returns {object[]} Array of recipes object filtered
 */
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

/** Return an array filtered with searching value and tags checked
 *
 * @param {string} actualSearch Value of search
 * @returns {object[]} Array of recipes object filtered
 */
function createNewArrayByComparingStrings(actualSearch) {
  let arrayToFilterWithTags = [];
  if (isItAClosingTagClick) {
    if (mainInputLessThan3Caracters) {
      arrayToFilterWithTags = arrayOfObjectForFiltering;
      mainInputLessThan3Caracters = false;
    } else {
      arrayToFilterWithTags = filteredArrayWithMainInput;
      isItAClosingTagClick = false;
    }
  } else if (valueIsComingFromMainInput) {
    arrayToFilterWithTags = arrayOfObjectForFiltering.filter((el) => isInIt(el, actualSearch));
    filteredArrayWithMainInput = arrayToFilterWithTags;
    valueIsComingFromMainInput = false;
  } else if (filteredArrayWithMainInput.length === 0) {
    arrayToFilterWithTags = arrayOfObjectForFiltering.filter((el) => isInIt(el, actualSearch));
  } else {
    arrayToFilterWithTags = filteredArrayWithMainInput.filter((el) => isInIt(el, actualSearch));
  }
  const arrayToReturn = filterRecipesWithTags(arrayToFilterWithTags);
  return arrayToReturn;
}

/** Filter array with value of search inside a dropdown button
 *
 * @param {string} category Category of dropdown (ingredients, appareils or ustensils)
 * @param {string} targetValue Value of search
 * @returns {string[]} Filtered array
 */
function filteringArrayDropdownInput(category, targetValue) {
  let arrayFiltered = [];
  if (dropdownContentToDisplay.length === 0) {
    arrayFiltered = objectOfArraysForDropdown[category].filter((el) => el.toLowerCase().includes(targetValue));
  } else {
    arrayFiltered = dropdownContentToDisplay.filter((el) => el.toLowerCase().includes(targetValue));
  }
  return arrayFiltered;
}

/** Filter array dropdownContentToDisplay with another array array of object
 *
 * @param {object[]} arrayFiltered Array of object used for filtering
 */
function filterDropdownContentToDisplay(arrayFiltered) {
  dropdownContentToDisplay = [];
  console.log(arrayFiltered);
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
