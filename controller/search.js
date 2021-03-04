const tagChecked = [];

class Searching {
  constructor(searchingValue, originOfSearch, tagSelected) {
    this.searchingValue = searchingValue;
    this.originOfSearch = originOfSearch;
    this.tagSelected = tagSelected;
  }

  toggleTag() {
    if (tagChecked.includes(this.tagSelected)) {
      tagChecked.splice(tagChecked.indexOf(this.tagSelected, 1));
      document.querySelector(`[data-content="${this.tagSelected}"]`).remove();
    } else {
      tagChecked.push(this.tagSelected);

      document.querySelector('.container-tag').insertAdjacentHTML('beforeend', `
              <span class="badge bg-primary p-2 mt-3" data-content="${this.tagSelected}">${this.tagSelected}
                <img class="tag-close-cross" src="./assets/src/x-circle.svg" alt="closing cross">
              </span>
              `);
    }
  }
}
