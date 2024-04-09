import { IncludeEC, MyContextValue } from '@/types/context';
import React, { createContext, useState, ReactNode } from 'react';

export const MyContext = createContext<MyContextValue>({
    includeEC: IncludeEC.All,
    setIncludeEC: () => { },
    selectedMonth: "",
    setSelectedMonth: () => { },

});

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [includeEC, setIncludeEC] = useState<IncludeEC>(IncludeEC.All);

    // Provide the context value to children
    return (
        <MyContext.Provider value={{ selectedMonth, setSelectedMonth, includeEC, setIncludeEC }}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider;