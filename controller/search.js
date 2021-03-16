const tagChecked = [];
let filteredArrayOfRecipes = [];
let filteredArrayOfRecipesWithTags = [];
const filteredObjectOfArrayForDropdown = {};
const mainFilteringCategories = ['title', 'description', 'ingredients'];

console.log('Main branch');

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
   * @param {string} originOfSearch Name of dropdown origin (ingredients, appareils or ustensils)
   * @param {number} switchOrigin From where it comes :
   * 1 -> Main Input | 2 -> Click on Tag | 3 -> Dropdown Input
   */
  constructor(searchingValue, originOfSearch, switchOrigin) {
    this.searchingValue = searchingValue.toLowerCase();
    this.originOfSearch = originOfSearch;
    this.switchOrigin = switchOrigin;
  }

  /** Populate filteredArrayOfRecipes by filtering arrayOfObjectForFiltering (from app.js)
   *, filter with searchingValue from main input
   */
  filterRecipesWithMainInput() {
    if (this.searchingValue.length > 2) {
      // eslint-disable-next-line max-len
      filteredArrayOfRecipes = arrayOfObjectForFiltering.filter((obj) => mainFilteringCategories.some((prop) => isInIt(obj, prop, this.searchingValue)));
    } else {
      filteredArrayOfRecipes = arrayOfObjectForFiltering;
    }
  }

  /** Populate filteredArrayOfRecipesWithTags by filtering filteredArrayOfRecipes
   *, filter by checking if each of tags are contains inside an object
   */
  // eslint-disable-next-line class-methods-use-this
  filterRecipesWithTags() {
    if (filteredArrayOfRecipes.length === 0) {
      filteredArrayOfRecipes = arrayOfObjectForFiltering;
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

  /** Populate filteredObjetOfArrayForDropdown by filtering objectOfArraysForDropdown
   *, filter content of dropdown based on recipes displayed
   */
  // eslint-disable-next-line class-methods-use-this
  filterArrayForDropdownWithDisplayedCards() {
    dropdownCategories.forEach((cat) => {
      // eslint-disable-next-line max-len
      filteredObjectOfArrayForDropdown[cat] = objectOfArraysForDropdown[cat].filter((el) => filteredArrayOfRecipesWithTags.some((obj) => isInIt(obj, cat, el)));
    });
  }

  /** Populate filteredArrayObjectOfForDropdown by filtering filteredObjectOfArrayForDropdown
   *, filter with searchingValue from one of the dropdown input
   */
  filterArrayForDropdownWithDropdownInput() {
    // eslint-disable-next-line max-len
    filteredObjectOfArrayForDropdown[this.originOfSearch] = filteredObjectOfArrayForDropdown[this.originOfSearch].filter((el) => el.toLowerCase().includes(this.searchingValue));
  }

  /** Set a callback function
   * @param {function} callbackFunctionfct Function set for callback
   */
  setCallback(callbackFunctionfct) {
    this.callback = callbackFunctionfct;
  }

  /** Make a promise to return an object of array to display content of dropdowns
   * @returns {arrays{}} Object containing arrays to display content of dropdowns
   */
  getArrayForDropdown() {
    new Promise((resolve, reject) => {
      this.filterContent();
      const res = filteredObjectOfArrayForDropdown;
      resolve(res);
    }).then(this.callback);
  }

  /** Make a promise to return an array of object to display cards
   * @returns {object[]} Array containing object to display cards
   */
  getArrayForCards() {
    new Promise((resolve, reject) => {
      this.filterContent();
      const res = filteredArrayOfRecipesWithTags;
      resolve(res);
    }).then(this.callback);
  }

  /** Call functions to filter content of HTML depending on where it comes
   *
   */
  filterContent() {
    switch (this.switchOrigin) {
      // Main input
      case 1:
        this.filterRecipesWithMainInput();
        this.filterRecipesWithTags();
        this.filterArrayForDropdownWithDisplayedCards();
        break;
      // Tag
      case 2:
        this.filterRecipesWithTags();
        this.filterArrayForDropdownWithDisplayedCards();
        break;
      // Dropdown input
      case 3:
        this.filterRecipesWithTags();
        this.filterArrayForDropdownWithDisplayedCards();
        this.filterArrayForDropdownWithDropdownInput();
        break;
      default:
        console.log('switchOrigin parameter of Searching class not defineds');
    }
  }
}
