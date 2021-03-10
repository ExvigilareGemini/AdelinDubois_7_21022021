const tagChecked = [];
let filteredArrayOfRecipes = [];
let filteredArrayOfRecipesWithTags = [];
const filteredObjectOfArrayForDropdown = {};

console.log('Main branch');

class Searching {
  constructor(searchingValue, originOfSearch, tagSelected, isItATagClick) {
    this.searchingValue = searchingValue.toLowerCase();
    this.originOfSearch = originOfSearch;
    this.tagSelected = tagSelected;
    this.isItATagClick = isItATagClick;

    this.mainFilteringCategories = ['title', 'description', 'ingredients'];
    this.dropdownCategories = ['ingredients', 'appareils', 'ustensils'];
  }

  // toggle tag and add/remove tag datas in tagChecked = []
  toggleTag() {
    if (tagChecked.some((el) => el.value.includes(this.tagSelected))) {
      const indexOfTagToRemove = tagChecked.findIndex((el) => el.value === this.tagSelected);
      tagChecked.splice(indexOfTagToRemove, 1);
      document.querySelector(`[data-content="${this.tagSelected}"]`).remove();
    } else {
      tagChecked.push({ origin: this.originOfSearch, value: this.tagSelected });
      document.querySelector('.container-tag').insertAdjacentHTML('beforeend', `
              <span class="badge bg-primary p-2 mt-3" data-category="${this.originOfSearch}" data-content="${this.tagSelected}">${this.tagSelected}
                <img class="tag-close-cross" src="./assets/src/x-circle.svg" alt="closing cross">
              </span>
              `);
    }
  }

  // return true if stringIsIncluded is includes in objectForSearch[propertyToSearch]
  // eslint-disable-next-line class-methods-use-this
  isInIt(objectForSearch, propertyToSearch, stringIsIncluded) {
    return objectForSearch[propertyToSearch].toLowerCase().includes(stringIsIncluded.toLowerCase());
  }

  filterRecipesWithMainInput() {
    if (this.originOfSearch === '') {
      if (this.searchingValue.length > 2) {
        filteredArrayOfRecipes = arrayOfObjectForFiltering.filter((obj) => this.mainFilteringCategories.some((prop) => this.isInIt(obj, prop, this.searchingValue)));
      } else {
        filteredArrayOfRecipes = arrayOfObjectForFiltering;
      }
    }
  }

  filterRecipesWithTags() {
    if (filteredArrayOfRecipes.length === 0) {
      if (this.isItATagClick === true) {
        filteredArrayOfRecipes = arrayOfObjectForFiltering;
      }
    }

    filteredArrayOfRecipesWithTags = filteredArrayOfRecipes.filter((obj) => {
      let isAllTagInIt = true;

      tagChecked.forEach((tag) => {
        if (!this.isInIt(obj, tag.origin, tag.value)) {
          isAllTagInIt = false;
        }
      });
      return isAllTagInIt;
    });
  }

  // filtre le contenu des dropdown basé sur les recettes affichée
  filterArrayForDropdownWithDisplayedCards() {
    this.dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat] = objectOfArraysForDropdown[cat].filter((el) => filteredArrayOfRecipesWithTags.some((obj) => this.isInIt(obj, cat, el)));
    });
  }

  filterDropdownContentWithDropdownInput() {
    if (this.originOfSearch !== '') {
      filteredObjectOfArrayForDropdown[this.originOfSearch] = filteredObjectOfArrayForDropdown[this.originOfSearch].filter((el) => el.toLowerCase().includes(this.searchingValue));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  refreshDropdownContent() {
    initDisplayingOfElements(true, 'dropdown-item', false);

    this.dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat].forEach((el) => {
        document.querySelector(`.dropdown-item[data-category="${cat}"][data-content="${el.toLowerCase()}"]`).dataset.hidden = false;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
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

  filterContent() {
    this.filterRecipesWithMainInput();
    this.filterRecipesWithTags();
    this.filterArrayForDropdownWithDisplayedCards();
    this.filterDropdownContentWithDropdownInput();
    this.refreshDropdownContent();
    this.refreshCards();
  }
}
