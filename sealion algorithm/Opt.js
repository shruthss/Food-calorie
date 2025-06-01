const lib = require('./SLnO algorithm') 
// Define the rules and equations
const CALORIES_PER_GRAM_OF_CARBS = 4;
const CALORIES_PER_GRAM_OF_FATS = 9;
const CALORIES_PER_GRAM_OF_PROTEINS = 4;

// Gather the nutritional information
const servingSize = 100; // in grams
const carbs = 20; // in grams
const fats = 10; // in grams
const proteins = 5; // in grams

// Implement the SLnO algorithm
const totalCalories = 
  (carbs * CALORIES_PER_GRAM_OF_CARBS) +
  (fats * CALORIES_PER_GRAM_OF_FATS) +
  (proteins * CALORIES_PER_GRAM_OF_PROTEINS);
  // Define the SLnO function
function SLnO(nutrients) {
  // Define the parameters
  const alpha = 0.5;
  const beta = 0.22;
  const gamma = 0.03;

  // Calculate the glycemic index using the SLnO formula
  const gi = alpha * nutrients.carbohydrates + beta * nutrients.protein + gamma * nutrients.fat;

  // Return the glycemic index
  return gi;
}

// Example usage
const nutrients = {
  carbohydrates: 50,
  protein: 20,
  fat: 10
};

const gi = SLnO(nutrients);
console.log(gi); // Output: 29.5


const caloriesPerServing = totalCalories / servingSize;

// Display the results
console.log(`Calories per serving: ${caloriesPerServing}`);
