import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './contexts/RecipeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

export default function App() {
  return (
    <RecipeProvider>
      <HashRouter>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </RecipeProvider>
  );
}
