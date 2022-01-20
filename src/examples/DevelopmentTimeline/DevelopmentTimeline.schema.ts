import { format } from "d3";

export default {
  id: "vertical-bars",
  title: "Vertical Bars",
  subtitle: "This example only shows vertical bars",
  values: {
    year: {
      scale: "band",
    },
    value: {
      scale: "linear",
      domain: [0, 1400000],
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
      value: "value",
      format: (val: number) => `$${format(".2s")(val)}`,
      width: 50,
    },
    {
      type: "vertical-bars",
      value: ["year", "value"],
      borderRadius: "4 4 0 0",
      barWidth: 20,
    },
  ],
};
