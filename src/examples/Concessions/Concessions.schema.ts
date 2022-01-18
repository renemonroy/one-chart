import { format } from "d3";

export default {
  id: "concessions",
  title: "Concessions",
  subtitle: "Values normalized for a ten-year term",
  values: {
    year: {
      scale: "band",
    },
    monthsOfFreeRent: {
      scale: "linear",
      domain: [0, 11], // @TODO - measure this number from max value
    },
    tenantImprovement: {
      scale: "linear",
      domain: [0, 90], // @TODO - measure this number from max value
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
      value: "tenantImprovement",
      format: (val: number) => `TI $${format(".2s")(val)} psf`,
      width: 70,
    },
    {
      type: "right-axis",
      value: "monthsOfFreeRent",
      format: (val: number) => `${val} months`,
      width: 70,
    },
    {
      type: "vertical-bars",
      value: ["year", "monthsOfFreeRent"],
      legend: "Months of Free Rent",
      borderRadius: 4,
    },
    {
      type: "line",
      value: ["year", "tenantImprovement"],
      legend: "Tenant Improvement Allowance",
      enabledColor: "supportive500",
    },
  ],
};
