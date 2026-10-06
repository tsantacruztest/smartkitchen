"use client";

import { recipes } from "@/lib/recipes";
import { UserIngredient } from "./IngredientManager";
import Image from "next/image";

type Props = {
  ingredients: UserIngredient[];
  activeCategory: string;
};

export default function ApiRecipeList({
  ingredients = [],
  activeCategory = "todos",
}: Props) {
  
  // 1. Filtramos las recetas según la categoría seleccionada
  const filteredRecipes = recipes.filter((recipe) => {
    if (activeCategory === "todos") return true;
    return recipe.category === activeCategory;
  });

  // 2. Calculamos los porcentajes de ingredientes que posee el usuario
  const recipeMatches = filteredRecipes.map((recipe) => {
    const missingIngredients: string[] = [];

    const matchingIngredients = recipe.ingredients.filter(
      (recipeIngredient) => {
        const userIngredient = ingredients.find(
          (userIng) =>
            userIng.name.toLowerCase() === recipeIngredient.name.toLowerCase()
        );

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
      missingIngredients,
    };
  });

  // 3. Ordenamos las recetas de mayor a menor porcentaje de coincidencia
  const sortedRecipes = recipeMatches
    .filter((recipe) => recipe.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

  const readyRecipes = sortedRecipes.filter((r) => r.percentage === 100);
  
  const almostReadyRecipes = sortedRecipes.filter(
    (r) => r.percentage >= 50 && r.percentage < 100
  );

  const otherRecipes = sortedRecipes.filter((r) => r.percentage < 50);

  // Vista en caso de que no haya ingredientes cargados
  if (ingredients.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 mt-6">
        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
          🍳 Recetas recomendadas
        </h2>
        <div className="text-center py-12">
          <p className="text-slate-500 font-medium">
            Agrega ingredientes a tu heladera para comenzar a buscar recetas.
          </p>
        </div>
      </div>
    );
  }
  const renderRecipe = (recipe: any) => (
    <div
      key={recipe.id}
      className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
        recipe.percentage === 100
          ? "border-green-200 bg-green-50/10"
          : recipe.percentage >= 50
          ? "border-amber-200 bg-amber-50/10"
          : "border-slate-100 bg-white"
      }`}
    >
      {/* Contenedor de la Imagen Real usando la etiqueta optimizada de Next.js */}
      <div className="relative h-44 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400} // Ancho obligatorio de renderizado
          height={250} // Alto obligatorio de renderizado
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span
          className={`absolute top-3 right-3 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm ${
            recipe.percentage === 100
              ? "bg-green-600 text-white"
              : recipe.percentage >= 50
              ? "bg-amber-500 text-white"
              : "bg-slate-600 text-white"
          }`}
        >
          {recipe.percentage}%
        </span>
      </div>

      {/* Información de la Receta */}
      <div className="p-4 space-y-2">
        <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
          {recipe.category}
        </span>
        <h3 className="font-bold text-slate-800 text-base capitalize line-clamp-1 group-hover:text-green-600 transition-colors mt-1">
          {recipe.name}
        </h3>
        <p className="text-xs font-medium text-slate-500">
          {recipe.percentage === 100
            ? "¡Tienes todo listo para cocinar!"
            : `Tienes el ${recipe.percentage}% de los ingredientes`}
        </p>
        
        {/* Mostrar ingredientes faltantes en rojo discreto */}
        {recipe.percentage < 100 && recipe.missingIngredients.length > 0 && (
          <div className="pt-2 border-t border-dashed border-slate-100 mt-2">
            <p className="text-[11px] font-bold text-slate-600 mb-1">❌ Te falta:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missingIngredients.map((ing: string) => (
                <span 
                  key={ing} 
                  className="text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 capitalize"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8">
      <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
        <span>🍳</span> Recetas recomendadas
      </h2>

      {/* 1. SECCIÓN: LISTAS PARA COCINAR */}
      {readyRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-green-700 uppercase tracking-widest flex items-center gap-1.5">
            ✨ Listas para cocinar ({readyRecipes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {readyRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {/* 2. SECCIÓN: TE FALTA POCO */}
      {almostReadyRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
            ⏳ Te falta poco ({almostReadyRecipes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {almostReadyRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {/* 3. SECCIÓN: OTRAS OPCIONES */}
      {otherRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
            📚 Otras opciones ({otherRecipes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherRecipes.map(renderRecipe)}
          </div>
        </div>
      )}

      {/* Mensaje en caso de que no haya coincidencias con lo que cargaste */}
      {sortedRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 font-medium">
            Ninguna receta coincide con tus ingredientes. ¡Prueba añadiendo básicos como huevo, patata o pollo!
          </p>
        </div>
      )}
    </div>
  );
}
