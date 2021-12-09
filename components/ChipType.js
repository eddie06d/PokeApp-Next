import { types } from "../constants/PokemonTypes";

export default function ChipType({ type, handleDeleteType }) {
    return (
        <>
            <div className="rounded-xl font-bold h-6 px-4 flex items-center">
                <i className="fas fa-times mr-2 cursor-pointer text-white" onClick={e => handleDeleteType(type)}></i>
                <span className="text-white">{type}</span>
            </div>
            <style jsx>{`
                div {
                    background-color: ${types[type].color};
                }
            `}</style>
        </>
    )
}