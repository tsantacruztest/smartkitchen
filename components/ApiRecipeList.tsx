"use client";
import { recipes } from "@/lib/recipes";
import { UserIngredient } from "./IngredientManager";

type Props = {
  ingredients: UserIngredient[];
  activeCategory: string; // 1. Agregamos esta propiedad aquí
};

export default function ApiRecipeList({
  ingredients = [],
  activeCategory = "todos", // 2. La recibimos aquí con un valor por defecto
}: Props) {
  
  // 3. Agregamos el filtro por categorías antes de calcular los porcentajes
  const filteredRecipes = recipes.filter((recipe) => {
    if (activeCategory === "todos") return true;
    return recipe.category === activeCategory;
  });

  // 4. Cambiamos 'recipes.map' por 'filteredRecipes.map'
  const recipeMatches = filteredRecipes.map((recipe) => {
    // Guardamos explícitamente cuáles faltan
    const missingIngredients: string[] = [];

    const matchingIngredients = recipe.ingredients.filter(
      (recipeIngredient) => {
        const userIngredient = ingredients.find(
          (userIngredient) =>
            userIngredient.name.toLowerCase() ===
            recipeIngredient.name.toLowerCase()
        );

        // Si no lo tiene, o tiene menos cantidad de la requerida
        if (!userIngredient || userIngredient.quantity < recipeIngredient.quantity) {
          missingIngredients.push(recipeIngredient.name);
          return false;
        }

        return true;
      }
    );


    const percentage = Math.round(
      (matchingIngredients.length / recipe.ingredients.length) * 100
    );

    return {
      ...recipe,
      percentage,
      missingIngredients, // Pasamos el array al objeto modificado
    };
  });

  const sortedRecipes = recipeMatches
    .filter((recipe) => recipe.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

  const readyRecipes = sortedRecipes.filter((r) => r.percentage === 100);
  
  const almostReadyRecipes = sortedRecipes.filter(
    (r) => r.percentage >= 60 && r.percentage < 100
  );

  const otherRecipes = sortedRecipes.filter((r) => r.percentage < 60);

  if (ingredients.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 mt-8">
        {/* Título corregido con mayor contraste */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          🍳 Recetas recomendadas
        </h2>
        <div className="text-center py-12">
          <p className="text-slate-500 font-medium">
            Agrega ingredientes para comenzar a buscar
          </p>
        </div>
      </div>
    );
  }

  const renderRecipe = (recipe: any) => (
    <div
      key={recipe.id}
      className={`rounded-2xl p-5 mb-4 border transition-all hover:shadow-md ${
        recipe.percentage === 100
          ? "border-green-200 bg-green-50/40"
          : recipe.percentage >= 60
          ? "border-amber-200 bg-amber-50/40"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-base md:text-lg capitalize">
            {recipe.name}
          </h3>
          <p className="text-xs font-medium text-slate-500">
            {recipe.percentage === 100
              ? "¡Tienes todo listo para cocinar!"
              : `Tienes el ${recipe.percentage}% de los ingredientes requeridos`}
          </p>
          
          {/* Mostrar los ingredientes faltantes si no está al 100% */}
          {recipe.percentage < 100 && recipe.missingIngredients.length > 0 && (
            <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
              <p className="text-xs font-bold text-slate-600 mb-1">❌ Te falta:</p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.missingIngredients.map((ing: string) => (
                  <span 
                    key={ing} 
                    className="text-[11px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-md border border-red-100 capitalize"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <span
          className={`text-xs font-black px-3 py-1 rounded-full shadow-sm shrink-0 ${
            recipe.percentage === 100
              ? "bg-green-100 text-green-700 border border-green-200"
              : recipe.percentage >= 60
              ? "bg-amber-100 text-amber-700 border border-amber-200"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          {recipe.percentage}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 mt-8 space-y-8">
      {/* Título Principal con alto contraste */}
      <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
        <span>🍳</span> Recetas recomendadas
      </h2>

      {readyRecipes.length > 0 && (
        <div className="space-y-3">
          {/* Subtítulos con contraste fuerte text-slate-800 / text-green-700 */}
          <h3 className="text-xs font-extrabold text-green-700 uppercase tracking-widest flex items-center gap-1.5">
            ✨ Listas para cocinar ({readyRecipes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {readyRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {almostReadyRecipes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
            ⏳ Te falta poco ({almostReadyRecipes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {almostReadyRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {otherRecipes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
            📚 Otras opciones ({otherRecipes.length})
          </h3>
          <div className="space-y-1">
            {otherRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {sortedRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 font-medium">
            No hay recetas que coincidan con tus ingredientes.
          </p>
        </div>
      )}
    </div>
  );
}
