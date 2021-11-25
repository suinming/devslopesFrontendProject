// variables declaration

const navButton = document.querySelector("button[aria-expanded]");
const favoriteBtn = document.querySelector('.btn.btn-primary.btn-right')
const favoritePage = document.querySelector('.favorite')
const closeBtn = document.querySelector('.fa-times')

const pokemonAmount = 30

const collectionCardContainer = document.querySelector(`.collection-card-container`)
const favoriteCardContainer = document.querySelector(`.favorite-card-container`)
const collectionAllCard = collectionCardContainer.childNodes
const favoriteAllCard = favoriteCardContainer.childNodes
const pokemonDisplay = document.querySelector('.pokemon-display')

const sortBtn = document.querySelectorAll('.sort')
const sortReverseBtn = document.querySelectorAll('.sort-reverse')

// navbar

function toggleNav({ target }) {
    const expanded = target.getAttribute("aria-expanded") === "true" || false;
    navButton.setAttribute("aria-expanded", !expanded);
}

navButton.addEventListener("click", toggleNav);

// open favorite page

favoriteBtn.addEventListener('click', function () {
    favoritePage.classList.add('is-visible')
    addRemoveFavorite()
})
closeBtn.addEventListener('click', function () {
    favoritePage.classList.remove('is-visible')
    addRemoveFavorite('add')
})

// pokemon card

const createPokemonCard = function (pokemonInfo) {
    const container = document.querySelector('.collection-card-container.card-container')
    let pokemonId = pokemonInfo.id
    let pokemonName = pokemonInfo.name
    let pokemonHp = pokemonInfo.hp
    let pokemonAttack = pokemonInfo.attack
    let pokemonDefense = pokemonInfo.defense
    let pokemonTotal = pokemonHp + pokemonAttack + pokemonDefense
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg"`
    let card = document.createElement('div')
    card.dataset.name = pokemonName
    card.className = `card`
    let content =
        `<i class = 'fas fa-plus'></i>
       <div class="pokemon-imgWrapper">
         <img src="${imgUrl}" alt="pokemonImg">
       </div>
       <table>
         <tr>
         <th>Info</th>
         <th>value</th>
         </tr>
         <tr>
         <td>Name</td>
         <td>${pokemonName}</td>
         </tr>
         <tr>
         <td>Hp</td>
         <td>${pokemonHp}</td>
         </tr>
         <tr>
         <td>Attack</td>
         <td>${pokemonAttack}</td>
         </tr>
         <tr>
         <td>Defense</td>
         <td>${pokemonDefense}</td>
         </tr>
         <tr>
         <td>Total</td>
         <td>${pokemonTotal}</td>
         </tr>
        </table>`
    card.innerHTML = content
    container.appendChild(card)
}

// add or remove favorite pokemon card

const addRemoveFavorite = (status) => {
    let card = status === 'add' ? collectionAllCard : favoriteAllCard
    card.forEach(node => {
        node.firstChild.addEventListener('click', () => {
            if (status === 'add') {
                node.firstChild.classList.remove('fa-plus')
                node.firstChild.classList.add('fa-times')
            } else {
                node.firstChild.classList.remove('fa-times')
                node.firstChild.classList.add('fa-plus')
            }
            node.style.display = 'none'
            let tempNode = node
            tempNode.style.display = 'block'
            if (status === 'add') {
                favoriteCardContainer.appendChild(tempNode)
            } else {
                collectionCardContainer.appendChild(tempNode)
            }
            pokemonDisplay.textContent = `POKEMON DISPLAY : ${collectionAllCard.length}`
        })

    })
}

// sort the html elements alphabetically

const sortHtml = function () {
    let btnArr = [sortBtn, sortReverseBtn]
    btnArr.forEach((btn, index) => {
        let status = index === 0 ? 1 : -1
        btn.forEach(btn => btn.addEventListener('click', () => {
            let page = btn.dataset.page
            let nodeArray = []
            if (page === 'collection') {
                collectionAllCard.forEach(node => nodeArray.push(node));
                nodeArray.sort((a, b, num = status) => {
                    if (a.dataset.name < b.dataset.name) {
                        return -1 * num
                    } else if (a.dataset.name > b.dataset.name) {
                        return 1 * num
                    } else {
                        return 0
                    }
                }).forEach(element => collectionCardContainer.appendChild(element))

            } else {
                favoriteAllCard.forEach(node => nodeArray.push(node));
                nodeArray.sort((a, b, num = status) => {
                    if (a.dataset.name < b.dataset.name) {
                        return -1 * num
                    } else if (a.dataset.name > b.dataset.name) {
                        return 1 * num
                    } else {
                        return 0
                    }
                }).forEach(element => favoriteCardContainer.appendChild(element))
            }
        }))
    })
}

// fetch data from the pokemon API

const fetchData = function (num) {
    let api = `https://pokeapi.co/api/v2/pokemon?limit=${num}`
    fetch(api)
        .then((r) => r.json())
        .then((data) => {
            let promises = []
            data.results.forEach((pokemon) => promises.push(fetch(pokemon.url)))
            Promise.all(promises)
                .then(r => Promise.all(r.map((res) => res.json())))
                .then(data => {
                    data.forEach((pokemonData, index) => {
                        let object = {
                            'id': pokemonData.id,
                            'name': pokemonData.name,
                            'hp': pokemonData.stats[0].base_stat,
                            'attack': pokemonData.stats[1].base_stat,
                            'defense': pokemonData.stats[2].base_stat,
                        }
                        createPokemonCard(object)
                    })
                    pokemonDisplay.textContent = `POKEMON DISPLAY : ${data.length}`
                    addRemoveFavorite('add')
                    sortHtml()
                })
                .catch((e) => console.log('error'));
        })
        .catch((e) => console.log('error'));
}

// execute the function 

fetchData(pokemonAmount)

































