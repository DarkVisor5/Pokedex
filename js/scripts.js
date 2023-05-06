'use strict';

function loadPokedex() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  const loadingMessage = $('<div>').text('Loading...');
  $('#loading-container').append(loadingMessage);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      loadingMessage.remove();

      const pokedexList = $('#pokedex-list');
      for (let i = 0; i < data.results.length; i++) {
        const pokemonName = data.results[i].name;
        const pokemonUrl = data.results[i].url;
        const pokemonId = pokemonUrl.split('/').slice(-2, -1)[0];
        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        fetch(pokemonUrl)
          .then(response => response.json())
          .then(pokemonData => {
            const pokemonType = pokemonData.types[0].type.name;
            const pokemonHeight = pokemonData.height;
            const pokemonCell = $('<li>').addClass('list-group-item');
            const pokemonLink = $('<a>').addClass('btn btn-primary').attr('href', '#').text(pokemonName);
            const pokemonIcon = $('<img>').attr('src', pokemonImage).attr('alt', pokemonName).addClass('ml-2');
            pokemonLink.append(pokemonIcon);
            pokemonCell.append(pokemonLink);
            pokemonCell.css('background-color', getBackgroundColorForType(pokemonType));
            pokedexList.append(pokemonCell);

            pokemonLink.click(() => {
              $('#pokemon-name').text(pokemonName);
              $('#pokemon-height').text(pokemonHeight);
              $('#pokemon-image').attr('src', pokemonImage);
              $('#pokemon-modal').modal('show');
            });
          });
      }
    })
    .catch(error => {
      loadingMessage.remove();
      const errorMessage = $('<div>').text('Failed to load Pokedex.');
      $('#loading-container').append(errorMessage);
    });
}

function getBackgroundColorForType(type) {
  const typeColors = {
    normal: "#A8A878",
    fire : "#F08030",
    water : "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting:"#C03028",
    poison: "#A040A0",
    ground :"#E0C068",
    flying :"#A890F0",
    psychic: "#F85888",
    bug : "#A8B820",
    rock : "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel :"#B8B8D0",
    fairy: "#EE99AC",
  };

  return typeColors[type] || "#F3F3F3"; // Default to a light gray if the type is not found
}

function searchPokemon() {
  const searchBar = $('#search-bar');
  const searchTerm = searchBar.val().toLowerCase().trim();

  if (searchTerm) {
    $('#pokedex-list > li').each(function() {
      const pokemonName = $(this).find('a').text().toLowerCase();
      if (pokemonName.includes(searchTerm)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  } else {
    // If the search term is empty, show all Pokemon
    $('#pokedex-list > li').show();
  }
}

$(document).ready(() => {
  loadPokedex();
  $('#search-button').click(searchPokemon);
  $('#search-bar').on('input', searchPokemon);
});
