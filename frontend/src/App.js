import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import JoinPage from './components/JoinPage';
import './App.css';
import './styles.css';

const HP = () => (
        <div className="App">
            <HomePage/>
        </div>
);

const JP = () => (
    <div className="App">
        <JoinPage/>
    </div>
);

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<HP />} />
            <Route path="/join-page" element={<JP />} />
        </Routes>
    </div>
);

export default App;


