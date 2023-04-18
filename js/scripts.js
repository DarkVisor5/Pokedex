// Initialize an empty array to store the Pokemon list
let pokemonList = [];

// Define the individual Pokemon objects
let pokemon1 = { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] };
let pokemon2 = { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] };
let pokemon3 = { name: 'Venusaur', height: 2, type: ['grass', 'poison'] };
let pokemon4 = { name: 'Charmender', height: 0.6, type: ['fire'] };
let pokemon5 = { name: 'Charmeleon', height: 1.1, type: ['fire'] };
let pokemon6 = { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] };

// Create an array containing all Pokemon objects
let pokemonz = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6];

// Get the pokedex-list element from the HTML
let pokedexList = document.getElementById('pokedex-list');

for (let i = 0; i < pokemonz.length; i++) {
  pokemonList.push(pokemonz[i]);
  // Create a list item for the current Pokemon
  let listItem = document.createElement('li');
  listItem.innerHTML = 'Added ' + pokemonList[i].name + ' to the Pokedex. Its height is: ' + pokemonList[i].height;

  // Check if the current Pokemon has a height greater than 1.0
  if (pokemonList[i].height > 1.0) {
    // Create a span element to display the "That's a big boy!" text
    let bigText = document.createElement('span');
    bigText.innerHTML = " That's a big boy!";
    bigText.classList.add('big');

    // Append the bigText span to the listItem
    listItem.appendChild(bigText);
  }
  // Append the listItem to the pokedexList
  pokedexList.appendChild(listItem);
}
