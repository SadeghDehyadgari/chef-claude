import React from "react";
import IngredientsList from "./components/IngredientsList";
import DeepSeekRecipe from "./components/DeepSeekRecipe";
import { getRecipeFromDeepSeek } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function getRecipe() {
    try {
      setLoading(true);
      const recipeMarkdown = await getRecipeFromDeepSeek(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {loading && <p>Loading recipe...</p>}
      {!loading && recipe && <DeepSeekRecipe recipe={recipe} />}
    </main>
  );
}
