import { format } from "d3";

export default {
  id: "lines",
  title: "Lines",
  subtitle: "This example shows lines and a custom white color",
  values: {
    year: {
      scale: "band",
    },
    line1: {
      scale: "linear",
      domain: [20, 120],
    },
    line2: {
      scale: "linear",
      domain: [20, 120],
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
      value: "line1",
      format: (val: number) => `$${format(".2s")(val)}`,
      width: 50,
    },
    {
      type: "line",
      value: ["year", "line1"],
      legend: "Line 1 values",
      enabledColor: "primary500",
    },
    {
      type: "line",
      value: ["year", "line2"],
      legend: "Line 2 values",
      enabledColor: "uiWhite",
    },
  ],
};
