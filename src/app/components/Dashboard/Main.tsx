import UnitLaunched from "../graphs/unitLaunched/Main";
import UnitSold from "../graphs/unitSold/Main";
import MonthDetail from "../monthDetail/Main";
import UnitTable from "../table/Main";

export default function Dashboard() {
    return (
        <div className="w-3/4 mx-auto py-10 px-4 ">
                <section className="w-full mb-5">
                    <h2 className="text-3xl">URA Developer Sales Data (Units Launched and Sold)</h2>
                </section>
            <div className="w-full h-full bg-[#f3f4f6]">

                <section className="flex w-full h-96 my-5">
                    <UnitTable />
                    <MonthDetail />
                </section>
                <section>
                    <UnitSold />
                    <UnitLaunched />
                </section>
            </div>
        </div>
    )
}