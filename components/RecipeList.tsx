import { UserIngredient } from "./IngredientManager";

type Recipe = {
  id: number;
  name: string;
  time: string;
  ingredients: {
    name: string;
    quantity: number;
  }[];
};

type Props = {
  ingredients: UserIngredient[];
  recipes: Recipe[];
};

export default function RecipeList({
  ingredients,
  recipes,
}: Props) {
  const scoredRecipes = recipes
    .map((recipe) => {
      const matches = recipe.ingredients.filter(
        (ingredient) =>
          ingredients.some(
            (userIngredient) =>
              userIngredient.name ===
              ingredient.name
          )
      );

      const percentage = Math.round(
        (matches.length /
          recipe.ingredients.length) *
          100
      );

      const missing = recipe.ingredients.filter(
        (ingredient) =>
          !ingredients.some(
            (userIngredient) =>
              userIngredient.name ===
              ingredient.name
          )
      );

      return {
        ...recipe,
        percentage,
        missing,
      };
    })
    .filter(
      (recipe) => recipe.percentage > 0
    )
    .sort(
      (a, b) =>
        b.percentage - a.percentage
    );

  if (scoredRecipes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-700">
          🍳 Sin recetas disponibles
        </h2>

        <p className="text-slate-500 mt-3">
          Añade ingredientes para descubrir recetas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {scoredRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {recipe.name}
              </h2>

              <p className="text-slate-500 mt-1">
                ⏱ {recipe.time}
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-full text-white font-bold ${
                recipe.percentage >= 90
                  ? "bg-green-600"
                  : recipe.percentage >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {recipe.percentage}%
            </div>
          </div>

          <div className="mt-5">
            <p className="font-semibold text-slate-700 mb-2">
              Ingredientes necesarios
            </p>

            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map(
                (ingredient) => (
                  <span
                    key={ingredient.name}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                  >
                    {ingredient.name} (
                    {ingredient.quantity})
                  </span>
                )
              )}
            </div>
          </div>

          {recipe.missing.length > 0 && (
            <div className="mt-5">
              <p className="font-semibold text-red-600 mb-2">
                ❌ Te falta
              </p>

              <div className="flex flex-wrap gap-2">
                {recipe.missing.map(
                  (ingredient) => (
                    <span
                      key={ingredient.name}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    >
                      {ingredient.name}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {recipe.percentage === 100 && (
            <div className="mt-5 bg-green-100 border border-green-300 text-green-700 p-3 rounded-xl font-semibold">
              ✅ Puedes cocinar esta receta ahora mismo
            </div>
          )}
        </div>
      ))}
    </div>
  );
}