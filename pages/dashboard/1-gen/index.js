import { useEffect, useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import CardPokemon from '../../../components/CardPokemon';
import Search from '../../../components/Search';
import { list1GenPokemons } from '../../../constants/Pokemons';
import Filter from '../../../components/Filter';
import BoxTypes from '../../../components/BoxTypes';
import NoResults from '../../../components/NoResults';

const numPokemonsPerPage = 20;
let pages = Math.ceil(list1GenPokemons.length / numPokemonsPerPage);

export default function () {
    const [ listPokemonPerPage, setListPokemonPerPage ] = useState([]);
    const [ pokemons, setPokemons ] = useState([]);
    const [ typesList, setTypesList ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ stateButtonNext, setStateButtonNext ] = useState(true);
    const [ stateButtonPrev, setStateButtonPrev ] = useState(false);

    useEffect(() => {
        currentPage <= pages && setListPokemonPerPage(pokemons.slice((currentPage-1)*numPokemonsPerPage, numPokemonsPerPage*currentPage));
        if(currentPage === pages){ 
            setStateButtonNext(false);
            setStateButtonPrev(true);
        }else if(currentPage < pages && currentPage > 1) {
            setStateButtonNext(true);
            setStateButtonPrev(true);
        }else{ 
            setStateButtonPrev(false);
            setStateButtonNext(true);
        }
    }, [currentPage]);

    useEffect(() => {
        if(typesList.length > 0) {
            let filteredPokemons = list1GenPokemons;
            for(let typePok of typesList) {
                filteredPokemons = filteredPokemons.filter(pokemon => pokemon.type.includes(typePok));
            }
            setListPokemonPerPage(filteredPokemons.slice(0, numPokemonsPerPage));
            setPokemons(filteredPokemons);
            pages = Math.ceil(filteredPokemons.length / numPokemonsPerPage);
        }else {
            setListPokemonPerPage(list1GenPokemons.slice(0, numPokemonsPerPage));
            setPokemons(list1GenPokemons);
            pages = Math.ceil(list1GenPokemons.length / numPokemonsPerPage);
        }
        setCurrentPage(1);
    }, [ typesList ]);

    const handleDeleteType = (type) => {
        setTypesList(typesList => typesList.filter(t => t !== type));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };    

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <AppLayout title="Next PokeApp - 1 generation" bgColor="#f56e64">
            <div className="my-4 py-6 px-5 bg-white rounded-2xl flex flex-col w-3/4">
                <h1 className="text-3xl font-bold text-center">
                    Región de Kanto
                </h1>
                <div className="my-6 flex justify-between md:justify-center flex-wrap gap-4">
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
                        pokemons.length > 0 && listPokemonPerPage.map(pokemon => (
                            <CardPokemon pokemon={ pokemon } key={ pokemon.num } />
                        ))
                    }
                    {
                        pokemons.length === 0 && (
                            <NoResults />
                        )
                    }
                </div>
                {
                    pokemons.length > numPokemonsPerPage && (
                        <div className="mt-3 flex justify-end">
                            <button className={`border py-2 px-4 bg-blue-600 text-white hover:bg-blue-500 ${!stateButtonPrev ? 'pointer-events-none opacity-40' : ''}`} onClick={handlePreviousPage}>
                                <i className="far fa-arrow-alt-circle-left mr-2"></i>
                                <span className="text-xl">Prev</span>
                            </button>
                            <button className={`border py-2 px-4 bg-blue-600 text-white hover:bg-blue-500 ${!stateButtonNext ? 'pointer-events-none opacity-40' : ''}`} onClick={handleNextPage}>
                                <i className="far fa-arrow-alt-circle-right mr-2"></i>
                                <span className="text-xl">Next</span>
                            </button>
                        </div>
                    )
                }
            </div>
        </AppLayout>
    )
}