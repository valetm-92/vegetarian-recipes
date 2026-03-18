import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const { id, title, image, readyInMinutes, servings } = recipe;

  return (
    <div className="recipe-card">
      <div className="card-img-wrap">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="card-img-placeholder">🥗</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          {readyInMinutes && <span>⏱ {readyInMinutes} min</span>}
          {servings && <span>🍽 {servings} porzioni</span>}
        </div>
        <Link className="btn-details" to={`/recipe/${id}`}>
          Dettagli →
        </Link>
      </div>
    </div>
  );
}
