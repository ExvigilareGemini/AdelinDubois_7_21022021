// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// _________________________________________________________________________________________________
// DYNAMIC CREATION OF HTML BASED ON RECIPE.JS.

// F05
// generate html content of 1 photographer displayed (.photograph) using template strings and
// populate with objectphotographer
// argument: object photographer from data.json
function photographHTMLGenerator(data) {
    console.log(data);
    return `
            <div class="card mh-500 col-12 col-md-6">
                <img src="#" class="card-img-top" alt="image">
                <div class="card-body">
                    <div class="row">
                        <h5 class="card-title col-6">${data.name}</h5>
                        <p class="card-text col-6 text-end"><span class="far fa-clock"></span><b>${data.time}min</b></p>
                    </div>
                    <div class="row">
                        <div class="container col-6">
                        ${data.ingredients.map((ingredient) => `
                        <p class=" card-text mb-0">  <b>${ingredient.ingredient}</b>: ${ingredient.quantity} ${ingredient.unit}</p>`).join('')}
                        </div>
                        <p class="col-6 text-truncate">${data.description}</p>
                    </div>
                </div>
            </div>`;
  }
  
  // F06
  // function that create all the block of HTML that is needed to be displayed,
  // takes data and create a new array using .map and F05 (photographHTMLGenerator)
  // argument: datas from JSON
  function cardHTMLCompiler(data) {
    return data.map(photographHTMLGenerator).join('');
  }
  
  
  // F08
  // function inserting HTML create in F06 (cardHTMLCompiler),
  // then call F07 (isRedirectFromPhotographerPage)
  // argument: is datas form JSON passing to F09 (fetchDataToCreateIndexHTML)
  function insertCreatedHTMLCardHTML(data) {
    document.querySelector('.container-cards').innerHTML = cardHTMLCompiler(data);
  }
  
  // F09
  // function that get datas in the /src/data.json and chain with .then
  // the response is tranform into json, then call F08
  // called in index.html
  function fetchDataToCreateCardHTML() {
    fetch('./controller/src/recipes.js')
      .then((resp) => resp.json())
      .then((data) => insertCreatedHTMLCardHTML(data))
      .catch((error) => console.log(`Erreur : ${error}`));
  }