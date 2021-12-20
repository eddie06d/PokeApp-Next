import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppLayout from "../../../../components/AppLayout";
import ChartStats from "../../../../components/ChartStats";
import Modal from "../../../../components/Modal";
import { types } from "../../../../constants/PokemonTypes";
import { getPokemonById, getPokemonByName, verifyPC } from "../../../../helpers/utils";

export default function () {
    const [pokemon, setPokemon] = useState(null);
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalStats, setEstadoModalStats] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [valuePC, setValuePC] = useState('');

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setPokemon(getPokemonById(id))
    }, [id]);

    const handleChange = (e) => {
        setValuePC(e.target.value);
    }

    const handleClick = () => {
        const isValidPc = verifyPC(valuePC, pokemon?.maxCP);
        if (isValidPc.error) {
            setMessageError(isValidPc.message);
            return;
        }
        setMessageError('');
        setEstadoModal(true);
    }

    const handleClickStats = () => {
        setEstadoModalStats(true);
    }

    if(pokemon == null) return <h1 className="text-center">Loading....</h1>

    return (
        <AppLayout title={pokemon.name + ' - 1 generation'} bgColor={types[pokemon.type[0]].color}>
            <div className="py-2 px-4 w-3/5 sm:w-4/5">
                <div className="flex justify-around mds:gap-4">
                    <div>
                        <h3 className="text-xl text-center font-bold bg-black text-white py-1 rounded-md xs:text-base">Normal</h3>
                        <img src={pokemon.img} alt={pokemon.name} className="w-64" loading="lazy" />
                    </div>
                    <div>
                        <h3 className="text-xl text-center font-bold bg-black text-white py-1 rounded-md xs:text-base">Shiny</h3>
                        <img src={pokemon.imgShiny} alt={pokemon.name + 'shiny'} className="w-64" loading="lazy" />
                    </div>
                </div>
                <div className="py-6 px-5 bg-white rounded-2xl flex flex-col">
                    <h1 className="text-2xl xs:text-xl font-bold text-center">#{pokemon.num} {pokemon.name}</h1>
                    <div className="flex justify-center mt-2 mb-4">
                        {
                            pokemon.type.map(t => (
                                <img src={'/types/' + types[t].image} key={t} className="w-11 xs:w-8 mr-2" />
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap gap-3 justify-between pb-4 px-3 md:justify-center border-b-2">
                        <div className="flex items-center md:border-b-2 md:pb-4 md:w-full md:justify-center">
                            <i className="fas fa-text-height icon:fa-2x mr-2"></i>
                            <p className="text-xl xs:text-lg">Altura: {pokemon.height}</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-balance-scale icon:fa-2x mr-2"></i>
                            <p className="text-xl xs:text-lg">Peso: {pokemon.weight}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center py-4 px-3 md:justify-center border-b-2">
                        <i className="fas fa-egg icon:fa-2x"></i>
                        <p className="text-xl xs:text-lg">Aparición en huevo:</p>
                        {
                            pokemon.egg.includes('2') ? (
                                <div className="flex items-center">
                                    <img src="/huevo2km.png" alt={pokemon.name + pokemon.egg} className="h-10 xs:h-7" />
                                    <span className="text-xl xs:text-lg">- {pokemon.egg}</span>
                                </div>
                            ) : pokemon.egg.includes('5') ? (
                                <div className="flex items-center">
                                    <img src="/huevo5km.png" alt={pokemon.name + pokemon.egg} className="h-10 xs:h-7" />
                                    <span className="text-xl xs:text-lg">- {pokemon.egg}</span>
                                </div>
                            ) : (<span className="text-xl xs:text-lg">{pokemon.egg}</span>)
                        }
                    </div>
                    <div className="flex items-center gap-3 flex-wrap py-4 px-3 md:justify-center border-b-2">
                        <i className="fas fa-biohazard icon:fa-2x"></i>
                        <p className="text-xl xs:text-lg">Debilidades:</p>
                        <div className="flex flex-wrap gap-3">
                            {
                                pokemon.weaknesses.map(w => (
                                    <img src={'/types/' + types[w].image} key={w} className="w-9 xs:w-7" />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap py-4 px-3 md:justify-center border-b-2">
                        <i className="fas fa-hand-rock icon:fa-2x"></i>
                        <p className="text-xl xs:text-lg">Resistencias:</p>
                        <div className="flex flex-wrap gap-3">
                            {
                                pokemon.resistances.map(w => (
                                    <img src={'/types/' + types[w].image} key={w} className="w-9 xs:w-7" />
                                ))
                            }
                        </div>
                    </div>
                    {
                        pokemon.multipliers != null && (
                            <div className="flex flex-wrap gap-5 items-center py-4 px-3 md:justify-center">
                                <i className="fas fa-arrow-up icon:fa-2x"></i>
                                <p className="text-xl xs:text-lg">PC al evolucionar:</p>
                                <div className=" flex flex-col relative">
                                    <input
                                        type="text"
                                        className={`border rounded-md py-2 px-4 outline-none xs:text-sm ${messageError ? 'border-red-500' : ''}`}
                                        placeholder="Digite el PC del pokemon"
                                        onChange={handleChange}
                                        value={valuePC}
                                    />
                                    {
                                        messageError && (
                                            <span className="text-xs absolute text-red-500 -bottom-5">*{messageError}</span>
                                        )
                                    }
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md xs:text-base md:mt-2"
                                    onClick={handleClick}
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>
                                    Consultar
                                </button>
                            </div>
                        )
                    }
                    <button
                        className="bg-gray-500 rounded-md py-1 text-white mt-2"
                        onClick={ handleClickStats }
                    >
                        Ver stats
                    </button>
                </div>
            </div>
            {
                pokemon.multipliers != null && (
                    <Modal title="Calculadora de PC" estado={estadoModal} setEstado={setEstadoModal} >
                        <div className="flex items-center justify-center mt-3">
                            <div className="flex flex-col justify-center">
                                <img src={pokemon.img} alt={pokemon.name} className="h-44 xs:h-21" />
                                <p className="text-lg xs:text-base font-semibold">
                                    PC <span className="text-2xl xs:text-xl xs:ml-1 font-semibold ml-2">{valuePC}</span>
                                </p>
                            </div>
                            <i className="fas fa-long-arrow-alt-right fa-3x mx-6"></i>
                            <div className="flex flex-col justify-center">
                                <img src={getPokemonByName(pokemon.next_evolution[0].name).img} alt={pokemon?.name} className="h-44 xs:h-21" />
                                {
                                    pokemon.multipliers.length == 1 && (
                                        <p className="text-lg xs:text-base font-semibold">
                                            PC <span className="text-2xl xs:text-xl font-semibold ml-2 xs:ml-1">{Math.floor(valuePC * pokemon.multipliers[0])}</span>
                                        </p>
                                    )
                                }
                                {
                                    pokemon.multipliers.length == 2 && (
                                        <p className="text-lg xs:text-base font-semibold">
                                            PC <span className="text-2xl xs:text-xl font-semibold ml-2 xs:ml-1">{Math.floor(valuePC * pokemon.multipliers[0])} - {Math.floor(valuePC * pokemon.multipliers[1])}</span>
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </Modal>
                )
            }
            <Modal title="Estadísticas de combate" estado={estadoModalStats} setEstado={setEstadoModalStats} >
                <ChartStats stats={ Object.values(pokemon.stats) } color={ types[pokemon.type[0]].color } />
            </Modal>
        </AppLayout>
    )
}