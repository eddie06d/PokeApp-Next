import { useEffect, useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import CardPokemon from '../../../components/CardPokemon';
import Search from '../../../components/Search';
import { list1GenPokemons } from '../../../constants/Pokemons';
import Filter from '../../../components/Filter';
import BoxTypes from '../../../components/BoxTypes';
import NoResults from '../../../components/NoResults';

export default function () {
    const [ pokemons, setPokemons ] = useState([]);
    const [ typesList, setTypesList ] = useState([]);

    useEffect(() => {
        setPokemons(list1GenPokemons);
    }, []);

    useEffect(() => {
        if(typesList.length > 0) {
            let filteredPokemons = list1GenPokemons;
            for(let typePok of typesList) {
                filteredPokemons = filteredPokemons.filter(pokemon => pokemon.type.includes(typePok));
            }
            setPokemons(filteredPokemons);
        }else setPokemons(list1GenPokemons);
    }, [ typesList ]);

    const handleDeleteType = (type) => {
        setTypesList(typesList => typesList.filter(t => t !== type));
    };

    return (
        <AppLayout title="Next PokeApp - 1 generation" bgColor="#f56e64">
            <div className="my-4 py-6 px-5 bg-white rounded-2xl flex flex-col w-3/4">
                <h1 className="text-3xl font-bold text-center">
                    Región de Kanto
                </h1>
                <div className="my-6 flex justify-between">
                    <Search />
                    <Filter setPokemons={setPokemons} setTypesList={setTypesList} typesList={typesList} />
                </div>
                {
                    typesList.length > 0 && (
                        <BoxTypes typesList={typesList} handleDeleteType={handleDeleteType} />
                    )
                }
                <div className="flex flex-wrap justify-around">
                    {
                        pokemons.length > 0 && pokemons.map(pokemon => (
                            <CardPokemon pokemon={ pokemon } key={ pokemon.num } />
                        ))
                    }
                    {
                        pokemons.length === 0 && (
                            <NoResults />
                        )
                    }
                </div>
            </div>
        </AppLayout>
    )
}