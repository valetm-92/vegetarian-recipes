import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { searchRecipes } from '../services/api';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, setRecipes, setLoading, setError } = useRecipes();
  const [input, setInput] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setSearchQuery(q);
    setLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const data = await searchRecipes(q);
      setRecipes(data.results || []);
      if ((data.results || []).length === 0) {
        setError('Nessuna ricetta trovata per "' + q + '". Prova con un altro termine!');
      }
    } catch (err) {
      setError('Errore durante la ricerca. Controlla la tua API key o riprova più tardi.');
    } finally {
      setLoading(false);
    }
    navigate('/');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Cerca una ricetta vegetariana..."
        value={input}
        onChange={e => setInput(e.target.value)}
        aria-label="Cerca ricette"
      />
      <button className="search-btn" type="submit">Cerca</button>
    </form>
  );
}
