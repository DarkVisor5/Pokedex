let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] },
    { name: 'Venusaur', height: 2, type: ['grass', 'poison'] },
    { name: 'Charmender', height: 0.6, type: ['fire'] },
    { name: 'Charmeleon', height: 1.1, type: ['fire'] },
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

let pokedexList = document.getElementById('pokedex-list');

pokemonRepository.getAll().forEach(function(pokemon) {
  let listItem = document.createElement('li');
  listItem.innerHTML = 'Added ' + pokemon.name + ' to the Pokedex. Its height is: ' + pokemon.height;

  if (pokemon.height > 1.0) {
    let bigText = document.createElement('span');
    bigText.innerHTML = " That's a big boy!";
    bigText.classList.add('big');
    listItem.appendChild(bigText);
  }

  pokedexList.appendChild(listItem);
});
