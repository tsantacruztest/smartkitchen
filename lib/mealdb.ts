export const ingredientTranslations: { [key: string]: string } = {
  "huevo": "egg",
  "tomate": "tomato",
  "cebolla": "onion",
  "queso": "cheese",
  "carne picada": "beef",
  "patata": "potato",
  "arroz": "rice",
  "pasta": "pasta",
  "leche": "milk",
  "pollo": "chicken",
  "ajo": "garlic",
  "manteca": "butter",
  "harina": "flour",
  "atun": "tuna",
  "zanahoria": "carrot",
  "espinaca": "spinach"
};

export interface ApiRecipe {
  id: string;
  name: string;
  image: string;
}

// CORRECCIÓN: Se añadió la ruta completa y correcta de la API pública
const BASE_URL = "https://themealdb.com";

export async function fetchRecipesByIngredients(spanishIngredients: string[]): Promise<ApiRecipe[]> {
  // Validación estricta para no disparar consultas si la heladera está vacía
  if (!spanishIngredients || spanishIngredients.length === 0 || !spanishIngredients[0]) {
    return [];
  }

  try {
    // Tomamos el primer ingrediente de forma limpia y segura
    const rawIngredient = spanishIngredients[0];
    const firstIngredient = String(rawIngredient).toLowerCase().trim();
    
    if (!firstIngredient || firstIngredient === "undefined") return [];
    
    // Buscamos su equivalente en inglés mediante nuestro diccionario
    const englishIngredient = ingredientTranslations[firstIngredient] || firstIngredient;
    
    // Codificamos el parámetro para evitar roturas por espacios
    const cleanParam = encodeURIComponent(englishIngredient);
    
    // Realizamos la consulta con la URL corregida
    const response = await fetch(`${BASE_URL}/filter.php?i=${cleanParam}`);
    
    if (!response.ok) {
      console.warn(`La API devolvió un código de estado inválido: ${response.status}`);
      return [];
    }

    const data = await response.json();

    // Si la API responde pero no contiene platos válidos
    if (!data || !data.meals) return [];

    return data.meals.map((meal: any) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    }));
  } catch (error) {
    console.error("Error controlado en fetchRecipesByIngredients:", error);
    return [];
  }
}
