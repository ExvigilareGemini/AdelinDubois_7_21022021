// look if actualSearch is present in the elementToCompare, if so, return the object
function comparingString(elementToCompare, actualSearch) {
  let returnValue;
  // si le titre contient la recherche actuelle
  if (elementToCompare.title.toLowerCase().includes(actualSearch)) {
    returnValue = elementToCompare;
  } else if (elementToCompare.description.toLowerCase().includes(actualSearch)) {
    returnValue = elementToCompare;
  }
  elementToCompare.ingredients.forEach((el) => {
    if (el.ingredient.toLowerCase().includes(actualSearch)) {
      returnValue = elementToCompare;
    }
  });
  return returnValue;
}

function createNewArrayByComparingStrings(actualSearch) {
  const arrayToReturn = arrayOfObjetForSearch.filter((el) => comparingString(el, actualSearch));
  return arrayToReturn;
}

// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// searching event

document.querySelector('.search-entry').addEventListener('input', () => {
  const actualSearch = document.querySelector('.search-entry').value.toLowerCase();

  // create new array by comparing arrayofobject and actual search
  const newArraySorted = createNewArrayByComparingStrings(actualSearch);

  // set each card hidden
  document.querySelectorAll('.card').forEach((card) => card.parentNode.dataset.hidden = true);

  // foreach element in the sorted array,set card with corresponding data-id visible
  newArraySorted.forEach((el) => {
    document.querySelector(`[data-id="${el.id}"]`).parentNode.dataset.hidden = false;
  });
});
