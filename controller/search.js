const tagChecked = [];
const propertyToSearchForMainFiltering = ['title', 'description', 'ingredients'];
const dropdownCategories = ['ingredients', 'appareils', 'ustensils'];
let filteredArray = [];
let filteredArrayWithTags = [];
const filteredObjectOfArrayForDropdown = {};

class Searching {
  constructor(searchingValue, originOfSearch, tagSelected, isItATagClick) {
    this.searchingValue = searchingValue.toLowerCase();
    this.originOfSearch = originOfSearch;
    this.tagSelected = tagSelected;
    this.isItATagClick = isItATagClick;
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
      filteredArray = arrayOfObjectForFiltering.filter((obj) => propertyToSearchForMainFiltering.some((prop) => this.isInIt(obj, prop, this.searchingValue)));
    }
    console.log(filteredArray);
  }

  filterRecipesWithTags() {
    if (filteredArray.length === 0) {
      if (this.isItATagClick === true) {
        // eslint-disable-next-line no-undef
        filteredArray = arrayOfObjectForFiltering;
      }
    }

    filteredArrayWithTags = filteredArray.filter((obj) => {
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
    dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat] = objectOfArraysForDropdown[cat].filter((el) => filteredArrayWithTags.some((obj) => this.isInIt(obj, cat, el)));
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

    dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat].forEach((el) => {
        document.querySelector(`.dropdown-item[data-category="${cat}"][data-content="${el.toLowerCase()}"]`).dataset.hidden = false;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  refreshCards() {
    initDisplayingOfElements(true, 'card', true);

    if (filteredArrayWithTags.length === 0) {
      filteredArray.forEach((el) => {
        document.querySelector(`.card[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
      });
      document.querySelector('.empty-message').dataset.hidden = false;
    } else {
      filteredArrayWithTags.forEach((el) => {
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
    console.log(filteredArrayWithTags);
  }
}
