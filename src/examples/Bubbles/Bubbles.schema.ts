import { format } from "d3";

export default {
  id: "bubbles",
  title: "Bubbles",
  subtitle:
    "Relationship between life expectancy, GDP (PPP) and population for multiple countries",
  values: {
    lifeExp: {
      scale: "linear",
      domain: [30, 90],
    },
    gdpPerCap: {
      scale: "linear",
      domain: [0, 15000],
      orientation: "horizontal",
    },
    pop: {
      scale: "linear",
      domain: [200000, 1310000000],
      range: [2, 40],
      orientation: "horizontal",
    },
  },
  components: [
    {
      type: "bottom-axis",
      value: "gdpPerCap",
      format: (val: number) => `$${format(".1s")(val)}`,
      height: 13,
    },
    {
      type: "left-axis",
      value: "lifeExp",
      format: (val: number) => `${val} years`,
      width: 50,
    },
    {
      type: "right-axis",
      value: "lifeExp",
      format: () => ``,
      width: 30,
    },
    {
      type: "bubbles",
      value: ["gdpPerCap", "lifeExp", "pop"],
      strokeEnabledOpacity: 1,
      strokeEnabledColor: "primary600",
      strokeWidth: 1,
      legend: "Population",
    },
  ],
};
