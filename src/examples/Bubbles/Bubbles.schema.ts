export default {
  id: "bubbles",
  title: "Bubbles",
  subtitle: "This example shows a plot of bubbles",
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
      height: 13,
    },
    {
      type: "left-axis",
      value: "lifeExp",
      width: 30,
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
    },
  ],
};
