import { format } from "d3";

export default {
  id: "development-timeline",
  title: "Development Timeline",
  subtitle: "Square feet being built over time",
  values: {
    x: {
      scale: "band",
    },
    y: {
      scale: "linear",
      domain: [0, 1400000],
    },
  },
  components: [
    {
      type: "background-lines",
      value: "x",
    },
    {
      type: "bottom-axis",
      value: "x",
      height: 13,
    },
    {
      type: "left-axis",
      value: "y",
      format: (val: number) => `$${format(".2s")(val)} sf`,
      width: 50,
    },
    {
      type: "vertical-bars",
      value: ["x", "y"],
      borderRadius: "4 4 0 0",
      barWidth: 20,
    },
  ],
};
