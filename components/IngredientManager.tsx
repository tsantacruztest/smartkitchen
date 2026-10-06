"use client";

import { useEffect, useState } from "react";
import ApiRecipeList from "./ApiRecipeList";
import { ingredientsList } from "@/lib/ingredients";

export type UserIngredient = {
  name: string;
  quantity: number;
};

// FUNCIÓN UTILITARIA: Comprime y redimensiona imágenes del lado del cliente antes de enviarlas
const compressImage = (file: File, maxWidth = 1024, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Redimensionar proporcionalmente si supera el ancho máximo
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No se pudo obtener el contexto del Canvas"));
        
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a base64 con compresión JPEG
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        // Retornamos solo la cadena de datos pura (sin el prefijo "data:image/jpeg;base64,")
        resolve(compressedBase64.split(",")[1]);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
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
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [isScanning, setIsScanning] = useState(false);

  // NUEVO: Estado para controlar las notificaciones flotantes estéticas (Toasts)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Función utilitaria para lanzar la alerta visual y que se cierre sola
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500); // Se oculta automáticamente a los 3.5 segundos
  };

  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }
  }, []);
  // Función estrella: Lee el archivo de imagen, lo procesa y llama a la API de Gemini
  const handleScanImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    try {
      // 1. Comprimimos la imagen y obtenemos el Base64 limpio directamente
      const base64String = await compressImage(file);

      // 2. Enviamos la imagen comprimida a la ruta de API de Next.js
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64String }),
      });

      const data = await response.json();

      if (data.error) {
        showToast(data.error, "error");
        setIsScanning(false);
        return;
      }

      if (data.ingredients && data.ingredients.length > 0) {
        // Fusionamos los ingredientes existentes con los nuevos que detectó la IA
        setIngredients((prev) => {
          const updated = [...prev];
          data.ingredients.forEach((newIng: UserIngredient) => {
            const exists = updated.some(
              (i) => i.name.toLowerCase() === newIng.name.toLowerCase()
            );
            if (!exists) {
              updated.push({
                name: newIng.name.toLowerCase(),
                quantity: newIng.quantity || 1,
              });
            }
          });
          return updated;
        });
        showToast(`¡Éxito! La IA integró ${data.ingredients.length} ingredientes.`, "success");
      } else {
        showToast("La IA no logró reconocer ningún alimento claro.", "info");
      }
    } catch (err) {
      console.error("Error al escanear:", err);
      showToast("Fallo en la comunicación con el servidor de IA.", "error");
    } finally {
      setIsScanning(false);
    }
  };

  const saveIngredients = () => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
    showToast("¡Heladera guardada correctamente!", "success");
  };

  const clearIngredients = () => {
    setIngredients([]);
    localStorage.removeItem("ingredients");
    showToast("Se vació la heladera", "info");
  };

  const addIngredient = () => {
    const ingredient = ingredientInput.trim().toLowerCase();
    if (!ingredient) return;

    const quantity = Number(quantityInput) || 1;
    const exists = ingredients.some((i) => i.name === ingredient);

    if (exists) {
      showToast("Ese ingrediente ya está en tu heladera", "info");
      return;
    }

    setIngredients([...ingredients, { name: ingredient, quantity }]);
    setIngredientInput("");
    setQuantityInput("");
    showToast(`Añadido: ${ingredient}`, "success");
  };

  const removeIngredient = (ingredientName: string) => {
    setIngredients(ingredients.filter((i) => i.name !== ingredientName));
  };

  const addQuickIngredient = (ingredientName: string) => {
    const alreadyExists = ingredients.some((i) => i.name === ingredientName);
    if (alreadyExists) return;

    setIngredients([...ingredients, { name: ingredientName, quantity: 1 }]);
    showToast(`Añadido: ${ingredientName}`, "success");
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
          Descubre recetas deliciosas con los ingredientes que ya tienes en casa o escanea una foto.
        </p>
      </div>

      {/* Contenedor de la Heladera */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 transition-all hover:shadow-2xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span>🧺</span> Mi Heladera
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Botón de Escáner por Imagen con IA Inteligente */}
            <label className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95 ${
              isScanning 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200"
            }`}>
              <span>📸</span> {isScanning ? "Analizando..." : "Escanear Heladera / Ticket"}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleScanImage}
                disabled={isScanning}
                className="hidden"
              />
            </label>

            <div className="flex gap-2">
              <button
                onClick={clearIngredients}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 active:scale-95 px-4 py-2.5 rounded-xl font-semibold border border-slate-200 hover:border-red-200 transition text-sm shadow-sm"
              >
                🗑️ Limpiar
              </button>
              <button
                onClick={saveIngredients}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-200 transition text-sm"
              >
                💾 Guardar
              </button>
            </div>
          </div>
        </div>

        {/* Letrero de Carga de la IA Animado */}
        {isScanning && (
          <div className="bg-purple-50 border border-purple-200 text-purple-700 rounded-2xl p-4 text-center font-bold text-sm animate-pulse flex items-center justify-center gap-3 mb-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-700"></div>
            La Inteligencia Artificial está leyendo tu imagen... Esto tomará unos segundos.
          </div>
        )}

        {/* Formulario de Entrada Manual */}
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
                    ${isAdded 
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

      {/* Selectores Visuales de Categorías (CORREGIDO) */}
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

      {/* Lista de Recetas Local Estable */}
      <ApiRecipeList ingredients={ingredients} activeCategory={selectedCategory} />

      {/* COMPONENTE VISUAL FLOTANTE: Notificaciones Estéticas (Toasts) */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-slide-up max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-3 ring-1 ring-slate-900/5">
          <div className={`p-2 rounded-xl shrink-0 text-xl ${
            toast.type === "success" ? "bg-green-50 text-green-600" :
            toast.type === "error" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
          }`}>
            {toast.type === "success" ? "✨" : toast.type === "error" ? "❌" : "⚠️"}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800">
              {toast.type === "success" ? "¡Operación Exitosa!" : toast.type === "error" ? "Hubo un problema" : "Aviso de la App"}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1">
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
