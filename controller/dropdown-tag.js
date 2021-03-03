// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// FILTERING CARDS WITH DROPDOWN & TAGS
// _________________________________________________________________________________________________
function filterArrayWithTags() {
  return toCompareForTags.filter((el) => {
    let returnBool = false;
    el.values.forEach((val) => {
      tagChecked.forEach((tag) => {
        if (tag === val) {
          returnBool = true;
        }
      });
    });
    return returnBool;
  });
}

function displayCardsWithTags(sortedArray) {
  if (sortedArray.length === 0) {
    document.querySelectorAll('.card').forEach((card) => { card.parentNode.dataset.hidden = false; });
  } else {
    document.querySelectorAll('.card').forEach((card) => { card.parentNode.dataset.hidden = true; });
    sortedArray.forEach((el) => {
      document.querySelector(`[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
    });
  }
}

function createTag(valueOfSearch, colorOfTag) {
  tagChecked.push(valueOfSearch);
  document.querySelector('.container-tag').insertAdjacentHTML('beforeend', `
              <span class="badge bg-${colorOfTag} p-2 mt-3" data-tag="${valueOfSearch}">${valueOfSearch}
                <img class="tag-close-cross" src="./assets/src/x-circle.svg" alt="closing cross">
              </span>
              `);
}

function removeTag(valueOfSearch) {
  tagChecked.splice(tagChecked.indexOf(valueOfSearch, 1));
  document.querySelector(`[data-tag="${valueOfSearch}"]`).remove();
  displayCardsWithTags(filterArrayWithTags());
}

function tagIsChecked(valueOfSearch, colorOfTag) {
  if (tagChecked.indexOf(valueOfSearch) === -1) {
    createTag(valueOfSearch, colorOfTag);
  } else {
    removeTag(valueOfSearch);
  }
}

// event delegation listening click on dropdown-item
document.querySelector('.container-dropdown').addEventListener('click', (event) => {
  const valueOfSearch = event.target.textContent;
  const colorOfTag = event.target.parentNode.dataset.color;

  if (event.target.tagName === 'A') {
    tagIsChecked(valueOfSearch, colorOfTag);
    const sortedArray = filterArrayWithTags();
    displayCardsWithTags(sortedArray);
  }
});

// remove tag while clicking on his closing-cross
document.querySelector('.container-tag').addEventListener('click', (event) => {
  const tagToRemove = event.target.parentNode.dataset.tag;
  if (event.target.className === 'tag-close-cross') {
    removeTag(tagToRemove);
  }
});

function filteringArrayDropdownInput(category, targetValue) {
  const arrayFiltered = objectOfArraysForDropdown[category].filter((el) => {
    if (el.toLowerCase().search(targetValue) !== -1) {
      return true;
    }
    return false;
  });
  return arrayFiltered;
}

function displayContentOfDropdown(newArrayFiltered, nodeListOfElementInDropdown) {
  nodeListOfElementInDropdown.forEach((el) => el.dataset.hidden = true);
  newArrayFiltered.forEach((valueFiltered) => {
    document.querySelector(`[data-content="${valueFiltered.toLowerCase()}"]`).dataset.hidden = false;
  });
}

document.querySelector('.container-dropdown').addEventListener('input', (event) => {
  const category = event.target.getAttribute('value').toLowerCase(); // ingredient, appareils, ustensils
  const targetValue = event.target.value.toLowerCase();
  const nodeListOfElementInDropdown = document.querySelectorAll(`[data-category="${category}"]`);
  const newArrayFiltered = filteringArrayDropdownInput(category, targetValue);

  displayContentOfDropdown(newArrayFiltered, nodeListOfElementInDropdown, category);
});
