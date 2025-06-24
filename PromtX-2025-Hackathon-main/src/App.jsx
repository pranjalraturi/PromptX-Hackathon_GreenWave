import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import QuizList from './pages/Quiz/QuizList';
import QuizDetail from './pages/Quiz/QuizDetail';
import Rewards from './pages/Rewards/Rewards';
import ActionsList from './pages/EcoActions/ActionsList';
import InitiativesList from './pages/Initiatives/InitiativesList';
import Dashboard from './pages/Dashboard';
import GamesHub from './pages/Games/GamesHub';
import EcoTriviaGame from './pages/Games/EcoTriviaGame';
import CarbonReducerGame from './pages/Games/CarbonReducerGame';
import WasteSorterGame from './pages/Games/WasteSorterGame';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quizzes/:id" element={<QuizDetail />} />
            <Route path="/games/*" element={<GamesHub />}>
              <Route path="eco-trivia" element={<EcoTriviaGame />} />
              <Route path="carbon-reducer" element={<CarbonReducerGame />} />
              <Route path="waste-sorter" element={<WasteSorterGame />} />
            </Route>
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/eco-actions" element={<ActionsList />} />
            <Route path="/initiatives" element={<InitiativesList />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;