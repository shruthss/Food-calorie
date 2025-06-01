import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd'; // Correct import for antd 3.17.0
import 'antd/dist/antd.css'; // Ensure you're importing the correct CSS file

const Chatbot = () => {
  // State to store messages and user input
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [caloriesData, setCaloriesData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  // Fetch the JSON data from the public folder when component mounts
  useEffect(() => {
    // Fetch calories data
    fetch('/data/calories.json')
      .then(response => response.json())
      .then(data => setCaloriesData(data))
      .catch(error => console.error('Error fetching calories data:', error));

    // Fetch exercise data
    fetch('/data/exercise.json')
      .then(response => response.json())
      .then(data => setExerciseData(data))
      .catch(error => console.error('Error fetching exercise data:', error));
  }, []);

  // Handle user input and process chatbot response
  const handleUserInput = (input) => {
    setMessages([...messages, { user: input }]);
    setUserInput('');

    // Check if input matches a food item from the calories data
    const food = caloriesData.find(item => item.food.toLowerCase() === input.toLowerCase());
    if (food) {
      setMessages(prevMessages => [
        ...prevMessages,
        { bot: `The calories in a ${food.food} are ${food.calories} calories.` }
      ]);
    } else {
      // If food not found, check for exercise info
      const exercise = exerciseData.find(item => item.exercise.toLowerCase() === input.toLowerCase());
      if (exercise) {
        setMessages(prevMessages => [
          ...prevMessages,
          { bot: `You burn around ${exercise.calories_burned_per_hour} calories per hour by doing ${exercise.exercise}.` }
        ]);
      } else {
        // Default response if no match is found
        setMessages(prevMessages => [
          ...prevMessages,
          { bot: "Sorry, I don't have information about that." }
        ]);
      }
    }
  };

  // Render the chat UI
  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.user && <p><strong>User:</strong> {message.user}</p>}
            {message.bot && <p><strong>Bot:</strong> {message.bot}</p>}
          </div>
        ))}
      </div>
      
      {/* Input for user query */}
      <Input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask about calories or exercise"
        style={{ padding: '10px', width: '80%' }}
      />
      <Button onClick={() => handleUserInput(userInput)} style={{ padding: '10px', marginLeft: '10px' }}>Send</Button>
    </div>
  );
};

export default Chatbot;
