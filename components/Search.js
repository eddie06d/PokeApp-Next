import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'
import { types } from '../constants/PokemonTypes'

const AutocompleteItem = ({ id, name, img, type }) => {
    return (
        <li>
            <Link href={`1-gen/details/${id}`}>
                <a className='hover:bg-blue-300 flex gap-4 p-4'>
                    <img src={img} alt={name} className='w-12 h-12 object-contain' />
                    <div>
                        <h3 className='text-sm font-semibold'>{name}</h3>
                        <section className="flex">
                            {
                                type.map(t => (
                                    <img src={ '/types/' + types[t]?.image } key={t} className="w-5 mr-2"/>
                                ))
                            }
                        </section>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default function Search(props) {
    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false
    })

    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: 'Buscar pokemon',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [{
            sourceId: 'pokemons-next-api',
            getItems: async ({ query }) => {
                if (!!query) {
                    return fetch(`/api/search?q=${query}`)
                        .then(res => res.json())
                }
            }
        }],
        ...props
    }), [props])

    const formRef = useRef(null)
    const inputRef = useRef(null)
    const panelRef = useRef(null)

    const formProps = autocomplete.getFormProps({
        inputElement: inputRef.current
    })
    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current
    })

    return (
        <form ref={formRef} {...formProps}>
            <div className="flex relative">
                <div className="border-gray-200 border h-10 flex items-center px-3 rounded-tl-lg rounded-bl-lg">
                    <i className="fas fa-search"></i>
                </div>
                <input ref={inputRef} className='bg-gray-200 py-2 px-3 rounded-tr-lg rounded-br-lg outline-none w-72' {...inputProps} />
                {
                    autocompleteState.isOpen && (
                        <div className="absolute top-0 left-0 z-10 border border-gray-100 bg-white mt-12 overflow-hidden rounded-lg shadow-lg" ref={panelRef} {...autocomplete.getPanelProps()}>
                            {autocompleteState.collections.map((collection, index) => {
                                const { items } = collection
                                return (
                                    <section key={`section-${index}`}>
                                        {items.length > 0 && (
                                            <ul {...autocomplete.getListProps()}>
                                                {
                                                    items.map(item => <AutocompleteItem key={item.id} {...item} />)
                                                }
                                            </ul>
                                        )}
                                    </section>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </form>
    )
}