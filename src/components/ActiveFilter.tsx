import { XMarkIcon } from "@heroicons/react/20/solid"
import { convertNumberToText } from "@/app/utils";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface Props {
    filterValue: string | number | null;
    filterTitle: string | null;
    resetFilter: Dispatch<SetStateAction<boolean>>
    resetPlantsList: Dispatch<SetStateAction<void>>;
}


export default function ActiveFilter({filterValue, filterTitle, resetFilter, resetPlantsList}: Props) {
    return (
        <>
          <span
            className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline-offset-1 ring-1 ring-inset ring-gray-300"
          >
            {filterTitle}: {typeof(filterValue) === 'number' ? convertNumberToText(filterValue) : filterValue}
            <button
              type="button"
              className="inline-flex rounded-full p-1 text-gray-900 hover:bg-gray-300"
              onClick={() => (
                resetFilter(false),
                resetPlantsList()
            )}
            >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </span>
        </>
  )
}
