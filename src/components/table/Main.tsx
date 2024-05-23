import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
import React, { use, useContext, useEffect } from "react";
import { ListChildComponentProps } from "react-window";
import { data } from "@/data/obj";
import { FaSort } from "react-icons/fa";
const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),

  {
    ssr: false, // Disable SSR for this component
  }
);

export default function UnitTable() {
  const { includeEC, selectedMonth } = useContext(MyContext);
  const [listings, setListings] = React.useState<any[]>(
    data[selectedMonth].listings
  );
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    if (includeEC != "All") {
      const newListing = data[selectedMonth].listings.filter((item: any) => {
        return (
          item.propertyType == (includeEC == "EC" ? "Exec Condo" : "Non-Landed")
        );
      });
      setListings([...newListing]);
    } else {
      setListings([...data[selectedMonth].listings]);
    }
  }, [includeEC]);

  const handleSort = (type: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === type &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedListings = [...listings].sort((a: any, b: any) => {
      if (type === "project" || type === "district") {
        if (a[type] < b[type]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[type] > b[type]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (type === "soldInMonth") {
        return direction === "ascending"
          ? a.developerSales[0].soldInMonth - b.developerSales[0].soldInMonth
          : b.developerSales[0].soldInMonth - a.developerSales[0].soldInMonth;
      } else if (type === "unitsAvail") {
        return direction === "ascending"
          ? a.developerSales[0].unitsAvail - b.developerSales[0].unitsAvail
          : b.developerSales[0].unitsAvail - a.developerSales[0].unitsAvail;
      } else if (type === "soldToDate") {
        return direction === "ascending"
          ? a.developerSales[0].soldToDate - b.developerSales[0].soldToDate
          : b.developerSales[0].soldToDate - a.developerSales[0].soldToDate;
      } else if (type === "balanceUnits") {
        const balanceA =
          a.developerSales[0].unitsAvail - a.developerSales[0].soldToDate;
        const balanceB =
          b.developerSales[0].unitsAvail - b.developerSales[0].soldToDate;
        return direction === "ascending"
          ? balanceA - balanceB
          : balanceB - balanceA;
      }
      return 0;
    });

    setSortConfig({ key: type, direction });
    setListings(sortedListings);
  };

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
                    <div className="px-1 text-xs flex">
                      Project
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("project")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Sold in Month{" "}
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("soldInMonth")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      District
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("district")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs">Region</div>
                    <div className="px-1 text-xs flex">
                      Unit Avail{" "}
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("unitsAvail")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs">Launched to Date</div>
                    <div className="px-1 text-xs flex">
                      Sold to Date{" "}
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("soldToDate")}
                        />
                      </span>
                    </div>
                    <div className="px-1 text-xs flex">
                      Balance Units{" "}
                      <span className="flex items-center ms-2">
                        <FaSort
                          className="hover:cursor-pointer"
                          onClick={() => handleSort("balanceUnits")}
                        />
                      </span>
                    </div>
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
