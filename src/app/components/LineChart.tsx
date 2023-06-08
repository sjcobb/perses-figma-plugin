//import * as echarts from 'echarts/core';
import type { EChartsOption } from "echarts";
import { LineChart as EChartsLineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
//import { useEffect, useMemo, useState, useLayoutEffect, useRef } from 'react';
import { use } from "echarts/core";
import * as React from "react";

import { ChartsWrapper } from "./ChartWrapper";

use([EChartsLineChart, GridComponent, SVGRenderer]);

export interface LineChartProps {
  width: number;
  height: number;
  seriesData: EChartsOption["series"];
}

const LineChart = (props: LineChartProps) => {
  const { width, height, seriesData } = props;

  const options: EChartsOption = {
    width: width,
    height: height,
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
  return (
    <ChartsWrapper width={width + 20} height={height + 20} option={options} />
  );
};

export default LineChart;
