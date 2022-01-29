import { format } from "d3";

export default {
  id: "left-right-axis",
  title: "Left & Right Axis",
  subtitle: "This example shows 2 x axis, bars and lines",
  values: {
    year: {
      scale: "band",
    },
    a: {
      scale: "linear",
      domain: [0, 11], // @TODO - measure this number from max value
    },
    b: {
      scale: "linear",
      domain: [0, 90], // @TODO - measure this number from max value
    },
  },
  components: [
    {
      type: "background-lines",
      value: "year",
    },
    {
      type: "bottom-axis",
      value: "year",
      height: 13,
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
      format: (val: number) => `${val}x`,
      width: 70,
    },
    {
      type: "vertical-bars",
      value: ["year", "a"],
      legend: "A values",
      borderRadius: "4 4 0 0",
      barWidth: 20,
    },
    {
      type: "line",
      value: ["year", "b"],
      legend: "B values",
      enabledColor: "supportive400",
    },
    {
      type: "dots",
      value: ["year", "b"],
      dotWidth: 15,
      enabledColor: "transparent",
      disabledColor: "transparent",
      hoveredColor: "supportive400",
      strokeHoveredColor: "supportive200",
    },
  ],
};
