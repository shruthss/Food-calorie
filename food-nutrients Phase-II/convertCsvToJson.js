const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

// Define the correct path to Phase-I where CSV files exist
const phaseOnePath = path.join(__dirname, "../calories-burned Phase-I");

// File paths
const caloriesCsvPath = path.join(phaseOnePath, "calories.csv");
const exerciseCsvPath = path.join(phaseOnePath, "exercise.csv");

// Log file paths to verify
console.log("Looking for:", caloriesCsvPath);
console.log("Looking for:", exerciseCsvPath);

// Function to convert CSV to JSON
const convertCsvToJson = async (csvFilePath, jsonFilePath) => {
  try {
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`File not found: ${csvFilePath}`);
    }

    const jsonArray = await csv().fromFile(csvFilePath);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2));
    console.log(`✅ Conversion successful! JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error("❌ Error converting CSV to JSON:", error);
  }
};

// Convert CSV files to JSON
convertCsvToJson(caloriesCsvPath, path.join(__dirname, "calories.json"));
convertCsvToJson(exerciseCsvPath, path.join(__dirname, "exercise.json"));
