import React from "react";
import Winedata from "./Wine-data.json";

// Define the WineData interface
interface WineData {
  Alcohol: number | string;
  MalicAcid: number | string;
  Ash: number | string;
  AlcalinityOfAsh: number | string;
  Magnesium: number | string;
  TotalPhenols: number | string;
  Flavanoids: number | string;
  NonflavanoidPhenols: number | string;
  Proanthocyanins: number | string;
  ColorIntensity: number | string;
  Hue: number | string;
  OD280OD315OfDilutedWines: number | string;
  Unknown: number | string;
}

// Sample dataset
const dataset: WineData[] = Winedata.map((item) => ({
  Alcohol: item["Alcohol"],
  MalicAcid: item["Malic Acid"],
  Ash: item["Ash"],
  AlcalinityOfAsh: item["Alcalinity of ash"],
  Magnesium: item["Magnesium"],
  TotalPhenols: item["Total phenols"],
  Flavanoids: item["Flavanoids"],
  NonflavanoidPhenols: item["Nonflavanoid phenols"],
  Proanthocyanins: item["Proanthocyanins"],
  ColorIntensity: item["Color intensity"],
  Hue: item["Hue"],
  OD280OD315OfDilutedWines: item["OD280/OD315 of diluted wines"],
  Unknown: item["Unknown"],
}));

// Calculate mean, median, and mode for "Flavanoids" for each class
const calculateStats = (data: WineData[]) => {
  const stats: Record<
    string,
    { mean: number; median: number; mode: number[] }
  > = {};

  data.forEach((entry) => {
    const classKey = `Class ${entry.Alcohol}`;

    // Ensure Flavanoids is treated as a number
    const flavanoidsValue =
      typeof entry.Flavanoids === "string"
        ? parseFloat(entry.Flavanoids)
        : (entry.Flavanoids as number);

    if (!stats[classKey]) {
      stats[classKey] = {
        mean: 0,
        median: 0,
        mode: [],
      };
    }

    // Add Flavanoids as a number
    stats[classKey].mean += Number(flavanoidsValue);
    stats[classKey].mode.push(flavanoidsValue);
  });

  for (const classKey in stats) {
    const values = stats[classKey].mode;

    stats[classKey].mean = stats[classKey].mean / values.length;

    values.sort((a, b) => a - b);
    stats[classKey].median =
      values.length % 2 === 0
        ? (values[values.length / 2 - 1] + values[values.length / 2]) / 2
        : values[Math.floor(values.length / 2)];

 const mode: Record<number, number> = values.reduce((acc, val) => {
   acc[val] = (acc[val] || 0) + 1;
   return acc;
 }, {} as Record<number, number>);

    const modeValues = Object.entries(mode)
      .filter(([value, count]) => count === Math.max(...Object.values(mode)))
      .map(([value]) => parseFloat(value));

    stats[classKey].mode = modeValues;
  }

  return stats;
};

const FlavanoidsStatsComponent: React.FC = () => {
  const stats = calculateStats(dataset);

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {Object.keys(stats).map((classKey) => (
            <th key={classKey}>{classKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {Object.keys(stats).map((classKey) => (
            <td key={classKey}>{stats[classKey].mean.toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {Object.keys(stats).map((classKey) => (
            <td key={classKey}>{stats[classKey].median.toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {Object.keys(stats).map((classKey) => (
            <td key={classKey}>{stats[classKey].mode.join(", ")}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsStatsComponent;
