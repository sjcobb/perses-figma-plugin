import { EChartsOption } from "echarts";

declare function require(path: string): any;
const Series = require("time-series-data-generator");

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomData = (
  type: "line",
  numberOfSeries: number,
  numberOfPoints: number,
  min: number,
  max: number
) => {
  const series: EChartsOption["series"] = [];
  for (let i = 0; i < numberOfSeries; i++) {
    const data = [];
    for (let j = 0; j < numberOfPoints; j++) {
      const num = getRandomNumber(min, max);
      data.push(num);
    }
    series.push({ type: type, data: data });
  }
  return series;
};

export const getFakeSeries = (dataPoints: number) => {
  const interval = 10 * 60; // seconds
  const keyName = "data";

  // const series = new Series();
  const series = new Series({
    type: "random",
    numOfData: dataPoints,
    interval,
    keyName,
  });
  console.log("fake series", series.gaussian());
};
