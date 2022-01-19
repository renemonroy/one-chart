# [📈 1Chart](https://renemonroy.github.io/one-chart)

> A single chart component to rule them all?!

![Storybook Screenshot 1](https://user-images.githubusercontent.com/106011/139783618-84663fc6-c601-4ae8-95c5-4d82b9c5a439.png)
![Storybook Screenshot 2](https://user-images.githubusercontent.com/106011/139783624-fa1bf3b7-bf3e-441f-bd8f-dcd56a5c9420.png)
![Storybook Screenshot 3](https://user-images.githubusercontent.com/106011/139783633-c752b9eb-d379-4bb5-adb4-3266c9a0b974.png)

## Overview

### Description

For those who want to build easier and faster yet powerful D3 charts, 1Chart is a Proof of Concept project that explores the possibility to simplify building charts following a consitent pattern. Unlike D3 alone, where you need to spend time learning its sometimes very complex syntax, this PoC focuses on building powerful charts through the use of schemas.

### Motivation

There are plenty of use cases for charts and D3 has been the go-to for many years, but somehow it still misses that dev experience that we'd like for quick usage. More than that, it is a so convenient tool that lets you do a lot of other hidden things too. But that advantage left no easy control over user interfaces dedicated to graphs. The idea behind this PoC is to ease the creation of charts following a single pattern while giving the consistency required to have multiple yet different graphs. 1Chart is basically a mix between a D3 wrapper and an UI Library that is focused only on charts.

## Getting Started

### Development

To run the project locally you need to install the dependencies first. 1Chart does not require Yarn but the lock file is shared. To install dependencies with Yarn just run:

```sh
yarn install
```

Since 1Chart uses Storybook as dev server, execute the following script to run it locally:

```sh
yarn dev
```

### Example

Let's say you have the next data:

```json
[
  {
    "year": 2021,
    "total": 557948
  },
  {
    "year": 2022,
    "total": 127633
  },
  {
    "year": 2023,
    "total": 835987
  },
  {
    "year": 2024,
    "total": 0
  },
  {
    "year": 2025,
    "total": 1325000
  },
  {
    "year": 2026,
    "total": 653300
  }
]
```

We can tell 1Chart to build a "Vertical Bars" chart with this simple schema:

```js
import { format } from "d3";

export default {
  id: "development-timeline",
  title: "Development Timeline",
  subtitle: "Square feet being built over time",
  values: {
    year: {
      scale: "band",
    },
    total: {
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
      value: "total",
      format: (val: number) => `$${format(".2s")(val)} sf`,
      width: 50,
    },
    {
      type: "vertical-bars",
      value: ["year", "total"],
      borderRadius: 4,
    },
  ],
```

All we need to do then is to pass both data and schema to the component:

```jsx
import React from "react";
import schema from "../../examples/DevelopmentTimeline/DevelopmentTimeline.schema.ts";
import data from "../../examples/DevelopmentTimeline/DevelopmentTimeline.mockup.json";
import Chart from "./Chart";

// Note: the UIProvider is required to get the default Theme but wasn't added
// here for simplicity.
function DevelopmentTimeline() {
  return <Chart data={data} isLoading={false} schema={schema} />;
}
```

The code above will render a chart similar to this:

![Storybook Screenshot 3](https://user-images.githubusercontent.com/106011/139783597-b514d69c-868b-492a-be2d-2cc63f9bf01e.png)

## Features

### Stack

- Typescript
- React
- React Content Loader
- D3
- Styled Components
- Styled System
- Storybook

### Goals

- Consistency
- Performance
- Maintainability
- Productive
- Data Agnostic
- Responsiveness
- Themed
- Isolated
- Autonomous
