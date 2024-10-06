// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Fetch random quote from API
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote on component mount
  }, []);

  // Save the current quote to the list
  const saveQuote = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  return (
    <div className="app">
      <h1>Ron Swanson Quotes</h1>
      
      {/* Display random quote */}
      <QuoteCard quote={quote} onSave={saveQuote} />

      {/* Button to get a new quote */}
      <button className="new-quote-btn" onClick={fetchQuote}>Get New Quote</button>

      {/* Saved Quotes List */}
      <h2>Saved Quotes</h2>
      <ul>
        {savedQuotes.map((savedQuote, index) => (
          <li key={index}>"{savedQuote}"</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
