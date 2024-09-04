"use client";

import { createContext, useContext, useState } from "react";

// I am using the react useContext hook to manage the searchTerm state as it allows me to access it 
// without the need of prop drilling. I am able to only use it where needed and this allowed me to change <TokenOverview />
// into a server component.

const SearchContext = createContext<any>(undefined);

export function SearchWrapper({ children }: {
    children: React.ReactNode
}) {
    let [searchTerm, setSearchTerm] = useState('')

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearchContext() {
    return useContext(SearchContext)
}