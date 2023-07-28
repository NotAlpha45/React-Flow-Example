import { GraphFilterType } from '../../types/graph-saved-filter-types'

export default function GraphSavedFilterCard(props: GraphFilterType) {
    return (
        <>
            <p>Selected Entity Company Name: <i className='font-bold'>{props.entityName}</i></p>
            <p>Selected Filter Type: <i className='font-bold'>{props.filterType}</i></p>
            <p>Selected Share Percentage: <i className='font-bold'>{props.sharePercentage}</i></p>
        </>
    )
}
