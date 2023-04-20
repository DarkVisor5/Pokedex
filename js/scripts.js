let pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] },
    { name: 'Venusaur', height: 2, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, type: ['fire'] },
    { name: 'Charmeleon', height: 1.1, type: ['fire'] },
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  function addListItem(pokemon) {
    let pokedexList = document.querySelector('#pokedex-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('buttonNice');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokedexList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
