import React, { useState } from "react";

export const FromName=()=>{
  const [meal, setMeal] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [showImage, setShowImage] = useState(true); // initial state for the image

  const handleButtonClick = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );
    const data = await response.json();
    setRecipe(data.meals ? data.meals[0] : null);
    setShowImage(false); // hide the image when the recipe is displayed
  };

  return (
    <div className="cont">
    <div className="recipe-container">
     {/*} {showImage && <img src={bgImage}  alt="placeholder" className="recipe-image" />} {/ conditionally render the image }*/}
      <input
        type="text"
        placeholder="Enter a meal"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        className="recipe-input"
      />
      
      <button onClick={handleButtonClick} className="recipe-button">
        Get Recipe
      </button>
      
      {recipe && (
        <div className="recipe-result">
          <h2>{recipe.strMeal}</h2>
          <div className="topi">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="reci" />
          <div className="ingre">
          <h3>Ingredients:</h3>
          
          
          <ul>
            {Object.keys(recipe).map((key) => {
              if (key.includes("Ingredient") && recipe[key]) {
                return (
                  <li key={key} className="recipe-list-item">
                    {recipe[key]}
                  </li>
                 
                );
              }
              return null;
            })}
          </ul>
          </div>
          </div>
          <h3>Instructions:</h3>
          <ol className="recipe-instructions">
  {recipe.strInstructions.split('\n').map((step) => (
    <li key={step}>{step.trim()}</li>
  ))}
</ol>
       </div>
      )}
    </div>
     </div>
  );
};

