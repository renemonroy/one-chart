import { format } from "d3";

export default {
  id: "absortion",
  title: "Absortion",
  subtitle: "Change in occupancy over time",
  values: {
    year: {
      scale: "band",
      gap: 0.2,
    },
    occupancy: {
      scale: "linear",
      domain: [-2500000, 2500000],
    },
    vacancy: {
      scale: "linear",
      domain: [-2500000, 2500000],
    },
  },
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
      format: (val: number) => `$${format(".2s")(val)} sf`,
      shape: "left-axis",
      value: "occupancy",
      width: 60,
      ticks: [-2500000, 0, 2500000], // Custom values here
    },
    {
      borderRadius: "5 5 0 0",
      enabledColor: "supportive500",
      hoveredColor: "supportive500",
      disabledColor: "supportive700",
      strokeColor: "supportive500", // this because using Thanos theme for examples
      legend: "Occupancy",
      shape: "vertical-bars",
      value: ["year", "occupancy"],
    },
    {
      borderRadius: "0 0 5 5",
      enabledColor: "secondary500",
      hoveredColor: "secondary500",
      disabledColor: "secondary700",
      strokeColor: "secondary500", // this because using Thanos theme for examples
      legend: "Vacancy",
      shape: "vertical-bars",
      value: ["year", "vacancy"],
    },
  ],
};
