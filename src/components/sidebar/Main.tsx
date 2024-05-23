"use client";
import Image from "next/image";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

export default function Sidebar({
  selectedView,
  setSelectedView,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedView: string | null;
  setSelectedView: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isMobile: boolean;
}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed h-[98%] lg:h-[100%] md:h-[100%] w-1/2 md:w-fit lg:w-fit md:z-0 z-50 lg:z-0 md:block md:relative lg:relative  lg:block">
          <aside
            id="default-sidebar"
            className="min-w-[300px] h-full"
            aria-label="Sidebar"
          >
            <div className="h-full rounded-l-3xl overflow-y-auto bg-[#0e4884] text-white">
              <div className="my-5">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={220}
                  className="mx-auto"
                />
              </div>
              <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
                <div
                  onClick={() => {
                    setSelectedView("units_sold_table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "units_sold_table"
                      ? "bg-[#0e4884]"
                      : "bg-white"
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("units_sold_table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "units_sold_table" ? "text-white" : ""
                    }`}
                  >
                    <FaFilter size={20} className="ms-2" />
                    <p className="ms-4 text-sm font-medium">Units Sold Table</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("units_launched_table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "units_launched_table"
                      ? "bg-[#0e4884]"
                      : "bg-white"
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("units_launched_table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "units_launched_table"
                        ? "text-white"
                        : ""
                    }`}
                  >
                    <FaFilter size={20} className="ms-2" />
                    <p className="ms-4 text-sm font-medium">
                      Units Launched Table
                    </p>
                  </h1>
                </div>

                <div
                  onClick={() => {
                    setSelectedView("units_sold_graph");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "units_sold_graph"
                      ? "bg-[#0e4884]"
                      : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("units_sold_graph");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "units_sold_graph" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4 text-sm font-medium">Unit Sold Graph</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("units_launched_graph");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "units_launched_graph"
                      ? "bg-[#0e4884]"
                      : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("units_launched_graph");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "units_launched_graph"
                        ? "text-white"
                        : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4 text-sm font-medium">
                      Unit Launched Graph
                    </p>
                  </h1>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
