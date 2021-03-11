const tagChecked = [];
let filteredArrayOfRecipes = [];
let filteredArrayOfRecipesWithTags = [];
const filteredObjectOfArrayForDropdown = {};

console.log('Main branch');

/**
 * Hide all elements with the same class name
 *
 * @param {boolean} isHidden True -> hide | False -> appear
 * @param {string} className Class name of elements to hide
 * @param {boolean} isParent True -> hide parent of element | False -> hide element
 */
function initDisplayingOfElements(isHidden, className, isParent) {
  document.querySelectorAll(`.${className}`).forEach((el) => {
    isParent ? el.parentNode.dataset.hidden = isHidden : el.dataset.hidden = isHidden;
  });
}

/** Verify if a string is inside an object
   *
   * @param {object} objectForSearch Object in which the searching is made
   * @param {string} propertyToSearch The property of the object
   * @param {string} stringIsIncluded The string to verify if it's inside
   * @returns {boolean} True -> string is in it | False -> is not in
   */
function isInIt(objectForSearch, propertyToSearch, stringIsIncluded) {
  return objectForSearch[propertyToSearch].toLowerCase().includes(stringIsIncluded.toLowerCase());
}

class Searching {
  /** Create Searching object
   *
   * @param {string} searchingValue The searching value, set ' ' for tags
   * @param {string} originOfSearch From where, ' ' for main input, dataset.category for dropdown
   * @param {string} tagValue The tag value, set ' ' for inputs
   * @param {boolean} isItATagClick Calling the class clicking on a tag
   */
  constructor(searchingValue, originOfSearch, tagValue, isItATagClick) {
    this.searchingValue = searchingValue.toLowerCase();
    this.originOfSearch = originOfSearch;
    this.tagValue = tagValue;
    this.isItATagClick = isItATagClick;

    this.mainFilteringCategories = ['title', 'description', 'ingredients'];
    this.dropdownCategories = ['ingredients', 'appareils', 'ustensils'];
  }

  /** Add or remove a tag in HTML
   *
   */
  toggleTag() {
    if (tagChecked.some((el) => el.value.includes(this.tagValue))) {
      const indexOfTagToRemove = tagChecked.findIndex((el) => el.value === this.tagValue);
      tagChecked.splice(indexOfTagToRemove, 1);
      document.querySelector(`[data-content="${this.tagValue}"]`).remove();
    } else {
      tagChecked.push({ origin: this.originOfSearch, value: this.tagValue });
      document.querySelector('.container-tag').insertAdjacentHTML('beforeend', `
              <span class="badge bg-primary p-2 mt-3" data-category="${this.originOfSearch}" data-content="${this.tagValue}">${this.tagValue}
                <img class="tag-close-cross" src="./assets/src/x-circle.svg" alt="closing cross">
              </span>
              `);
    }
  }

  /** Populate filteredArrayOfRecipes by filtering array that contains recipes
   * , filter with searchingValue from main input, originOfSearch = '' is the main input
   */
  filterRecipesWithMainInput() {
    if (this.originOfSearch === '') {
      if (this.searchingValue.length > 2) {
        filteredArrayOfRecipes = arrayOfObjectForFiltering.filter((obj) => this.mainFilteringCategories.some((prop) => isInIt(obj, prop, this.searchingValue)));
      } else {
        filteredArrayOfRecipes = arrayOfObjectForFiltering;
      }
    }
  }

  /** Populate filteredArrayOfRecipesWithTags by filtering filteredArrayOfRecipe
   * , filter by checking if each of tags are contains inside an object
   */
  filterRecipesWithTags() {
    if (filteredArrayOfRecipes.length === 0) {
      if (this.isItATagClick === true) {
        filteredArrayOfRecipes = arrayOfObjectForFiltering;
      }
    }

    filteredArrayOfRecipesWithTags = filteredArrayOfRecipes.filter((obj) => {
      let isAllTagInIt = true;

      tagChecked.forEach((tag) => {
        if (!isInIt(obj, tag.origin, tag.value)) {
          isAllTagInIt = false;
        }
      });
      return isAllTagInIt;
    });
  }

  /** Populate filteredObjetOfArrayForDropdown by filtering
   * , filter content of dropdown based on recipes displayed
   */
  filterArrayForDropdownWithDisplayedCards() {
    this.dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat] = objectOfArraysForDropdown[cat].filter((el) => filteredArrayOfRecipesWithTags.some((obj) => isInIt(obj, cat, el)));
    });
  }

  /** Populate filteredArrayObjectOfForDropdown by filtering
   * , filter with searchingValue from one of the dropdown input
   */
  filterDropdownContentWithDropdownInput() {
    if (this.originOfSearch !== '') {
      filteredObjectOfArrayForDropdown[this.originOfSearch] = filteredObjectOfArrayForDropdown[this.originOfSearch].filter((el) => el.toLowerCase().includes(this.searchingValue));
    }
  }

  /** Display content of dropdown by hidding those that are not in the filteredObjectOfArrayForDropdown
   *
   */
  refreshDropdownContent() {
    initDisplayingOfElements(true, 'dropdown-item', false);

    this.dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat].forEach((el) => {
        document.querySelector(`.dropdown-item[data-category="${cat}"][data-content="${el.toLowerCase()}"]`).dataset.hidden = false;
      });
    });
  }

  /** Display cards by hidding those that are not in the filteredArrayOfRecipesWithTags
   *
   */
  refreshCards() {
    initDisplayingOfElements(true, 'card', true);

    if (filteredArrayOfRecipesWithTags.length === 0) {
      filteredArrayOfRecipesWithTags.forEach((el) => {
        document.querySelector(`.card[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
      });
      document.querySelector('.empty-message').dataset.hidden = false;
    } else {
      filteredArrayOfRecipesWithTags.forEach((el) => {
        document.querySelector(`.card[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
      });
      document.querySelector('.empty-message').dataset.hidden = true;
    }
  }

  /** Call functions to filter content of HTML
   *
   */
  filterContent() {
    this.filterRecipesWithMainInput();
    this.filterRecipesWithTags();
    this.filterArrayForDropdownWithDisplayedCards();
    this.filterDropdownContentWithDropdownInput();
    this.refreshDropdownContent();
    this.refreshCards();
  }
}
