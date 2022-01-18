import { format, timeFormat } from "d3";

export default {
  id: "concessions-quarter",
  title: "Concessions",
  subtitle: "Values normalized for a ten-year term.",
  values: {
    date: {
      scale: "time",
    },
    avgFreeRentMonth: {
      scale: "linear",
      domain: [0, 10], // @TODO - measure this number from max value
    },
    avgTIAllowance: {
      scale: "linear",
      domain: [0, 330], // @TODO - measure this number from max value
    },
  },
  xAxisGap: 30,
  graphs: [
    {
      shape: "background-lines",
      value: "date",
    },
    {
      format: timeFormat("%Y"),
      height: 13,
      shape: "bottom-axis",
      value: "date",
    },
    {
      format: (val: number) => `TI $${format(".2s")(val)} psf`,
      shape: "left-axis",
      value: "avgTIAllowance",
      width: 70,
    },
    {
      format: (val: number) => `${val} months`,
      shape: "right-axis",
      value: "avgFreeRentMonth",
      width: 70,
    },
    {
      borderRadius: 4,
      gap: 5,
      legend: "Months of Free Rent",
      shape: "vertical-bars",
      value: ["date", "avgFreeRentMonth"],
    },
    {
      enabledColor: "supportive500",
      legend: "Tenant Improvement Allowance",
      shape: "line",
      value: ["date", "avgTIAllowance"],
    },
  ],
};
