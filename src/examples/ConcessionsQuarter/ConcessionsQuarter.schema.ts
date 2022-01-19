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
  xAxisGap: 50,
  components: [
    {
      type: "background-lines",
      value: "date",
    },
    {
      type: "bottom-axis",
      value: "date",
      format: timeFormat("%Y"),
      height: 13,
    },
    {
      type: "left-axis",
      value: "avgTIAllowance",
      format: (val: number) => `TI $${format(".2s")(val)} psf`,
      width: 70,
    },
    {
      type: "right-axis",
      value: "avgFreeRentMonth",
      format: (val: number) => `${val} months`,
      width: 70,
    },
    {
      type: "vertical-bars",
      value: ["date", "avgFreeRentMonth"],
      borderRadius: 4,
      barWidth: 20,
      legend: "Months of Free Rent",
    },
    {
      type: "line",
      value: ["date", "avgTIAllowance"],
      enabledColor: "supportive400",
      legend: "Tenant Improvement Allowance",
    },
  ],
};
