import { format } from "d3";

export default {
  id: "historical-rent",
  title: "Historical Rent",
  subtitle: "Annual values shown on graph",
  values: {
    year: {
      scale: "band",
    },
    avgRentFS: {
      scale: "linear",
      domain: [20, 120],
    },
    avgRentNNN: {
      scale: "linear",
      domain: [20, 120],
    },
  },
  xAxisGap: -20, // A hack we can do to follow a custom design
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
      value: "avgRentFS",
      format: (val: number) => `TI $${format(".2s")(val)} psf`,
      width: 80,
    },
    {
      type: "right-axis",
      value: "avgRentNNN",
      format: () => ``,
      width: -10, // Another hack we can do :)
    },
    {
      type: "line",
      value: ["year", "avgRentFS"],
      legend: "Average Rent • FS",
    },
    {
      type: "line",
      value: ["year", "avgRentNNN"],
      legend: "Average Rent • NNN",
      enabledColor: "uiWhite",
    },
  ],
};
