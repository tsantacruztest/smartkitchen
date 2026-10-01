export type RecipeIngredient = {
  name: string;
  quantity: number;
};

export type RecipeCategory = "desayuno" | "almuerzo" | "merienda" | "cena";

export type Recipe = {
  id: number;
  name: string;
  category: RecipeCategory;
  ingredients: RecipeIngredient[];
};

export const recipes: Recipe[] = [
  // --- DESAYUNOS ---
  { id: 1, name: "Omelette de queso", category: "desayuno", ingredients: [{ name: "huevo", quantity: 2 }, { name: "queso mozzarella", quantity: 1 }, { name: "manteca", quantity: 1 }, { name: "sal", quantity: 1 }] },
  { id: 2, name: "Avena con banana y miel", category: "desayuno", ingredients: [{ name: "avena", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "banana", quantity: 1 }, { name: "miel", quantity: 1 }] },
  { id: 3, name: "Ensalada de frutas fresca", category: "desayuno", ingredients: [{ name: "banana", quantity: 1 }, { name: "manzana", quantity: 1 }, { name: "naranja", quantity: 2 }, { name: "azúcar", quantity: 1 }] },
  { id: 4, name: "Tostado clásico completo", category: "desayuno", ingredients: [{ name: "pan de molde", quantity: 2 }, { name: "jamón cocido", quantity: 1 }, { name: "queso mozzarella", quantity: 1 }] },
  { id: 5, name: "Huevos revueltos con panceta", category: "desayuno", ingredients: [{ name: "huevo", quantity: 3 }, { name: "panceta", quantity: 1 }, { name: "sal", quantity: 1 }] },
  { id: 6, name: "Yogur con frutillas y avena", category: "desayuno", ingredients: [{ name: "yogur natural", quantity: 1 }, { name: "frutilla", quantity: 5 }, { name: "avena", quantity: 1 }] },
  { id: 7, name: "Tostadas francesas simples", category: "desayuno", ingredients: [{ name: "pan de molde", quantity: 2 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "canela", quantity: 1 }] },

  // --- ALMUERZOS ---
  { id: 8, name: "Tortilla de patatas tradicional", category: "almuerzo", ingredients: [{ name: "huevo", quantity: 4 }, { name: "patata", quantity: 3 }, { name: "cebolla", quantity: 1 }, { name: "sal", quantity: 1 }] },
  { id: 9, name: "Arroz con pollo al verdeo", category: "almuerzo", ingredients: [{ name: "arroz", quantity: 1 }, { name: "pollo", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "cebolla de verdeo", quantity: 1 }] },
  { id: 10, name: "Milanesa con puré de papas", category: "almuerzo", ingredients: [{ name: "bife de carne", quantity: 2 }, { name: "huevo", quantity: 2 }, { name: "pan rallado", quantity: 1 }, { name: "patata", quantity: 4 }, { name: "leche", quantity: 1 }] },
  { id: 11, name: "Pasta boloñesa clásica", category: "almuerzo", ingredients: [{ name: "fideos", quantity: 1 }, { name: "carne picada", quantity: 1 }, { name: "puré de tomate", quantity: 1 }, { name: "cebolla", quantity: 1 }] },
  { id: 12, name: "Guiso tradicional de lentejas", category: "almuerzo", ingredients: [{ name: "lentejas", quantity: 1 }, { name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "zanahoria", quantity: 1 }] },
  { id: 13, name: "Ensalada César con pollo", category: "almuerzo", ingredients: [{ name: "lechuga", quantity: 1 }, { name: "pechuga de pollo", quantity: 1 }, { name: "pan de molde", quantity: 1 }, { name: "mayonesa", quantity: 1 }] },
  { id: 14, name: "Polenta con tuco y queso", category: "almuerzo", ingredients: [{ name: "polenta", quantity: 1 }, { name: "puré de tomate", quantity: 1 }, { name: "queso cremoso", quantity: 1 }, { name: "sal", quantity: 1 }] },
  { id: 15, name: "Bife de lomo con ensalada mixta", category: "almuerzo", ingredients: [{ name: "lomo", quantity: 1 }, { name: "lechuga", quantity: 1 }, { name: "tomate", quantity: 1 }, { name: "cebolla", quantity: 1 }] },

  // --- MERIENDAS ---
  { id: 16, name: "Panqueques con dulce de leche", category: "merienda", ingredients: [{ name: "leche", quantity: 1 }, { name: "harina 0000", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "dulce de leche", quantity: 1 }] },
  { id: 17, name: "Flan casero tradicional", category: "merienda", ingredients: [{ name: "huevo", quantity: 6 }, { name: "leche", quantity: 2 }, { name: "azúcar", quantity: 1 }, { name: "esencia de vainilla", quantity: 1 }] },
  { id: 18, name: "Budín de pan de la abuela", category: "merienda", ingredients: [{ name: "pan de molde", quantity: 4 }, { name: "leche", quantity: 2 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 3 }] },
  { id: 19, name: "Budín clásico de vainilla", category: "merienda", ingredients: [{ name: "harina leudante", quantity: 2 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "manteca", quantity: 1 }] },
  { id: 20, name: "Tarta dulce de ricota", category: "merienda", ingredients: [{ name: "ricota", quantity: 1 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "harina leudante", quantity: 1 }] },

  // --- CENAS ---
  { id: 21, name: "Hamburguesas caseras completas", category: "cena", ingredients: [{ name: "carne picada", quantity: 2 }, { name: "cebolla", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "pan de molde", quantity: 2 }, { name: "queso cheddar", quantity: 1 }] },
  { id: 22, name: "Pollo al horno con patatas", category: "cena", ingredients: [{ name: "pechuga de pollo", quantity: 2 }, { name: "patata", quantity: 3 }, { name: "limón", quantity: 1 }, { name: "aceite de oliva", quantity: 1 }] },
  { id: 23, name: "Pizza Margherita casera", category: "cena", ingredients: [{ name: "harina 000", quantity: 2 }, { name: "puré de tomate", quantity: 1 }, { name: "queso mozzarella", quantity: 2 }, { name: "aceite de oliva", quantity: 1 }] },
  { id: 24, name: "Tarta rápida de jamón y queso", category: "cena", ingredients: [{ name: "masa de tarta", quantity: 1 }, { name: "jamón cocido", quantity: 2 }, { name: "queso mozzarella", quantity: 2 }, { name: "huevo", quantity: 1 }] },
  { id: 25, name: "Tarta express de atún", category: "cena", ingredients: [{ name: "masa de tarta", quantity: 1 }, { name: "atún en lata", quantity: 2 }, { name: "cebolla", quantity: 1 }, { name: "pimiento rojo", quantity: 1 }] },
  { id: 26, name: "Revuelto de gramajo casero", category: "cena", ingredients: [{ name: "huevo", quantity: 3 }, { name: "patata", quantity: 2 }, { name: "jamón cocido", quantity: 1 }, { name: "arvejas", quantity: 1 }] },
  { id: 27, name: "Filet de merluza al limón", category: "cena", ingredients: [{ name: "merluza", quantity: 2 }, { name: "limón", quantity: 1 }, { name: "ajo", quantity: 1 }, { name: "sal", quantity: 1 }] },
  { id: 28, name: "Ñoquis con salsa de tomate", category: "cena", ingredients: [{ name: "pasta ñoquis", quantity: 1 }, { name: "puré de tomate", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "ajo", quantity: 1 }] }
];
