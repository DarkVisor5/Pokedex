let pokemonList=[];

let pokemon1= {name:'Bulbasaur',  height:'0.7 m',  type:['grass','poison']};
let pokemon2= {name:'Ivysaur',    height:'1 m',    type:['grass','poison']};
let pokemon3= {name:'Venusaur',   height:'2 m',    type:['grass','poison']};
let pokemon4= {name:'Charmender', height:'0.6 m',  type:['fire']};
let pokemon5= {name:'Charmeleon', height:'1.1m',   type:['fire']};
let pokemon6= {name:'Charizard',  height:'1.7m',   type:['fire','flying']};

let pokemonz=[pokemon1,pokemon2,pokemon3,pokemon4,pokemon5,pokemon6];

for (let i=0;i<pokemonz.length;i++){
    pokemonList.push(pokemonz[i]);
    console.log('Added '+ pokemonz[i].name+' to the pokedex');
}