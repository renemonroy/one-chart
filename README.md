# 1Chart

One chart to rule them all?

## Overview

### Description

For developers who want to build powerful D3 charts easier and faster, 1Chart is a Proof of Concept project that explores the possibility to simplify building multiple charts in a consitent way. Unlike D3 alone, where you need to spend time figuring multiple ways to render a single solution and learning its syntax, this PoC focuses on designing charts following a single pattern, through the use of JS or JSON schemas.

## Motivation

There are plenty of use cases for charts: dashboards, analytics and stats, to say some. D3 has been the go-to for many years, but somehow it still misses that dev experience that we'd like for quick usage. More than that, it is a convenient tool that lets you do a lot of things. But that advantage left no easy control over user interfaces dedicated to graphs. The idea behind 1Chart is to ease the creation of charts following a single pattern while giving the consistency required to have multiple and different graphs. 1Chart is basically a mix between a D3 wrapper and an UI Library that is focused only on charts.

## Getting Started

### Installation

1Chart does not require Yarn but the lock file is shared. To install with Yarn just run:

```sh
yarn install
```

### Development

1Chart uses Storybook as dev server. After the installation execute the following script to run Storybook locally:

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

Knowing the data from above we can tell 1Chart to build a graph with this simple schema:

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
      value: "total",
      width: 50,
    },
    {
      borderRadius: 4,
      shape: "vertical-bars",
      value: ["year", "total"],
    },
  ],
```

After that, all we need to do is to pass both data and schema to the component:

```jsx
import React from "react";
import schema from "../../examples/DevelopmentTimeline/DevelopmentTimeline.schema.ts";
import data from "../../examples/DevelopmentTimeline/DevelopmentTimeline.mockup.json";
import Chart from "./Chart";

// Note: All graphs require the UIProvider to get the default Theme but wasn't added
// here for simplicity.
function DevelopmentTimeline() {
  return <Chart data={data} isLoading={false} schema={schema} />;
}
```

## Features

### Stack

- Typescript
- React
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
