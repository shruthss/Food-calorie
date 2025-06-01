# Import packages
import React, { Component } from 'react'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import MacroNutrients from './components/macro-nutrients'
import SeaLion from './components/'
import initTutorial from './components/tutorial'
import Foods from './components/foods'
import { calculateMacroNutrients, calculateMicroNutrients } from
const lib = require('./seaLionOptimization')
'./components/calculations'
import logo from './imgs/logo.png'
// Datasets
import nutrients from './data/nutrients.json'
// Styles
import './App.css'
export default class App extends Component {
state = {}
nutrients$ = from(nutrients)
nutrientsLimited$ = from(nutrients).pipe(
map(nutrient => ({
name: nutrient.name,
rda: nutrient.rda,
})),
)
updateNutrients = selectedFoods$ => {
this.setState({
macroNutrients: calculateMacroNutrients(selectedFoods$),
microNutrients: calculateMicroNutrients(selectedFoods$,
this.nutrientsLimited$),
})
}
componentDidMount() {
54
initTutorial()
}
render() {
return (
<div className="App">
<div className="leftPanel">
<div className="logo">
<img alt="Logo" src={logo} />
</div>
<Foods updateNutrients={this.updateNutrients} />
</div>
<div className="rightPanel">
<MacroNutrients macroNutrients={this.state.macroNutrients} />
<MicroNutrients definitions={nutrients}
microNutrients={this.state.microNutrients} />
</div>
</div>
)
}
}
function seaLionOptimization(objectiveFunction, bounds, colonySize,
iterations) {
// Initialize variables
const dimension = bounds.length;
let bestSolution = null;
let bestFitness = Infinity;
// Initialize colony
let colony = [];
for (let i = 0; i < colonySize; i++) {
let solution = [];
for (let j = 0; j < dimension; j++) {
solution.push(Math.random() * (bounds[j][1] - bounds[j][0]) +
bounds[j][0]);
}
let fitness = objectiveFunction(solution);
if (fitness < bestFitness) {
bestSolution = solution;
bestFitness = fitness;
}
colony.push({solution, fitness});
}
55
// Main loop
for (let t = 0; t < iterations; t++) {
// Update positions of sea lions
for (let i = 0; i < colonySize; i++) {
let seaLion = colony[i];
let solution = seaLion.solution.slice();
for (let j = 0; j < dimension; j++) {
solution[j] += Math.random() * (bestSolution[j] - solution[j]);
}
// Ensure new solution is within bounds
for (let j = 0; j < dimension; j++) {
if (solution[j] < bounds[j][0]) {
solution[j] = bounds[j][0];
}
if (solution[j] > bounds[j][1]) {
solution[j] = bounds[j][1];
}
}
let fitness = objectiveFunction(solution);
if (fitness < bestFitness) {
bestSolution = solution;
bestFitness = fitness;
}
colony[i] = {solution, fitness};
}
// Update positions of breeding sea lions
let breedingSeaLions = [];
for (let i = 0; i < colonySize; i++) {
for (let j = 0; j < colonySize; j++) {
if (i !== j) {
let seaLion1 = colony[i];
let seaLion2 = colony[j];
let solution = [];
for (let k = 0; k < dimension; k++) {
solution.push((seaLion1.solution[k] + seaLion2.solution[k]) / 2);
}
// Ensure new solution is within bounds
for (let k = 0; k < dimension; k++) {
if (solution[k] < bounds[k][0]) {
solution[k] = bounds[k][0];
}
if (solution[k] > bounds[k][1]) {
solution[k] = bounds[k][1];
56
}
}
let fitness = objectiveFunction(solution);
if (fitness < bestFitness) {
bestSolution = solution;
bestFitness = fitness;
}
breedingSeaLions.push({solution, fitness});
}
}
}
// Update positions of pups
let pups = [];
for (let i = 0; i < colonySize; i++) {
let seaLion = colony[i];
let solution = seaLion.solution.slice();
for (let j = 0; j < dimension; j++) {
solution[j] += Math.random() * (solution[j] - bestSolution[j]);
}
// Ensure new solution is within bounds
for (let j = 0; j < dimension; j++) {
if (solution[j] < bounds
