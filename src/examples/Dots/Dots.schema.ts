import { format } from "d3";

export default {
  id: "dots",
  title: "Dots",
  subtitle: "This example shows a plot of simple dots",
  values: {
    year: {
      scale: "band",
    },
    dotVal: {
      scale: "linear",
      domain: [20, 150],
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
      value: "dotVal",
      format: (val: number) => `$${format(".2s")(val)}`,
      width: 50,
    },
    {
      type: "dots",
      value: ["year", "dotVal"],
      dotWidth: 20,
      strokeHoveredColor: "primary600",
    },
  ],
};
