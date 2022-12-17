const urlPokeApi = 'https://pokeapi.co/api/v2';

document.addEventListener('DOMContentLoaded', callPokemon, false);


async function callPokemon(){
  const countPokemons = await callPokeCount();
  const pokeNumber = pokeRandom(countPokemons);
  const pokeData = await callPokeApi(pokeNumber);
  giveDataToHtml(pokeData);
}


async function callPokeApi($number){
  let data;
  await fetch(urlPokeApi+'/pokemon/'+$number)
  .then(response => 
    response.json())
  .then(response => data=response)
  .catch((e)=> {
    console.log(e);
    callPokemon();
  })
  return data;
}

async function callPokeCount(){
  let count;
  await fetch(urlPokeApi+'/pokemon?limit=100000&offset=0')
  .then(response => response.json())
  .then(data => count = data.count);
  return count;
}

function pokeRandom($pokeCount){
  return Math.floor(Math.random() * $pokeCount);
}


function giveDataToHtml($data){
  $(".card-body-img").attr("src",$data.sprites.front_default);
  document.querySelector('.card-body-title').innerHTML = `${$data.name.toUpperCase()} <span>${$data.id}</span>`;
  document.querySelector('#id').innerHTML = $data.id;
  document.querySelector('#height').innerHTML = $data.height;
  document.querySelector('#baseExperience').innerHTML = $data.base_experience;
  document.querySelector('.card-body-text').innerHTML = $data.types[0].type.name.toUpperCase();
}