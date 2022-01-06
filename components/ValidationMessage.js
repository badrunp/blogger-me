import { toCapitaliceFirst } from '../lib/string'

function ValidationMessage({validations = {}, name = ''}) {
    return (
        <>
            {
                Object.keys(validations).length > 0 & validations[name]?.length > 0 ? (
                    <span className='block text-red-500 text-xs mt-2 font-sans font-medium'>{ toCapitaliceFirst(validations[name][0])}</span>
                ) : null
            }
        </>
    )
}

export default ValidationMessage
