//Seleção da UL responsável por fazer a listagem dos itens
const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    //Listagem da quantidade de registros máximos da API ()
    for (let i = 1; i <= 327; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    //Promise serve para retornar os dados
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            //Nome do pokémon
            name: result.name,
            //Imagem PNG
            image: result.sprites['front_default'],
            //Tipos de pokémon
            type: result.types.map((type) => type.type.name).join(', '),
            //ID pokémon
            id: result.id
        }));
        //Este método serve para organizar a listagem dos pokémons, colocando-os como LI dentro de um UL
        displayPokemon(pokemon);
    });
};


const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.name}</h2>
            </li> `
        ).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

//Chamada do método principal
fetchPokemon();