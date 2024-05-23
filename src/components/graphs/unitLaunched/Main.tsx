"use client";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import { MyContext } from "@/context/context";
import { data } from "@/data/obj";
Chart.register(...registerables);

export default function UnitLaunched() {
  const { includeEC, selectedMonth, setSelectedMonth } = useContext(MyContext);
  const labels = Object.keys(data);
  let unitLaunched;
  if (includeEC != "All") {
    const obj: any = {};
    Object.keys(data).forEach((key) => {
      if (obj[key] === undefined) {
        obj[key] = {
          listings: [],
          totalLaunchedByMonth: 0,
        };
      }
      data[key].listings.forEach((item: any) => {
        if (
          item.propertyType !==
          (includeEC == "EC" ? "Exec Condo" : "Non-Landed")
        ) {
          obj[key].listings.push(item);
          obj[key].totalLaunchedByMonth +=
            item.developerSales[0].launchedInMonth;
        }
      });
    });
    unitLaunched = Object.values(obj).map(
      (item: any) => item.totalLaunchedByMonth
    );
  } else {
    unitLaunched = Object.values(data).map(
      (item: any) => item.totalLaunchedByMonth
    );
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
      return "#6226d9";
    }

    if (selectedMonth == label) {
      return "#6226d9";
    }

    return "#8a6ac8";
  });

  const dataset = {
    labels: [...labels],
    datasets: [
      {
        label: "Units Launched",
        data: [...unitLaunched],
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
