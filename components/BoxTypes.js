import ChipType from "./ChipType";

export default function BoxTypes({ typesList, handleDeleteType }) {
    return (
        <section className="w-96 py-4 px-2 flex flex-wrap gap-2 justify-around border-2 mb-3 rounded-lg mx-auto border-black">
            {
                typesList.map((type, i) => (
                    <ChipType key={type + i} type={type} handleDeleteType={handleDeleteType} />
                ))
            }
        </section>
    )
}