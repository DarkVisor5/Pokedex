let pokemonRepository = (function () {
  let pokemonList = [];

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
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokedexList.appendChild(listItem);
  }
  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modal = document.getElementById('pokemon-modal');
      let span = document.getElementsByClassName('close')[0];
  
      // Update the modal content
      document.getElementById('pokemon-name').textContent = pokemon.name;
      document.getElementById('pokemon-height').textContent = pokemon.height;
      document.getElementById('pokemon-image').src = pokemon.imageUrl;
  
      // Open the modal
      modal.style.display = 'block';
  
      // Close the modal when the user clicks on the close button
      span.onclick = function () {
        modal.style.display = 'none';
      };
  
      // Close the modal when the user clicks outside of the modal content
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
  
      // Close the modal when the user presses the Escape key
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          modal.style.display = 'none';
        }
      });
    });
  }
  

  function loadList() {
    showLoadingMessage();
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(function () {
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Use optional chaining and nullish coalescing to handle potential undefined values
        item.imageUrl = details?.sprites?.front_default ?? '';
        item.height = details?.height ?? 0;
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(function () {
        hideLoadingMessage();
      });
  }
  

  function showLoadingMessage() {
    let loadingContainer = document.querySelector('#loading-container');
    let loadingMessageElement = document.querySelector('#loading-message');
    if (!loadingMessageElement) {
      loadingMessageElement = document.createElement('p');
      loadingMessageElement.id = 'loading-message';
      loadingMessageElement.innerText = 'Loading...';
      loadingContainer.appendChild(loadingMessageElement);
    } else {
      loadingMessageElement.style.display = 'block';
    }
  }
  
  
  function hideLoadingMessage() {
    let loadingMessageElement = document.querySelector('#loading-message');
    if (loadingMessageElement) {
      loadingMessageElement.style.display = 'none';
    }
  }  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
