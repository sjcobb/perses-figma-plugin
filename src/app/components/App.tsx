import { EChartsOption } from "echarts";
import * as React from "react";
import { useState } from "react";
import "../styles/ui.css";
// import { ChartsWrapper } from './ChartWrapper';
import LineChart from "./LineChart";
import { getFakeSeries, getRandomData } from "./util";

declare function require(path: string): any;

const App = ({}) => {
  const [chartWidth, setChartWidth] = useState<number>(300);
  const [chartHeight, setChartHeight] = useState<number>(200);
  const [minData, setMinData] = useState<number>(0);
  const [maxData, setMaxData] = useState<number>(10);
  const [seriesCount, setSeriesCount] = useState<number>(3);
  const [dataPoints, setDataPoints] = useState<number>(10);
  const [seriesData, setSeriesData] = useState<EChartsOption["series"]>([
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ]);

  getFakeSeries(dataPoints);

  const setDimension =
    (name: "width" | "height") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.currentTarget.value, 10);
      switch (name) {
        case "height":
          setChartHeight(value);
          break;
        default:
          setChartWidth(value);
      }
    };

  const handleDataChange =
    (name: "min" | "max" | "points" | "series") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.currentTarget.value, 10);
      switch (name) {
        case "max":
          setMaxData(value);
          break;
        case "min":
          setMinData(value);
          break;
        case "points":
          setDataPoints(value);
          break;
        default:
          setSeriesCount(value);
          break;
      }
    };

  const handleInsert = () => {
    const wrapper = document.getElementById("chart-wrapper");
    const svg = wrapper.getElementsByTagName("svg");
    const svgString = svg[0].outerHTML;
    parent.postMessage(
      { pluginMessage: { type: "insert-svg", svg: svgString } },
      "*"
    );
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }

      if (type === "has-selection") {
        setChartHeight(message.height);
        setChartWidth(message.width);
      }
    };
  }, []);

  React.useEffect(() => {
    const seriesInfo = getRandomData(
      "line",
      seriesCount,
      dataPoints,
      minData,
      maxData
    );
    setSeriesData(seriesInfo);
    console.log("seriesInfo", seriesInfo);
  }, [minData, maxData, seriesCount, dataPoints]);

  return (
    <div className="layout">
      <aside>
        <label htmlFor="width">width</label>
        <input
          id="width"
          type="text"
          onChange={setDimension("width")}
          value={chartWidth}
        />
        <label htmlFor="width">width</label>
        <input
          id="height"
          type="text"
          onChange={setDimension("height")}
          value={chartHeight}
        />
        <label htmlFor="min">min</label>
        <input
          id="min"
          type="text"
          onChange={handleDataChange("min")}
          value={minData}
        />
        <label htmlFor="max">max</label>
        <input
          id="min"
          type="text"
          onChange={handleDataChange("max")}
          value={maxData}
        />
        <label htmlFor="series">Series</label>
        <input
          id="min"
          type="text"
          onChange={handleDataChange("series")}
          value={seriesCount}
        />
        <label htmlFor="series">points</label>
        <input
          id="min"
          type="text"
          onChange={handleDataChange("points")}
          value={dataPoints}
        />
        <button onClick={handleInsert}>insert</button>
      </aside>

      <div id="chart-wrapper">
        <LineChart
          width={chartWidth}
          height={chartHeight}
          seriesData={seriesData}
        />
      </div>
    </div>
  );
};

export default App;
