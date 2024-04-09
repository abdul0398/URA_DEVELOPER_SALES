'use client'
import { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard/Main";
import { MyContext } from "@/context/context";
import { IncludeEC } from "@/types/context";



export default function Home() {
  const [includeEC, setIncludeEC] = useState<IncludeEC>(IncludeEC.All);
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-02');

  const contextValue = useMemo(() => ({
    includeEC,
    setIncludeEC,
    selectedMonth,
    setSelectedMonth
   }), [includeEC, selectedMonth]);



  return (
    <main className="w-full h-full">
      <MyContext.Provider value={contextValue}>
        <Dashboard/>
      </MyContext.Provider>
    </main>
  );
}
