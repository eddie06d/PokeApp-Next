import { types } from "../constants/PokemonTypes"
import { useRouter } from "next/router"

export default function CardPokemon({ pokemon }) {
    const router = useRouter();
        
    const handleClick = () => {
        router.push(`1-gen/details/${pokemon.id}`);
    };

    return (
        <>
            <article className="w-64 p-3">
                <div className="rounded-lg shadow-lg relative cursor-pointer" onClick={ handleClick }>
                    <img src="/pokeball.png" alt="pokeball-img" className="absolute h-40 bottom-0 right-0 opacity-50"/>
                    <p className="text-right text-lg pr-3 font-bold pt-2">#{pokemon.num}</p>
                    <img src={pokemon.img} alt={pokemon.name} className="ml-5" />
                    <section className="p-3 ml-5">
                        <h3 className="text-xl font-bold">{pokemon.name}</h3>
                        <footer className="flex mt-2">
                            {
                                pokemon.type.map(type => (
                                    <img src={ '/types/' + types[type]?.image } key={type} className="w-7 mr-2"/>
                                ))
                            }
                        </footer>
                    </section>
                </div>
            </article>
            <style jsx>{`
                div {
                    background-color: ${ types[pokemon.type[0]].color };
                }
            `}</style>
        </>
    )
}