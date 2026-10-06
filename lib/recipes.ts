export type RecipeIngredient = {
  name: string;
  quantity: number;
};

export type RecipeCategory = "desayuno" | "almuerzo" | "merienda" | "cena";

export type Recipe = {
  id: string;
  name: string;
  category: RecipeCategory;
  image: string;
  ingredients: RecipeIngredient[];
};

export const recipes: Recipe[] = [
  {
    id: "52772",
    name: "Pollo Teriyaki Express",
    category: "almuerzo",
    image: "https://themealdb.com",
    ingredients: [
      { name: "pollo", quantity: 1 },
      { name: "salsa de soja", quantity: 1 },
      { name: "azúcar", quantity: 1 },
      { name: "ajo", quantity: 1 }
    ]
  },
  {
    id: "52844",
    name: "Pasta Boloñesa Tradicional",
    category: "almuerzo",
    image: "https://themealdb.com",
    ingredients: [
      { name: "pasta", quantity: 1 },
      { name: "carne picada", quantity: 1 },
      { name: "tomate", quantity: 2 },
      { name: "cebolla", quantity: 1 },
      { name: "ajo", quantity: 1 }
    ]
  },
  {
    id: "52956",
    name: "Arroz Frito con Pollo",
    category: "cena",
    image: "https://themealdb.com",
    ingredients: [
      { name: "arroz", quantity: 1 },
      { name: "pollo", quantity: 1 },
      { name: "cebolla", quantity: 1 },
      { name: "zanahoria", quantity: 1 },
      { name: "huevo", quantity: 2 }
    ]
  },
  {
    id: "53068",
    name: "Milanesa de Carne con Patatas",
    category: "almuerzo",
    image: "https://themealdb.com",
    ingredients: [
      { name: "carne picada", quantity: 1 },
      { name: "huevo", quantity: 2 },
      { name: "pan rallado", quantity: 1 },
      { name: "patata", quantity: 3 }
    ]
  },
  {
    id: "52807",
    name: "Sopa de Pollo y Vegetales",
    category: "cena",
    image: "https://themealdb.com",
    ingredients: [
      { name: "pollo", quantity: 1 },
      { name: "zanahoria", quantity: 2 },
      { name: "patata", quantity: 1 },
      { name: "cebolla", quantity: 1 }
    ]
  },
  {
    id: "52855",
    name: "Banana Pancakes (Panqueques)",
    category: "desayuno",
    image: "https://themealdb.com",
    ingredients: [
      { name: "banana", quantity: 1 },
      { name: "huevo", quantity: 2 },
      { name: "leche", quantity: 1 },
      { name: "harina", quantity: 1 }
    ]
  },
  {
    id: "52893",
    name: "Tarta de Manzana Clásica",
    category: "merienda",
    image: "https://themealdb.com",
    ingredients: [
      { name: "manzana", quantity: 3 },
      { name: "harina", quantity: 2 },
      { name: "manteca", quantity: 1 },
      { name: "azúcar", quantity: 1 }
    ]
  },
  {
    id: "52900",
    name: "Omelette de Queso y Tomate",
    category: "desayuno",
    image: "https://themealdb.com",
    ingredients: [
      { name: "huevo", quantity: 2 },
      { name: "queso", quantity: 1 },
      { name: "tomate", quantity: 1 }
    ]
  }
];
