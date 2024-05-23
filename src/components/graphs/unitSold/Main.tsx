"use client";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import { MyContext } from "@/context/context";
import { data } from "@/data/obj";
Chart.register(...registerables);

export default function UnitSold() {
  const { includeEC, selectedMonth, setSelectedMonth } = useContext(MyContext);

  const labels = Object.keys(data);
  let unitsSold;
  if (includeEC != "All") {
    const obj: any = {};
    Object.keys(data).forEach((key) => {
      if (obj[key] === undefined) {
        obj[key] = {
          listings: [],
          soldInMonth: 0,
        };
      }
      data[key].listings.forEach((item: any) => {
        if (
          item.propertyType !==
          (includeEC == "EC" ? "Exec Condo" : "Non-Landed")
        ) {
          obj[key].listings.push(item);
          obj[key].soldInMonth += item.developerSales[0].soldInMonth;
        }
      });
    });
    unitsSold = Object.values(obj).map((item: any) => item.soldInMonth);
  } else {
    unitsSold = Object.values(data).map((item: any) => item.totalSoldByMonth);
  }

  const handleClickOnBar = (event: any, array: Array<any>) => {
    if (array.length > 0) {
      const { index } = array[0];
      const label = labels[index];
      selectedMonth == label
        ? setSelectedMonth("2024-02")
        : setSelectedMonth(label);
      // Perform any action you need with the clicked bar
    }
  };

  const colors = labels.map((label, index) => {
    if (selectedMonth == "2024-02") {
      return "#178bae";
    }

    if (selectedMonth == label) {
      return "#178bae";
    }

    return "#89a1a8";
  });

  const dataset = {
    labels: [...labels],
    datasets: [
      {
        label: "Units Sold",
        data: [...unitsSold],
        borderWidth: 0,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="w-full h-[750px] my-5">
      <Bar
        data={dataset}
        width={2000}
        height={"100%"}
        options={{
          onClick: handleClickOnBar,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
