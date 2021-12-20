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
        <div className="flex items-center xs:flex-col">
            <label className="mr-4 xs:mb-3">Filtrar por tipo:</label>
            <select className="bg-gray-200 py-2 px-3 rounded-lg outline-none w-52" onChange={handleChange}>
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