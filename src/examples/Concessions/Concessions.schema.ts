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
      format: (val: number) => `TI $${format(".2s")(val)} psf`,
      shape: "left-axis",
      value: "tenantImprovement",
      width: 70,
    },
    {
      format: (val: number) => `${val} months`,
      shape: "right-axis",
      value: "monthsOfFreeRent",
      width: 70,
    },
    {
      borderRadius: 4,
      legend: "Months of Free Rent",
      shape: "vertical-bars",
      value: ["year", "monthsOfFreeRent"],
    },
    {
      enabledColor: "supportive500",
      legend: "Tenant Improvement Allowance",
      shape: "line",
      value: ["year", "tenantImprovement"],
    },
  ],
};
