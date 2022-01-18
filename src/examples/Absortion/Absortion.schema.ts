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
      value: "occupancy",
      format: (val: number) => `$${format(".2s")(val)} sf`,
      ticks: [-2500000, 0, 2500000], // Custom values here
      width: 60,
    },
    {
      type: "vertical-bars",
      value: ["year", "occupancy"],
      legend: "Occupancy",
      borderRadius: "5 5 0 0",
      enabledColor: "supportive500",
      hoveredColor: "supportive500",
      disabledColor: "supportive700",
      strokeColor: "supportive500", // this because using Thanos theme for examples
    },
    {
      type: "vertical-bars",
      value: ["year", "vacancy"],
      legend: "Vacancy",
      borderRadius: "0 0 5 5",
      enabledColor: "secondary500",
      hoveredColor: "secondary500",
      disabledColor: "secondary700",
      strokeColor: "secondary500", // this because using Thanos theme for examples
    },
  ],
};
