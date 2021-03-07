const tagChecked = [];
const propertyToSearchForMainFiltering = ['title', 'description', 'ingredients'];
const dropdownCategories = ['ingredients', 'appareils', 'ustensils'];
let filteredArray = [];
let filteredArrayWithTags = [];
const filteredObjectOfArrayForDropdown = {};

class Searching {
  constructor(searchingValue, originOfSearch, tagSelected) {
    this.searchingValue = searchingValue.toLowerCase();
    this.originOfSearch = originOfSearch;
    this.tagSelected = tagSelected;
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
    // console.log('tag checked :');
    // console.log(tagChecked);
  }

  // return true if stringIsIncluded is includes in objectForSearch[propertyToSearch]
  isInIt(objectForSearch, propertyToSearch, stringIsIncluded) {
    return objectForSearch[propertyToSearch].toLowerCase().includes(stringIsIncluded.toLowerCase());
  }

  filterRecipesWithInput() {
    if (this.originOfSearch === '') {
      filteredArray = arrayOfObjectForFiltering.filter((obj) => propertyToSearchForMainFiltering.some((prop) => this.isInIt(obj, prop, this.searchingValue)));
    }
  }

  filterRecipesWithTags() {
    if (filteredArray.length === 0) {
      filteredArray = arrayOfObjectForFiltering;
    }

    filteredArrayWithTags = filteredArray.filter((obj) => {
      if (tagChecked.length > 0) {
        let isAllTagIdInIt = true;

        tagChecked.forEach((tag) => {
          if (!this.isInIt(obj, tag.origin, tag.value)) {
            isAllTagIdInIt = false;
          }
        });
        return isAllTagIdInIt;
      }
      return true;
    });
  }

  // filtre le contenu des dropdown basé sur les recettes affichée
  filterArrayForDropdownWithDisplayedCards() {
    dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat] = objectOfArraysForDropdown[cat].filter((el) => filteredArray.some((obj) => this.isInIt(obj, cat, el)));
    });
  }

  filterDropdownContentWithDropdownInput() {
    if (this.originOfSearch !== '') {
      filteredObjectOfArrayForDropdown[this.originOfSearch] = filteredObjectOfArrayForDropdown[this.originOfSearch].filter((el) => el.toLowerCase().includes(this.searchingValue));
      console.log(this.originOfSearch);
    }
  }

  filterContent() {
    this.filterRecipesWithInput();
    this.filterRecipesWithTags();
    this.filterArrayForDropdownWithDisplayedCards();
    this.filterDropdownContentWithDropdownInput();
    this.refreshDropdownContent();
    this.refreshCards();
    console.log('filteredArray :');
    console.log(filteredArray);
    console.log('filteredArrayWithTags :');
    console.log(filteredArrayWithTags);
    console.log('filteredObjectOfArrayForDropdown :');
    console.log(filteredObjectOfArrayForDropdown);
  }

  refreshDropdownContent() {
    initDisplayingOfElements(true, 'dropdown-item', false);
    console.log(1);
    dropdownCategories.forEach((cat) => {
      filteredObjectOfArrayForDropdown[cat].forEach((el) => {
        document.querySelector(`.dropdown-item[data-content="${el.toLowerCase()}"]`).dataset.hidden = false;
      });
    });
  }

  refreshCards() {
    initDisplayingOfElements(true, 'card', true);
    if (filteredArrayWithTags.length === 0) {
      filteredArray.forEach((el) => {
        document.querySelector(`.card[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
      });
    } else {
      filteredArrayWithTags.forEach((el) => {
        document.querySelector(`.card[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
      });
    }
  }
}
