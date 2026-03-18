import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const { recipes, loading, error, searchQuery } = useRecipes();

  const showHero = recipes.length === 0 && !loading && !error;

  return (
    <>
      {showHero && (
        <div className="hero">
          <h1>Scopri la cucina<br /><em>vegetariana</em></h1>
          <p>Ricette fresche, saporite e 100% vegetariane. Cerca per ingrediente o piatto.</p>
        </div>
      )}

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" aria-label="Caricamento..." />
        </div>
      )}

      {!loading && error && (
        <div className="error-msg">
          <div className="emoji">🫤</div>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && recipes.length > 0 && (
        <>
          <h2 className="section-title">
            Risultati per "{searchQuery}" — {recipes.length} ricette trovate
          </h2>
          <div className="recipes-grid">
            {recipes.map(r => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
