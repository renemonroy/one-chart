<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->
<div align="center">

# [📈 1Chart](https://renemonroy.github.io/one-chart)

**A single chart component to rule them all?!**

[Description](#-description) •
[Motivation](#-motivation) •
[Example](#-example) •
[Run Locally](#%EF%B8%8F-run-locally) •
[Stack](#-stack) •
[Goals](#-goals)

</div>

![Storybook Screenshot 1](https://user-images.githubusercontent.com/106011/150472991-bf51d6eb-dbf5-4676-abb2-74fe8259ffac.png)
![Storybook Screenshot 2](https://user-images.githubusercontent.com/106011/150472993-4fbc291d-0ce5-4229-aab1-bb570fc3e77b.png)
![Storybook Screenshot 3](https://user-images.githubusercontent.com/106011/150472994-4efaa353-e175-4d58-8899-79f7000335b6.png)

## 📖 Description

For developers who want to build a group of powerful D3 charts faster, 1Chart is
a Proof of Concept project that explores the possibility to simplify the
building of charts while following a consitent and simple pattern.

Unlike D3 alone, where you need to spend time dealing with its sometimes complex
syntax and organization, this PoC focuses on building powerful charts through
the use of schemas.

## 💡 Motivation

There are plenty of use cases for charts and D3 has been the go-to for many
years, but somehow it still misses that dev experience that we'd like for quick
usage. Moreover, D3 is a so convenient tool that it lets you do a lot of
other hidden things too. But that advantage left no easy control over user
interfaces dedicated to pure graphs.

The idea behind this PoC is to ease the creation of charts following a single
pattern while giving the consistency required to have multiple yet different
graphs. 1Chart is basically a mix between a D3 wrapper and an UI Library that is
focused only on charts.

## 👀 Example

Let's say you have the next data:

```json
[
  {
    "year": 2012,
    "value": 557948
  },
  {
    "year": 2013,
    "value": 127633
  },
  {
    "year": 2014,
    "value": 835987
  },
  {
    "year": 2015,
    "value": 958813
  },
  {
    "year": 2016,
    "value": 1325000
  },
  {
    "year": 2017,
    "value": 653300
  },
  {
    "year": 2018,
    "value": 228088
  },
  {
    "year": 2019,
    "value": 1020893
  },
  {
    "year": 2020,
    "value": 335443
  },
  {
    "year": 2021,
    "value": 653300
  }
]
```

We can tell 1Chart to build a "Vertical Bars" chart with this simple schema:

```js
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
```

Those `values` come from your data naming so you're telling 1Chart to generate
scales for them.

All we need to do then is to pass both data and schema to the component:

```jsx
import React from "react";
import schema from "../../examples/DevelopmentTimeline/DevelopmentTimeline.schema.ts";
import data from "../../examples/DevelopmentTimeline/DevelopmentTimeline.mockup.json";
import Chart from "./Chart";

// Note: the ChartsProvider is required to get the default Theme but wasn't added
// here for simplicity.
function DevelopmentTimeline() {
  return <Chart data={data} isLoading={false} schema={schema} />;
}
```

The code above will render a chart similar to this:

![Storybook Screenshot 3](https://user-images.githubusercontent.com/106011/150472985-e5bf60ff-291d-44ca-8586-f5cbed2d339a.png)

## ⚙️ Run Locally

To run the project locally you need to install the dependencies first. 1Chart
does not require Yarn but the lock file is shared. To install dependencies with
Yarn just run:

```sh
yarn install
```

Since 1Chart uses Storybook as dev server, execute the following script to run
it locally:

```sh
yarn dev
```

## 🥞 Stack

- Typescript
- React
- React Content Loader
- D3
- Styled Components
- Styled System
- Storybook

## 🎯 Goals

- Consistency
- Performance
- Maintainability
- Productive
- Data Agnostic
- Responsiveness
- Themed
- Isolated
- Autonomous
