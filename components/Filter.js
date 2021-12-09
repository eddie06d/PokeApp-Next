import { list1GenPokemons } from "../constants/Pokemons";
import { types } from "../constants/PokemonTypes";

export default function Filter({ setPokemons, setTypesList, typesList }) {
    const handleChange = (e) => {
        const typeSelected = e.target.value;
        if(typeSelected === 'All') {
            setPokemons(list1GenPokemons);
            setTypesList([]);
            return;
        }
        if(!typesList.includes(typeSelected)) setTypesList(types => [...types, typeSelected]);
    }

    return (
        <div>
            <label className="mr-4">Filtrar por tipo:</label>
            <select className="bg-gray-200 py-2 px-3 rounded-lg outline-none w-56" onChange={handleChange}>
                <option value="All" defaultValue>Todos</option>
                {
                    Object.keys(types).map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}