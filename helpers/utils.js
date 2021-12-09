export const getPokemonById = (list, id) => {
    return list.find(item => item.id == id);
}

export const getPokemonByName = (list, name) => {
    return list.find(item => item.name == name);
}

export const getPokemonsByType = (list, type) => {
    return list.filter(item => item.type.includes(type));
}

export const verifyPC = (pc) => {
    if(!pc) return { error: true, message: 'Ingrese un pc' };
    if(isNaN(pc)) return { error: true, message: 'El pc debe ser un valor numérico' };
    if(pc <= 0) return { error: true, message: 'El pc debe ser un valor mayor a 0' };
    return { error: false, message: '' };
}