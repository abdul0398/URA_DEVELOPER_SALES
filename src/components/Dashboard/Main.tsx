import { useContext, useEffect, useState } from "react";
import UnitLaunched from "../graphs/unitLaunched/Main";
import UnitSold from "../graphs/unitSold/Main";
import MonthDetail from "../monthDetail/Main";
import UnitTable from "../table/Main";
import { IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../sidebar/Main";
import { Button } from "../ui/button";
import { IncludeEC } from "@/types/context";
import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
const EC = dynamic(() => import("../ecs/Main"), {
  ssr: false,
});
export default function Dashboard() {
  const { includeEC, setSelectedMonth, setIncludeEC } = useContext(MyContext);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [selectedView, setSelectedView] = useState<string>("units_sold_table");
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);

  const handleReset = () => {
    setIncludeEC(IncludeEC.All);
    setSelectedMonth("2024-02");
  };

  useEffect(() => {
    if (selectedView == "filters") {
      const filters = document.getElementById("main-container") as HTMLElement;
      filters.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedView]);

  const viewGenerator = () => {
    switch (selectedView) {
      case "units_sold_graph":
        return <UnitSold />;
      case "units_launched_graph":
        return <UnitLaunched />;
      case "units_launched_table":
        return <MonthDetail />;
      case "units_sold_table":
        return <UnitTable />;
      default:
        return <UnitSold />;
    }
  };

  const sideBarHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[98%] flex h-[98%] rounded-l-[40px]">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
        />
        <main
          id="main-container"
          className="w-full pb-5 rounded-r-[40px] rounded-l-[40px] lg:rounded-l-none md:rounded-l-none ms-auto border h-full overflow-y-scroll scroll no-scrollbar lg:p-2 shadow-md"
        >
          <div className="flex justify-end px-2 h-8 mt-5">
            <Button
              variant="default"
              className="me-2 bg-[#0c3f74] font-bold hover:bg-[#0c3f74]"
              onClick={handleReset}
            >
              Reset
            </Button>
            {isMobile && (
              <div className="opacity-50">
                <IoMenu size={40} onClick={sideBarHandler} />
              </div>
            )}
          </div>

          <section className="lg:w-[90%] md:w-[90%] w-[98%] overflow-x-auto overflow-y-hidden mx-auto border h-[900px] pb-3 mt-5 rounded-xl">
            <div className="min-w-[900px] w-full">
              <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                <Button
                  onClick={() => setSelectedView("units_sold_table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "units_sold_table"
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  Units Sold Table
                </Button>
                <Button
                  onClick={() => setSelectedView("units_launched_table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "units_launched_table"
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  Units Launched Table
                </Button>
                <Button
                  onClick={() => setSelectedView("units_sold_graph")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "units_sold_graph"
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  Unit Sold Graph
                </Button>
                <Button
                  onClick={() => setSelectedView("units_launched_graph")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "units_launched_graph"
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  Unit Launched Graph
                </Button>
                <div className="w-40 ms-auto me-5">
                  <EC />
                </div>
              </div>
              <div className="w-full p-5 h-full">{viewGenerator()}</div>
            </div>
          </section>

          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat lg:w-[90%] md:w-[90%] w-[98%] mx-auto h-52 border rounded-xl mt-10">
            <div className="lg:w-2/3 md:2/3 w-full">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-white z-20 opacity-100">
                Discover your dream condo rental and make it your home
              </h2>
            </div>
            <div className="text-[#0e4884] font-bold cursor-pointer h-9 w-28 flex justify-center bg-white items-center mt-5 rounded-md text-sm shadow-lg">
              Get Started
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
