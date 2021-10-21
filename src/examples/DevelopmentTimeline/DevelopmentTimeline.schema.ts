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
  graphs: [
    {
      shape: "background-lines",
      value: "x",
    },
    {
      height: 13,
      shape: "bottom-axis",
      value: "x",
    },
    {
      format: (val: number) => `$${format(".2s")(val)} sf`,
      shape: "left-axis",
      value: "y",
      width: 50,
    },
    {
      borderRadius: 4,
      shape: "vertical-bars",
      value: ["x", "y"],
    },
  ],
};
