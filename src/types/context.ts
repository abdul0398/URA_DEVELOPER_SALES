export enum IncludeEC {
    EC = "EC",
    NonEC = "Non-EC",
    All = "All"
}


export interface MyContextValue {
    includeEC: IncludeEC;
    setIncludeEC: React.Dispatch<React.SetStateAction<IncludeEC>>;
    selectedMonth: string;
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
}
