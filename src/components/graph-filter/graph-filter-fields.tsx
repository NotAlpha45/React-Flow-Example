import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react'
import { EntityControlUtils } from '../../utils/entity-utils/entity-control-utils'
import { GraphSearchUtils } from '../../utils/graph-utils/graph-search-utils'
import { GraphLayoutUtils } from '../../utils/graph-utils/graph-layout-utils'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function GraphFilterFields() {

    const entityNamesAndIds = EntityControlUtils.getEntityNamesAndIds();
    const [selectedEntityId, setSelectedEntityId] = React.useState("");
    const [selectedEntityName, setSelectedEntityName] = React.useState("");
    const [selectedFilterType, setSelectedFilterType] = React.useState("");
    const [selectedOwnershipPercentage, setSelectedOwnershipPercentage] = React.useState(0);

    const filterTypes = ["equals", "not equals", "contains", "not contains", "starts with", "ends with"]


    const handleEntitySelection = (selectedEntityId: string, selectedEntityName: string) => {
        setSelectedEntityId(selectedEntityId);
        setSelectedEntityName(selectedEntityName);
    }

    const handleFilterTypeSelection = (selectedFilterType: string) => {
        setSelectedFilterType(selectedFilterType);
    }

    const handleOwnershipPercentageSelection = (selectedOwnershipPercentage: number) => {
        setSelectedOwnershipPercentage(selectedOwnershipPercentage);
    }

    const handleApplyFilter = () => {
        if (selectedEntityId === "" || selectedFilterType === "" || selectedOwnershipPercentage === 0) {
            return;
        }

        if (selectedEntityId === "*") {
            GraphSearchUtils.findNodesByOwnershipPercentage(selectedOwnershipPercentage);
            return;
        }
        GraphSearchUtils.findNodesByOwnershipPercentage(selectedOwnershipPercentage, selectedEntityId);
    }

    const handleResetFilter = () => {
        setSelectedEntityId("");
        setSelectedEntityName("");
        setSelectedFilterType("");
        setSelectedOwnershipPercentage(0);
        GraphLayoutUtils.setDefaultNodeStyle();
    }

    return (
        <>
            <Menu as="div" className="flex text-left">
                <div>
                    <Menu.Button className="flex w-64 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {
                            selectedEntityId === "" ? "Select Entity Company Name" : `${selectedEntityId} - ${selectedEntityName}`
                        }
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 justify-start">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => handleEntitySelection("*", "Any")}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Any (*)
                                    </a>
                                )}
                            </Menu.Item>
                            {
                                entityNamesAndIds.map((entityNameAndId) => {
                                    return (
                                        <Menu.Item key={entityNameAndId.entityId}>
                                            {({ active }) => (
                                                <a
                                                    onClick={() => handleEntitySelection(entityNameAndId.entityId, entityNameAndId.entityName)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {`${entityNameAndId.entityId} - ${entityNameAndId.entityName}`}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    )
                                }
                                )
                            }

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <div id="input-field" className="mt-2 flex ">
                <div className="flex items-center py-1 justify-start">

                    <Menu as="div" className="flex text-left mr-2">
                        <div>
                            <Menu.Button className="flex justify-between w-40 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                {
                                    selectedFilterType === "" ? "Select Filter Type" : `${selectedFilterType}`
                                }
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute w-32 z-10 mt-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {
                                        filterTypes.map((filterType) => {
                                            return (
                                                <Menu.Item key={filterType}>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={() => handleFilterTypeSelection(filterType)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {filterType}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            )
                                        })
                                    }

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="flex items-center justify-between">
                    <input type="number"
                        className="w-32 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        placeholder="Share (%)"
                        onChange={(e) => handleOwnershipPercentageSelection(parseInt(e.target.value))}
                    />
                </div>
            </div>


            <div className='flex mt-4'>
                <button className="text-center  w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-800 shadow-sm ring-inset ring-red-800 ring-2 hover:text-red-600"
                    onClick={handleResetFilter}
                >
                    Reset Filter
                </button>
            </div>

            <div id="button-groups" className='flex justify-between mt-2 space-x-2'>

                <button className="text-center  w-32 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 disabled:opacity-25"
                    onClick={handleApplyFilter}
                    disabled={selectedEntityId === "" || selectedFilterType === "" || selectedOwnershipPercentage === 0}
                >
                    Apply Filter
                </button>
                <button type='button' className="text-center  w-32 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500 disabled:opacity-25"
                    disabled={selectedEntityId === "" || selectedFilterType === "" || selectedOwnershipPercentage === 0}
                >
                    Save Filter
                </button>
            </div>
        </>
    )
}
