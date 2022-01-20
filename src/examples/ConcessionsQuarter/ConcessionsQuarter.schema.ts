import { format, timeFormat } from "d3";

export default {
  id: "concessions-quarter",
  title: "Concessions",
  subtitle: "Values normalized for a ten-year term.",
  values: {
    date: {
      scale: "time",
    },
    a: {
      scale: "linear",
      domain: [0, 10], // @TODO - measure this number from max value
    },
    b: {
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
      ticks: 4,
    },
    {
      type: "left-axis",
      value: "b",
      format: (val: number) => `$${format(".2s")(val)}`,
      width: 70,
    },
    {
      type: "right-axis",
      value: "a",
      format: (val: number) => `${val} buyers`,
      width: 70,
    },
    {
      type: "vertical-bars",
      value: ["date", "a"],
      borderRadius: 4,
      barWidth: 20,
      legend: "Months of Free Rent",
    },
    {
      type: "line",
      value: ["date", "b"],
      enabledColor: "supportive400",
      legend: "Tenant Improvement Allowance",
    },
  ],
};
