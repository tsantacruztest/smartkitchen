"use client";

import { useState } from "react";
import { recipes } from "@/lib/recipes";
import { UserIngredient } from "./IngredientManager";

type Props = {
  ingredients: UserIngredient[];
  activeCategory: string;
};

export default function ApiRecipeList({
  ingredients = [],
  activeCategory = "todos",
}: Props) {
  // NUEVO: Estado para controlar qué receta está seleccionada en la ventana modal (null significa cerrada)
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  
  // 1. Filtramos las recetas según la categoría seleccionada
  const filteredRecipes = recipes.filter((recipe) => {
    if (activeCategory === "todos") return true;
return recipe.category?.toLowerCase() === activeCategory.toLowerCase();
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
      {/* Contenedor de Imagen Local con Placeholders de Color (Infalible) */}
<div className={`relative h-44 w-full overflow-hidden border-b border-slate-100 flex items-center justify-center text-5xl select-none ${
  recipe.category === "desayuno" ? "bg-amber-100" :
  recipe.category === "almuerzo" ? "bg-orange-100" :
  recipe.category === "merienda" ? "bg-pink-100" : "bg-indigo-100"
}`}>
  {/* Pintamos el emoji de la receta grande en el centro */}
  <span>{recipe.image}</span>
  
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

        {/* NUEVO: Botón interactivo para abrir la preparación en la Modal */}
        <div className="pt-3 mt-2 border-t border-slate-50 flex items-center justify-end">
          <button
            onClick={() => setSelectedRecipe(recipe)}
            className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1 group/btn"
          >
            Ver preparación
            <span className="inline-block transition-transform group-hover/btn:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-8 relative">
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

      {sortedRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 font-medium">
            Ninguna receta coincide con tus ingredientes. ¡Prueba añadiendo básicos como huevo, patata o pollo!
          </p>
        </div>
      )}

      {/* NUEVO: ESTRUCTURA VISUAL DE LA VENTANA MODAL FLOTANTE */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          
          {/* Fondo que permite cerrar el modal haciendo clic afuera */}
          <div className="absolute inset-0" onClick={() => setSelectedRecipe(null)}></div>
          
          {/* Tarjeta de la Ventana Emergente */}
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh] border border-slate-100 animate-slide-up">
            
            {/* Cabecera con Fondo de Color y Emoji en la Modal */}
<div className={`relative h-48 w-full shrink-0 flex items-center justify-center text-6xl ${
  selectedRecipe.category === "desayuno" ? "bg-amber-100" :
  selectedRecipe.category === "almuerzo" ? "bg-orange-100" :
  selectedRecipe.category === "merienda" ? "bg-pink-100" : "bg-indigo-100"
}`}>
  <span>{selectedRecipe.image}</span>
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
  
  {/* Botón de Cerrar Flotante */}
  <button
    onClick={() => setSelectedRecipe(null)}
    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/40 active:scale-95 transition rounded-full p-2 font-bold h-9 w-9 flex items-center justify-center text-lg"
  >
    ✕
  </button>

  <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
    <span className="text-[10px] font-black tracking-widest uppercase bg-green-600 px-2 py-0.5 rounded shadow-sm">
      {selectedRecipe.category}
    </span>
    <h3 className="text-xl md:text-2xl font-black capitalize drop-shadow-md">
      {selectedRecipe.name}
    </h3>
  </div>
</div>


            {/* Contenido Desplazable */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Lista de Ingredientes Necesarios */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>🛒</span> Ingredientes Requeridos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing: any) => {
                    const hasIt = !selectedRecipe.missingIngredients.includes(ing.name);
                    return (
                      <div 
                        key={ing.name} 
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-sm transition font-medium ${
                          hasIt 
                            ? "bg-green-50/50 border-green-100 text-green-800" 
                            : "bg-red-50/40 border-red-100 text-slate-700"
                        }`}
                      >
                        <span className="capitalize">{ing.name}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          hasIt ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          x{ing.quantity} {hasIt ? "✓" : "❌"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

                           {/* Lista del Paso a Paso */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span>🍳</span> Preparación Paso a Paso
                </h4>
                <ol className="space-y-4">
                  {selectedRecipe.instructions.map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="flex items-center justify-center bg-green-100 text-green-700 text-xs font-black rounded-full h-6 w-6 shrink-0 shadow-inner mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            {/* Pie del Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
              >
                Cerrar Ventana
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
