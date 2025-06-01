const foodName = "apple";
const appId = "your-app-id";
const appKey = "your-app-key";

const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${foodName}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const calories = data.calories;
    const protein = data.totalNutrients.PROCNT.quantity;
    const fat = data.totalNutrients.FAT.quantity;
    const carbs = data.totalNutrients.CHOCDF.quantity;

    console.log(`Calories: ${calories}`);
    console.log(`Protein: ${protein}`);
    console.log(`Fat: ${fat}`);
    console.log(`Carbs: ${carbs}`);
	// Load the dataset
const dataset = loadDataset();

// Preprocess the data
const cleanedData = cleanData(dataset);
const scaledData = scaleData(cleanedData);
const normalizedData = normalizeData(scaledData);

// Split the data into training and testing sets
const [trainingData, testingData] = splitData(normalizedData);

// Feature selection
const selectedFeatures = selectFeatures(trainingData);

// Train the model
const model = trainModel(trainingData, selectedFeatures);

// Evaluate the model
const [predictions, actualValues] = evaluateModel(model, testingData, selectedFeatures);
const mse = calculateMSE(predictions, actualValues);
const rSquared = calculateRSquared(predictions, actualValues);

// User interface
const input = getInput();
const features = extractFeatures(input);
const prediction = predictGlycemicIndex(model, features);
displayResult(prediction);

  })
  .catch(error => console.error(error));
