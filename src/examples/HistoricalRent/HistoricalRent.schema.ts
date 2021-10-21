import { format } from "d3";

export default ({ currencySymbol = "$" }) => ({
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
  graphsXGap: -20, // A hack we can do to follow the design
  graphs: [
    {
      shape: "background-lines",
      value: "year",
    },
    {
      height: 13,
      shape: "bottom-axis",
      value: "year",
    },
    {
      format: (val: number) => `TI ${currencySymbol}${format(".2s")(val)} psf`,
      shape: "left-axis",
      value: "avgRentFS",
      width: 80,
    },
    {
      format: () => ``,
      shape: "right-axis",
      value: "avgRentNNN",
      width: -10, // Another hack we can do :)
    },
    {
      legend: "Average Rent • FS",
      shape: "line",
      value: ["year", "avgRentFS"],
    },
    {
      enabledColor: "uiWhite",
      legend: "Average Rent • NNN",
      shape: "line",
      value: ["year", "avgRentNNN"],
    },
  ],
});
