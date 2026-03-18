import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api';

const NUTRIENTS_OF_INTEREST = ['Calories', 'Carbohydrates', 'Protein', 'Fat', 'Fiber', 'Sugar'];

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getRecipeById(id)
      .then(data => { if (!cancelled) setRecipe(data); })
      .catch(() => { if (!cancelled) setError('Impossibile caricare la ricetta. Verifica la tua API key.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return (
    <div className="spinner-wrap">
      <div className="spinner" aria-label="Caricamento..." />
    </div>
  );

  if (error) return (
    <div className="error-msg">
      <div className="emoji">😕</div>
      <p>{error}</p>
      <button className="back-btn" style={{ justifyContent: 'center', marginTop: '1rem' }} onClick={() => navigate(-1)}>
        ← Torna indietro
      </button>
    </div>
  );

  if (!recipe) return null;

  const steps = recipe.analyzedInstructions?.[0]?.steps || [];
  const nutrients = (recipe.nutrition?.nutrients || [])
    .filter(n => NUTRIENTS_OF_INTEREST.includes(n.name));

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Torna ai risultati</button>

      {recipe.image && (
        <img className="detail-hero-img" src={recipe.image} alt={recipe.title} />
      )}

      <h1 className="detail-title">{recipe.title}</h1>

      <div className="detail-meta">
        {recipe.readyInMinutes && (
          <span className="meta-chip">⏱ {recipe.readyInMinutes} min</span>
        )}
        {recipe.servings && (
          <span className="meta-chip">🍽 {recipe.servings} porzioni</span>
        )}
        {recipe.vegetarian && <span className="meta-chip">🌿 Vegetariano</span>}
        {recipe.vegan && <span className="meta-chip">🌱 Vegano</span>}
        {recipe.glutenFree && <span className="meta-chip">🌾 Senza glutine</span>}
      </div>

      {/* INGREDIENTI */}
      {recipe.extendedIngredients?.length > 0 && (
        <div className="detail-section">
          <h2>Ingredienti</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map((ing, i) => (
              <li key={ing.id ?? i}>
                {ing.original}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ISTRUZIONI */}
      {steps.length > 0 && (
        <div className="detail-section">
          <h2>Preparazione</h2>
          <ol className="steps-list">
            {steps.map(step => (
              <li key={step.number}>
                <span className="step-num">{step.number}</span>
                <span className="step-text">{step.step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* VALORI NUTRIZIONALI */}
      {nutrients.length > 0 && (
        <div className="detail-section">
          <h2>Valori Nutrizionali</h2>
          <div className="nutrition-grid">
            {nutrients.map(n => (
              <div key={n.name} className="nutrition-card">
                <div className="nutrition-value">
                  {Math.round(n.amount)}{n.unit}
                </div>
                <div className="nutrition-label">{n.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
