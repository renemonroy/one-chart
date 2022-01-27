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

<br>

## 🖋 Description

For developers who want to build a group of powerful D3 charts faster, 1Chart is
a Proof of Concept project that explores the possibility to simplify the
creation of charts while following a consitent and simple pattern.

Unlike D3 alone, where you need to spend time dealing with its sometimes complex
syntax and organization, this PoC focuses on building powerful charts through
the use of schemas.

<br>

## 💡 Motivation

There are plenty of use cases for charts and D3 has been the go-to for many
years. But somehow it still misses that development experience that we would
like to create a great set of graphics. Moreover, D3 is a so convenient tool
that it lets you do a lot of other things as well and that advantage sometimes
left no easy control over UIs dedicated to pure graphs.

The idea behind this PoC is to ease the creation of charts following a single
pattern while giving the consistency required to have multiple yet different
graphs. 1Chart is basically a mix between a D3 wrapper and an UI Library that is
focused only on charts.

<br>

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

<br>

## 📖 Documentation

This project is composed by 3 major exports:

- [`<Chart>`](https://github.com/renemonroy/one-chart#chart) - A component that
  renders a D3 chart by following schemas.
- [`<ChartsProvider>`](https://github.com/renemonroy/one-chart#chartsprovider) -
  A component that provides a set of global variables to
  all children charts.
- `useChart` - An optional hook that could be used to build other custom charts.

<br>

### `<Chart>`

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>data</code></td>
      <td><code>TData</code></td>
      <td>The data that will be handled by the prop <code>schema</code>.</td>
    </tr>
    <tr>
      <td><code>schema</code></td>
      <td><code>ISchema</code></td>
      <td>A configuration for each chart. See schema for a comple list of
      available options.</td>
    </tr>
    <tr>
      <td><code>isLoading?</code></td>
      <td><code>boolean</code></td>
      <td>Show a placeholder loader instead of the chart. Default: <code>false</code>,</td>
    </tr>
    <tr>
      <td><code>inCard?</code></td>
      <td><code>boolean</code></td>
      <td>Shows chart inside a card or alone. Default <code>true</code>.</td>
    </tr>
  </tbody>
</table>

The chart `schema` is created as follows:

```js
// @property {Object} schema - The schema configuration
export const schema = {
  // @property {string} schema.id - A html id used to insert the svg components
  id: "you-schema-id",
  // @property {string=} schema.title - Optional title, displayed above the chart
  title: "Schema Title",
  // @property {string=} schema.subtitle - Optional subtitle, displayed below title
  subtitle: "Schema Subtitle",
  // @property {Object} schema.values - Specify data values and how should be treated
  values: {
    // @property {Object} schema.values[keyname] - Values that will be searched in data
    example1: {
      // @property {string} schema.values[keyname].scale - Type of scale to be used for data
      scale: "band",
      // @property {string=} schema.values[keyname].gap - Optional gap between values
      gap: 0.2,
    },
    example2: {
      scale: "linear",
      // @property {[number, number]=} schema.values[keyname].domain - Range of min/max values to scale
      domain: [0, 1000],
    },
  },
  // @property {Array} schema.components - Elements that will be rendered at the svg Chart
  components: [
    {
      // @property {string} schema.components[0].type - Name of the component to use
      type: "background-lines",
      // @property {string} schema.components[0].value - Name of value specified from "values" above
      value: "example1",
    },
    {
      type: "bottom-axis",
      value: "example1",
      // @property {string} schema.components[1].height - Optional height of element
      height: 13,
    },
    {
      type: "line",
      // @property {string} schema.components[2].value - This component expects 2 type of values
      value: ["example1", "example2"],
      // @property {string} schema.components[2].legend - Used to render legends at card header
      legend: "Line legend",
      // @property {string} schema.components[2].enabledColor - Custom color taken from a theme provided
      enabledColor: "primary500",
    },
  ],
};
```

> All `components` are rendered in the Array order, acting like layers.

<br>

### `<ChartsProvider>`

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>children</code></td>
      <td><code>React.ReactNode</code></td>
      <td>It can be basically a ReactElement, a ReactFragment, a string,
      a number or an array of ReactNodes, or null, or undefined, or a boolean.</td>
    </tr>
    <tr>
      <td><code>components?</code></td>
      <td><code>IComponents</code></td>
      <td>Optional methods which extend the chart elements that are currently supported.</td>
    </tr>
    <tr>
      <td><code>scales?</code></td>
      <td><code>IScales</code></td>
      <td>Optional methods which extend the scales types that are currently supported.</td>
    </tr>
    <tr>
      <td><code>theme?</code></td>
      <td><code>ITheme</code></td>
      <td>Optional variables that extend the theme that is currently set.</td>
    </tr>
  </tbody>
</table>

<br>

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

<br>

## 🥞 Stack

- Typescript
- React
- React Content Loader
- D3
- Styled Components
- Styled System
- Storybook

<br>

## 🎯 Focused On

- Consistency
- Productivity
- Flexibility
- Maintainability
- Performance
- Data Agnostic
- Responsiveness
- Themeable
