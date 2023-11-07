import React from "react";
import Winedata from "./Wine-data.json";
// Sample dataset
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
  Gamma?: number; // Include the Gamma property
}


// Calculate the "Gamma" property and add it to the dataset
const dataset: WineData[] = Winedata.map((item) => ({
  Alcohol: +item["Alcohol"],
  MalicAcid: +item["Malic Acid"],
  Ash: +item["Ash"],
  AlcalinityOfAsh: +item["Alcalinity of ash"],
  Magnesium: +item["Magnesium"],
  TotalPhenols: +item["Total phenols"],
  Flavanoids: +item["Flavanoids"],
  NonflavanoidPhenols: +item["Nonflavanoid phenols"],
  Proanthocyanins: +item["Proanthocyanins"],
  ColorIntensity: +item["Color intensity"],
  Hue: +item["Hue"],
  OD280OD315OfDilutedWines: +item["OD280/OD315 of diluted wines"],
  Unknown: +item["Unknown"],
}));

// Calculate the "Gamma" property and add it to the dataset
dataset.forEach((entry) => {
  entry.Gamma = (+entry.Ash * +entry.Hue) / +entry.Magnesium;
});

// Now, you can map the data to the WineData interface
const wineData: WineData[] = dataset;


// Step 2: Group the data by class
const groupedData: Record<string, WineData[]> = {};
dataset.forEach((entry) => {
  const classKey = `Class ${entry.Alcohol}`;
  if (!groupedData[classKey]) {
    groupedData[classKey] = [];
  }
  groupedData[classKey].push(entry);
});

// Step 3: Calculate the mean, median, and mode of Gamma for each class
const calculateStats = (data: WineData[]) => {
  // Extract Gamma values
  const gammaValues = data.map((entry) => entry.Gamma);

  // Filter out undefined and non-number values
  const filteredGammaValues = gammaValues.filter(
    (value): value is number => typeof value === "number"
  );

  if (filteredGammaValues.length > 0) {
    // Calculate mean for filtered values
    const mean =
      filteredGammaValues.reduce((acc, val) => acc + val, 0) /
      filteredGammaValues.length;
    // Calculate median for filtered values
    const median = calculateMedian(filteredGammaValues);
    // Calculate mode for filtered values
    const mode = calculateMode(filteredGammaValues);

    return { mean, median, mode };
  } else {
    // Handle the case when there are no valid Gamma values
    return { mean: 0, median: 0, mode: [] };
  }
};




const calculateMedian = (values: number[]) => {
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  if (values.length % 2 === 0) {
    return ((values[mid - 1] + values[mid]) / 2).toFixed(3);
  } else {
    return values[mid].toFixed(3);
  }
};

const calculateMode = (values: number[]) => {
  const modeMap: Record<number, number> = values.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>); // Explicitly specify the type

  const maxCount = Math.max(...Object.values(modeMap));
  const modeValues = Object.entries(modeMap)
    .filter(([value, count]) => count === maxCount)
    .map(([value]) => parseFloat(value))
    .sort((a, b) => a - b);

  return modeValues.map((value) => value.toFixed(3));
};

const stats = calculateStats(dataset);

// Display the calculated statistics
console.log("Gamma Mean:", stats.mean.toFixed(3));
console.log("Gamma Median:", stats.median);
console.log("Gamma Mode:", stats.mode.join(", "));

// Step 4: Display results in a React component
const GammaTable: React.FC = () => {
  const classes = Object.keys(groupedData);

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((classKey) => (
            <th key={classKey}>{classKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gamma</td>
          {classes.map((classKey) => {
            const stats = calculateStats(groupedData[classKey]);
            return (
              <td key={classKey}>
                Mean: {stats.mean.toFixed(3)}
                <br />
                Median:{" "}
                {typeof stats.median === "number"
                  ? stats.median.toFixed(3)
                  : stats.median}
                <br />
                Mode:{" "}
                {stats.mode
                  .filter((value) => typeof value === "number")
                  .map((value) => {
                    if (typeof value === "number" ) {
                      return value
                    } else {
                      return value;
                    }
                  })
                  .join(", ")}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default GammaTable;
