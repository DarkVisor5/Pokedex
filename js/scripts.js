/* global $ */
const pokemonRepository = (function () {
  const pokemonList = []

  function getAll () {
    return pokemonList
  }

  function add (item) {
    pokemonList.push(item)
  }

  function addListItem (pokemon) {
    const pokedexList = $('#pokedex-list')
    const listItem = $('<li></li>')
    listItem.addClass('list-group-item')
    const button = $('<button></button>')
    button.text(pokemon.name)
    button.addClass('btn btn-primary w-100')
    button.attr('data-toggle', 'modal')
    button.attr('data-target', '#pokemon-modal')
    button.on('click', function () {
      showDetails(pokemon)
    })
    listItem.append(button)
    pokedexList.append(listItem)
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      // Update the modal content
      $('#pokemon-name').text(pokemon.name)
      $('#pokemon-height').text(pokemon.height)
      $('#pokemon-image').attr('src', pokemon.imageUrl)
    })
  }

  function loadList () {
    showLoadingMessage()
    return $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=151', {
      dataType: 'json'
    })
      .then(function (response) {
        response.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url
          }
          add(pokemon)
        })
      })
      .catch(function (e) {
        console.error(e)
      })
      .always(function () {
        hideLoadingMessage()
      })
  }

  function loadDetails (item) {
    showLoadingMessage()
    const url = item.detailsUrl
    return $.ajax(url, {
      dataType: 'json'
    })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default
        item.height = details.height
      })
      .catch(function (e) {
        console.error(e)
      })
      .always(function () {
        hideLoadingMessage()
      })
  }

  function showLoadingMessage () {
    const loadingContainer = $('#loading-container')
    let loadingMessageElement = $('#loading-message')
    if (!loadingMessageElement.length) {
      loadingMessageElement = $('<p></p>')
      loadingMessageElement.attr('id', 'loading-message')
      loadingMessageElement.text('Loading...')
      loadingContainer.append(loadingMessageElement)
    } else {
      loadingMessageElement.show()
    }
  }
  function hideLoadingMessage () {
    const loadingMessageElement = $('#loading-message')
    if (loadingMessageElement.length) {
      loadingMessageElement.hide()
    }
  }
  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails
  }
})()

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
})
