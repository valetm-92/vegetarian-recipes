import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <RecipeContext.Provider value={{
      recipes, setRecipes,
      searchQuery, setSearchQuery,
      loading, setLoading,
      error, setError,
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used within RecipeProvider');
  return ctx;
};
