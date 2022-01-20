import { format } from "d3";

export default {
  id: "min-max-range",
  title: "Min Max Range",
  subtitle: "This examples shows how to custom add grapsh based on range",
  values: {
    year: {
      scale: "band",
      gap: 0.2,
    },
    profit: {
      scale: "linear",
      domain: [-2500000, 2500000],
    },
    loss: {
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
      value: "profit",
      format: (val: number) => `$${format(".2s")(val)}`,
      ticks: [-2500000, 0, 2500000], // Custom values here
      width: 60,
    },
    {
      type: "vertical-bars",
      value: ["year", "profit"],
      legend: "Profit",
      borderRadius: "5 5 0 0",
    },
    {
      type: "vertical-bars",
      value: ["year", "loss"],
      legend: "Loss",
      borderRadius: "0 0 5 5",
      enabledColor: "supportive600",
      hoveredColor: "supportive500",
      disabledColor: "supportive700",
      strokeColor: "supportive600", // this because using Thanos theme for examples
    },
  ],
};
