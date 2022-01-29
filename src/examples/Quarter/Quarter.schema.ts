import { format, timeFormat } from "d3";

export default {
  id: "quarter",
  title: "Quarter",
  subtitle: "This example shows how to use scale time for quarters",
  values: {
    date: {
      scale: "time",
    },
    barVal: {
      scale: "linear",
      domain: [0, 10], // @TODO - measure this number from max value
    },
    lineVal: {
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
      value: "lineVal",
      format: (val: number) => `$${format(".2s")(val)}`,
      width: 70,
    },
    {
      type: "right-axis",
      value: "barVal",
      format: (val: number) => `${val} buyers`,
      width: 70,
    },
    {
      type: "vertical-bars",
      value: ["date", "barVal"],
      borderRadius: 4,
      barWidth: 20,
      legend: "Bar values",
    },
    {
      type: "line",
      value: ["date", "lineVal"],
      enabledColor: "supportive400",
      legend: "Line values",
    },
    {
      type: "dots",
      value: ["date", "lineVal"],
      dotWidth: 15,
      enabledColor: "supportive400",
      hoveredColor: "supportive300",
      disabledColor: "supportive500",
    },
  ],
};
