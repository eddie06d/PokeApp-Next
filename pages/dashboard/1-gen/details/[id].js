import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppLayout from "../../../../components/AppLayout";
import Modal from "../../../../components/Modal";
import { list1GenPokemons } from "../../../../constants/Pokemons";
import { types } from "../../../../constants/PokemonTypes";
import { getPokemonById, getPokemonByName, verifyPC } from "../../../../helpers/utils";

export default function () {
    const [pokemon, setPokemon] = useState(null);
    const [estadoModal, setEstadoModal] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [valuePC, setValuePC] = useState('');

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setPokemon(getPokemonById(list1GenPokemons, id))
    }, [id]);

    const handleChange = (e) => {
        setValuePC(e.target.value);
    }

    const handleClick = () => {
        const isValidPc = verifyPC(valuePC);
        if (isValidPc.error) {
            setMessageError(isValidPc.message);
            return;
        }
        setMessageError('');
        setEstadoModal(true);
    }

    return (
        <AppLayout title={pokemon?.name + ' - 1 generation'} bgColor={types[pokemon?.type[0]]?.color}>
            <div className="py-2 px-4 w-3/5">
                <img src={pokemon?.img} alt={pokemon?.name} className="w-64 mx-auto" />
                <div className="py-6 px-5 bg-white rounded-2xl flex flex-col">
                    <h1 className="text-2xl font-bold text-center">#{pokemon?.num} {pokemon?.name}</h1>
                    <div className="flex justify-center mt-2 mb-4">
                        {
                            pokemon?.type.map(t => (
                                <img src={'/types/' + types[t].image} key={t} className="w-11 mr-2" />
                            ))
                        }
                    </div>
                    <div className="flex justify-between pb-4 px-3">
                        <div className="flex items-center">
                            <i className="fas fa-text-height fa-2x mr-2"></i>
                            <p className="text-xl">Altura: {pokemon?.height}</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-balance-scale fa-2x mr-2"></i>
                            <p className="text-xl">Peso: {pokemon?.weight}</p>
                        </div>
                    </div>
                    <div className="flex items-center pb-4 px-3">
                        <i className="fas fa-egg fa-2x mr-2"></i>
                        <p className="text-xl">Aparición en huevo:</p>
                        {
                            pokemon?.egg.includes('2') ? (
                                <div className="flex items-center">
                                    <img src="/huevo2km.png" alt={pokemon?.name + pokemon?.egg} className="h-10" />
                                    <span className="text-xl">- {pokemon?.egg}</span>
                                </div>
                            ) : pokemon?.egg.includes('5') ? (
                                <div className="flex items-center">
                                    <img src="/huevo5km.png" alt={pokemon?.name + pokemon?.egg} className="h-10" />
                                    <span className="text-xl">- {pokemon?.egg}</span>
                                </div>
                            ) : (<span className="text-xl ml-2">{pokemon?.egg}</span>)
                        }
                    </div>
                    <div className="flex items-center pb-4 px-3">
                        <i className="fas fa-biohazard fa-2x mr-2"></i>
                        <p className="mr-2 text-xl">Debilidades:</p>
                        {
                            pokemon?.weaknesses.map(w => (
                                <img src={'/types/' + types[w].image} key={w} className="w-9 mr-2" />
                            ))
                        }
                    </div>
                    {
                        pokemon?.multipliers != null && (
                            <div className="flex items-center pb-2 px-3">
                                <i className="fas fa-arrow-up mr-2 fa-2x"></i>
                                <p className="text-xl">PC al evolucionar:</p>
                                <div className="ml-3 flex flex-col justify-end relative">
                                    <input
                                        type="text"
                                        className={`border-2 rounded-md py-2 px-4 outline-none ${messageError ? 'border-red-500' : ''}`}
                                        placeholder="Digite el PC actual del pokemon"
                                        onChange={handleChange}
                                        value={valuePC}
                                    />
                                    {
                                        messageError && (
                                            <span className="text-sm absolute text-red-500 -bottom-5">*{messageError}</span>
                                        )
                                    }
                                </div>
                                <button
                                    className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                    onClick={handleClick}
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>
                                    Consultar
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                pokemon?.multipliers != null && (
                    <Modal title="Calculadora de PC" estado={estadoModal} setEstado={setEstadoModal} >
                        <div className="flex items-center justify-center mt-3">
                            <div className="flex flex-col justify-center">
                                <img src={pokemon?.img} alt={pokemon?.name} className="h-44" />
                                <p className="text-lg font-semibold">
                                    PC <span className="text-2xl font-semibold ml-2">{valuePC}</span>
                                </p>
                            </div>
                            <i className="fas fa-arrow-right fa-3x mx-6"></i>
                            <div className="flex flex-col justify-center">
                                <img src={getPokemonByName(list1GenPokemons, pokemon?.next_evolution[0].name)?.img} alt={pokemon?.name} className="h-44" />
                                {
                                    pokemon?.multipliers.length == 1 && (
                                        <p className="text-lg font-semibold">
                                            PC <span className="text-2xl font-semibold ml-2">{Math.floor(valuePC * pokemon?.multipliers[0])}</span>
                                        </p>
                                    )
                                }
                                {
                                    pokemon?.multipliers.length == 2 && (
                                        <p className="text-lg font-semibold">
                                            PC <span className="text-2xl font-semibold ml-2">{Math.floor(valuePC * pokemon?.multipliers[0])} - {Math.floor(valuePC * pokemon?.multipliers[1])}</span>
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </Modal>
                )
            }
        </AppLayout>
    )
}