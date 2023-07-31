import { GraphFilterType } from '../../types/graph-saved-filter-types'
import { GraphFilterUtils } from '../../utils/graph-utils/graph-filter-utils';
import { GraphSearchUtils } from '../../utils/graph-utils/graph-search-utils'

export default function GraphSavedFilterCard(props: GraphFilterType) {

    const handleApplyFilter = () => {

        if (props.entityId === "*") {
            GraphSearchUtils.findNodesByPercentage(
                props.sharePercentage,
                props.filterType,
            )
            return;
        }

        GraphSearchUtils.findNodesByPercentage(
            props.sharePercentage,
            props.filterType,
            props.entityId,
        )
    }

    const handleRemoveFilter = () => {
        GraphFilterUtils.removeFilter(props);
    }


    return (
        <>
            <div className='border-2 border-gray-600 rounded-lg mt-2 mb-3 p-2'>
                <div>
                    <p
                        className='p-2 rounded-md bg-white m-1'
                    >
                        Selected Entity Company Name: <i className='font-bold'>{props.entityName}</i></p>
                    <p
                        className='p-2 rounded-md bg-white m-1'
                    >
                        Selected Filter Type: <i className='font-bold'>{props.filterType}</i></p>
                    <p
                        className='p-2 rounded-md bg-white m-1'
                    >
                        Selected Share Percentage: <i className='font-bold'>{props.sharePercentage}</i></p>
                </div>
                <div className='mt-3 text-center space-x-4'>
                    <button
                        className='bg-blue-600 text-white font-bold text-sm border-2 border-blue-300 rounded-md p-2  w-auto hover:bg-blue-400'
                        onClick={handleApplyFilter}
                    >
                        Apply This Filter
                    </button>
                    <button
                        className='bg-red-600 text-white font-bold text-sm border-2 border-red-300 rounded-md p-2  w-auto hover:bg-red-400'
                        onClick={handleRemoveFilter}
                    >
                        Delete This Filter
                    </button>
                </div>
            </div>
        </>
    )
}
