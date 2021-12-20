import { list1GenPokemons } from "../constants/Pokemons";

export const getPokemonById = (id) => {
    return list1GenPokemons.find(pokemon => pokemon.id == id);
}

export const getPokemonByName = (name) => {
    return list1GenPokemons.find(pokemon => pokemon.name == name);
}

export const getPokemonsByType = (type) => {
    return list1GenPokemons.filter(pokemon => pokemon.type.includes(type));
}

export const verifyPC = (pc, maxCP) => {
    if(!pc) return { error: true, message: 'Ingrese un pc' };
    if(isNaN(pc)) return { error: true, message: 'El pc debe ser un valor numérico' };
    if(pc <= 0) return { error: true, message: 'El pc debe ser un valor mayor a 0' };
    if(pc > maxCP) return { error: true, message: 'El pc debe ser menor o igual a ' + maxCP };
    return { error: false, message: '' };
}