import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { ListChildComponentProps } from "react-window";
import { data } from "@/data/obj";
const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function UnitTable() {
  const { includeEC, selectedMonth } = useContext(MyContext);
  let listings = data[selectedMonth].listings;
  listings = listings.filter(
    (item: any) => item.developerSales[0].soldInMonth > 0
  );
  if (includeEC != "All") {
    console.log(includeEC);
    listings = listings.filter((item: any) => {
      return (
        item.propertyType == (includeEC == "EC" ? "Exec Condo" : "Non-Landed")
      );
    });
  }

  listings.sort(
    (a: any, b: any) =>
      b.developerSales[0].soldInMonth - a.developerSales[0].soldInMonth
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
        <div className="px-1 text-xs">{data.developerSales[0].soldInMonth}</div>
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
    <div className="">
      <h1 className="text-center">
        Units Sold in Report Month ({selectedMonth})
      </h1>
      <div className="bg-white w-full overflow-auto px-2">
        <div className="flex flex-col bg-white">
          <div className="overflow-x-auto sm:mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm: lg:px-8">
              <div className="overflow-hidden">
                <div className="min-w-full text-left text-xs font-light overflow-hidden">
                  <div className="border-b font-medium mt-3 dark:border-neutral-500 grid gap-1 grid-cols-[15%_14%_10%_10%_10%_15%_10%_10%] text-xs">
                    <div className="px-1 text-xs">Project</div>
                    <div className="px-1 text-xs">Sold in Month</div>
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
        </div>
      </div>
    </div>
  );
}
