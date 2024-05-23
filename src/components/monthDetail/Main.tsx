import { MyContext } from "@/context/context";
import { IncludeEC } from "@/types/context";
import dynamic from "next/dynamic";
import { ChangeEvent, useContext } from "react";
import { ListChildComponentProps } from "react-window";
import { data } from "@/data/obj";
const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function MonthDetail() {
  const { includeEC, selectedMonth, setSelectedMonth, setIncludeEC } =
    useContext(MyContext);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.getAttribute("data-val");
    const isChecked = e.target.checked;

    if (val === "All") {
      setIncludeEC(isChecked ? IncludeEC.All : IncludeEC.NonEC);
    } else if (val === "EC") {
      setIncludeEC(
        isChecked
          ? IncludeEC.EC
          : includeEC === IncludeEC.EC
          ? IncludeEC.NonEC
          : IncludeEC.All
      );
    } else {
      setIncludeEC(
        isChecked
          ? IncludeEC.NonEC
          : includeEC === IncludeEC.NonEC
          ? IncludeEC.EC
          : IncludeEC.All
      );
    }
  };

  let listings = data[selectedMonth].listings;
  listings = listings.filter(
    (item: any) => item.developerSales[0].launchedInMonth > 0
  );

  if (includeEC != "All") {
    console.log(includeEC);
    listings = listings.filter(
      (item: any) =>
        item.propertyType == (includeEC == "EC" ? "Exec Condo" : "Non-Landed")
    );
  }

  listings.sort(
    (a: any, b: any) =>
      b.developerSales[0].launchedInMonth - a.developerSales[0].launchedInMonth
  );

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const data = listings[index];

    if (!data) {
      return null; // Return null if transaction is not available
    }

    return (
      <div
        key={index}
        style={style}
        className="h-14 grid gap-1 grid-cols-[15%_14%_10%_10%_10%_15%_10%_10%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
      >
        <div className="px-1 text-xs">{data.project}</div>
        <div className="px-1 text-xs">
          {data.developerSales[0].launchedInMonth}
        </div>
        <div className="px-1 text-xs">{data.district}</div>
        <div className="px-1 text-xs">{data.marketSegment}</div>
        <div className="px-1 text-xs">{data.developerSales[0].unitsAvail}</div>
        <div className="px-1 text-xs">
          {data.developerSales[0].launchedToDate}
        </div>
        <div className="px-1 text-xs">{data.developerSales[0].soldToDate}</div>
        <div className="px-1 text-xs">
          {data.developerSales[0].unitsAvail -
            data.developerSales[0].soldToDate}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white w-full px-2">
        {/* <div className="flex flex-row w-full">
                    <div className="w-1/2 h-full pt-4">
                        <h1 className="text-center">Include ECS</h1>
                        <div className="w-32 mx-auto mt-4">
                            <div className="flex">
                                <input type="checkbox" onChange={(e) => handleCheckboxChange(e)} data-val="All" checked={includeEC == "All"} />
                                <p className="ms-3 font-bold">Select All</p>
                            </div>
                            <div className="flex">
                                <input type="checkbox" onChange={(e) => handleCheckboxChange(e)} data-val="EC" checked={includeEC == 'All' || includeEC == "EC"} />
                                <p className="ms-3 font-bold">EC</p>
                            </div>
                            <div className="flex">
                                <input type="checkbox" onChange={(e) => handleCheckboxChange(e)} data-val="Non-EC" checked={includeEC == "All" || includeEC == "Non-EC"} />
                                <p className="ms-3 font-bold">Non-EC</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full pt-4">
                        <h1 className="text-center">Report Month</h1>
                        <p className="text-center font-bold mt-4">{selectedMonth}</p>
                    </div>

                </div> */}
        <div className="w-full">
          <h1 className="text-center">
            Units Launched in Report Month ({selectedMonth})
          </h1>
          <div className="min-w-full text-left text-xs font-light overflow-hidden">
            <div className=" mt-3 border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[15%_14%_10%_10%_10%_15%_10%_10%] text-xs">
              <div className="px-1 text-xs">Project</div>
              <div className="px-1 text-xs overflow-hidden">
                Launched in Month
              </div>
              <div className="px-1 text-xs">District</div>
              <div className="px-1 text-xs">Region</div>
              <div className="px-1 text-xs">Unit Avail</div>
              <div className="px-1 text-xs">Launched to Date</div>
              <div className="px-1 text-xs">Sold to Date</div>
              <div className="px-1 text-xs">Balance Units</div>
            </div>
            <div className="overflow-hidden mt-5">
              <List
                height={700}
                itemCount={listings.length}
                itemSize={50}
                width={"100%"}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
