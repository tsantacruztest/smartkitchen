"use client";

import { useEffect, useState } from "react";
import ApiRecipeList from "./ApiRecipeList";
import { ingredientsList } from "@/lib/ingredients";

export type UserIngredient = {
  name: string;
  quantity: number;
};

const quickIngredients = [
  { emoji: "🥚", name: "huevo" },
  { emoji: "🍅", name: "tomate" },
  { emoji: "🧅", name: "cebolla" },
  { emoji: "🧀", name: "queso" },
  { emoji: "🥩", name: "carne picada" },
  { emoji: "🥔", name: "patata" },
  { emoji: "🍚", name: "arroz" },
  { emoji: "🍝", name: "pasta" },
  { emoji: "🥛", name: "leche" },
  { emoji: "🍗", name: "pollo" },
];

export default function IngredientManager() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  
  // Estado para controlar la categoría de comida seleccionada
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  const saveIngredients = () => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  };

  const clearIngredients = () => {
    setIngredients([]);
    localStorage.removeItem("ingredients");
  };

  const addIngredient = () => {
    const ingredient = ingredientInput.trim().toLowerCase();
    if (!ingredient) return;

    const quantity = Number(quantityInput) || 1;
    const exists = ingredients.some((i) => i.name === ingredient);

    if (exists) return;

    setIngredients([...ingredients, { name: ingredient, quantity }]);
    setIngredientInput("");
    setQuantityInput("");
  };

  const removeIngredient = (ingredientName: string) => {
    setIngredients(ingredients.filter((i) => i.name !== ingredientName));
  };

  const addQuickIngredient = (ingredientName: string) => {
    const exists = ingredients.some((i) => i.name === ingredientName);
    if (exists) return;

    setIngredients([...ingredients, { name: ingredientName, quantity: 1 }]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 animate-fade-in">
      
      {/* Encabezado Principal */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-3">
          <span className="bg-slate-100 p-2.5 rounded-2xl shadow-inner">🍳</span> 
          <span>Smart Kitchen</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto font-medium">
          Descubre recetas deliciosas con los ingredientes que ya tienes en casa.
        </p>
      </div>

      {/* Contenedor de la Heladera */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 transition-all hover:shadow-2xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span>🧺</span> Mi Heladera
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={clearIngredients}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 active:scale-95 px-4 py-2.5 rounded-xl font-semibold border border-slate-200 hover:border-red-200 transition text-sm shadow-sm"
            >
              🗑️ Limpiar Heladera
            </button>
            <button
              onClick={saveIngredients}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-200 transition text-sm"
            >
              💾 Guardar Estado
            </button>
          </div>
        </div>

        {/* Formulario de Entrada */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6">
          <div className="relative sm:col-span-6">
            <input
              type="text"
              placeholder="Ej. Tomate, Huevo, Leche..."
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all bg-slate-50/50"
            />

            {/* Menú Desplegable de Sugerencias */}
            {ingredientInput.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto divide-y divide-slate-50">
                {ingredientsList
                  .filter((ingredient) =>
                    ingredient.toLowerCase().includes(ingredientInput.toLowerCase())
                  )
                  .slice(0, 8)
                  .map((ingredient) => (
                    <button
                      key={ingredient}
                      type="button"
                      onClick={() => setIngredientInput(ingredient)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition font-medium text-slate-700"
                    >
                      {ingredient}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <input
            type="number"
            placeholder="Cant."
            value={quantityInput}
            onChange={(e) => setQuantityInput(e.target.value)}
            className="sm:col-span-3 border-2 border-slate-200 rounded-xl p-3 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all bg-slate-50/50"
          />

          <button
            onClick={addIngredient}
            className="sm:col-span-3 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl font-bold transition shadow-md shadow-green-200 flex items-center justify-center gap-2 p-3"
          >
            ➕ Agregar
          </button>
        </div>

        {/* Sección de Ingredientes Cargados */}
        {ingredients.length > 0 && (
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 mb-6">
            <p className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <span>🛒</span> Ingredientes en tu heladera ({ingredients.length})
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="bg-white border border-green-200 text-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-3 shadow-sm hover:border-green-400 transition"
                >
                  <span className="font-semibold capitalize text-sm">{ingredient.name}</span>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-md">
                    x{ingredient.quantity}
                  </span>
                  <button
                    onClick={() => removeIngredient(ingredient.name)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-0.5 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sección de Ingredientes Rápidos */}
        <div className="border-t border-slate-100 pt-6">
          <p className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">
            ⚡ Añadir rápidamente
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {quickIngredients.map((item) => {
              const isAdded = ingredients.some((i) => i.name === item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => addQuickIngredient(item.name)}
                  disabled={isAdded}
                  className={`
                    flex items-center justify-center gap-2
                    px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200
                    \${isAdded 
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60" 
                      : "bg-white border-slate-200 text-slate-700 hover:border-green-500 hover:bg-green-50/50 hover:shadow-sm active:scale-95"
                    }
                  `}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="capitalize">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Selectores Visuales de Categorías */}
            {/* Selectores Visuales de Categorías */}
      <div className="bg-white border border-slate-100 shadow-md rounded-2xl p-4 flex flex-wrap justify-center gap-2">
        {[
          { id: "todos", label: "🍽️ Todo", color: "bg-slate-900 text-white" },
          { id: "desayuno", label: "☕ Desayuno", color: "bg-amber-500 text-white" },
          { id: "almuerzo", label: "☀️ Almuerzo", color: "bg-orange-500 text-white" },
          { id: "merienda", label: "🍰 Merienda", color: "bg-pink-500 text-white" },
          { id: "cena", label: "🌙 Cena", color: "bg-indigo-900 text-white" }
        ].map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 duration-200 ${
                isActive 
                  ? `\${cat.color} shadow-lg ring-4 ring-offset-2 ring-slate-200` 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Lista de Recetas (Le enviamos la categoría activa) */}
      <ApiRecipeList ingredients={ingredients} activeCategory={selectedCategory} />

    </div>
  );
}
