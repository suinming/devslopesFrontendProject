// navbar

const navButton = document.querySelector("button[aria-expanded]");

function toggleNav({ target }) {
    const expanded = target.getAttribute("aria-expanded") === "true" || false;
    navButton.setAttribute("aria-expanded", !expanded);
}

navButton.addEventListener("click", toggleNav);

// open favorite page

const favoriteBtn = document.querySelector('.btn.btn-primary.btn-right')
const favoritePage = document.querySelector('.favorite')
const closeBtn = document.querySelector('.fa-times')

favoriteBtn.addEventListener('click', function () {
    favoritePage.classList.add('is-visible')
    removeFavorite()
})
closeBtn.addEventListener('click', function () {
    favoritePage.classList.remove('is-visible')
    addFavorite()
})

// pokemon card

const pokemonAmount = 5

const createPokemonCard = function (pokemonInfo, index) {
    const container = document.querySelector('.collection-card-container.card-container')
    let pokemonId = pokemonInfo.id
    let pokemonName = pokemonInfo.name
    let pokemonHp = pokemonInfo.hp
    let pokemonAttack = pokemonInfo.attack
    let pokemonDefense = pokemonInfo.defense
    let pokemonTotal = pokemonHp + pokemonAttack + pokemonDefense
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg"`
    let card = document.createElement('div')
    card.className = `card card-${index}`
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

// add or remove favorite pokemon to the favorite page

const collectionCardContainer = document.querySelector(`.collection-card-container`)
const favoriteCardContainer = document.querySelector(`.favorite-card-container`)
const collectionAllCard = collectionCardContainer.childNodes
const favoriteAllCard = favoriteCardContainer.childNodes

const addFavorite = function () {
    collectionAllCard.forEach(node => {
        node.firstChild.addEventListener('click', function () {
            node.firstChild.classList.remove('fa-plus')
            node.firstChild.classList.add('fa-times')
            node.style.display = 'none'
            let favoriteNode = node
            favoriteNode.style.display = 'block'
            favoriteCardContainer.appendChild(favoriteNode)
        })
    })
}

const removeFavorite = function () {
    favoriteAllCard.forEach(node => {
        node.firstChild.addEventListener('click', function () {
            node.firstChild.classList.remove('fa-times')
            node.firstChild.classList.add('fa-plus')
            node.style.display = 'none'
            let collectionNode = node
            collectionNode.style.display = 'block'
            collectionCardContainer.appendChild(collectionNode)
        })
    })
}

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
                        createPokemonCard(object, index)
                    })
                    addFavorite()
                })
                .catch((e) => console.log('error'));
        })
        .catch((e) => console.log('error'));
}


fetchData(pokemonAmount)

































