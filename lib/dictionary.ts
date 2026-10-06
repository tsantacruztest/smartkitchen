// Diccionario bidireccional simple para mapear entradas
export const ingredientTranslations: { [key: string]: string } = {
  "huevo": "egg",
  "tomate": "tomato",
  "cebolla": "onion",
  "queso": "cheese",
  "carne picada": "minced beef",
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
  "espinaca": "spinach",
  "hongo": "mushrooms"
};

// Función auxiliar para obtener el término en inglés
export function toEnglish(spanishName: string): string {
  const clean = spanishName.trim().toLowerCase();
  return ingredientTranslations[clean] || clean; // Si no está, intenta usar el original
}
