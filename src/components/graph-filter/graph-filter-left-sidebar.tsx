import GraphFilterFields from "./graph-filter-fields";
import GraphSavedFilterPanel from "./graph-saved-filter-panel";


export default function GraphFilterLeftSidebar() {
    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-auto h-screen bg-gray-100 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <ul className="font-medium rounded-b-lg">
                    <li className="px-5 py-3 bg-gray-100">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-gray-800">Filters</h1>
                        </div>
                    </li>

                    <li className="px-5 py-3 bg-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="text-md text-gray-800">Select Entities Where</div>
                        </div>
                    </li>

                    <li className="px-5 py-3 bg-gray-100">
                        <GraphFilterFields />
                        <GraphSavedFilterPanel />
                    </li>
                </ul>
            </aside>
        </>
    )
}
