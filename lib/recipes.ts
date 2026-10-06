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
  instructions: string[]; // Nueva propiedad para el paso a paso
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
    ],
    instructions: [
      "Corta el pollo en dados medianos y pica el ajo finamente.",
      "En una sartén caliente con un chorrito de aceite, dora el pollo hasta que esté sellado.",
      "Agrega el ajo picado, la salsa de soja y el azúcar.",
      "Cocina a fuego medio-bajo durante 10 minutos hasta que la salsa reduzca y espese como un caramelo.",
      "Sirve caliente, idealmente acompañado de arroz blanco."
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
    ],
    instructions: [
      "Pica la cebolla y el ajo en trozos muy pequeños.",
      "En una olla, sofríe la cebolla y el ajo con aceite de oliva hasta que estén tiernos.",
      "Añade la carne picada, salpimienta y cocínala rompiéndola con una cuchara hasta que cambie de color.",
      "Agrega los tomates triturados y cocina a fuego lento durante 20 minutos.",
      "Mientras tanto, hierve la pasta en abundante agua con sal el tiempo que indique el paquete.",
      "Escurre la pasta, mézclala con la salsa boloñesa caliente y sirve con queso rallado."
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
    ],
    instructions: [
      "Cocina el arroz blanco de forma tradicional con anticipación (es mejor si está frío).",
      "Corta el pollo, la cebolla y la zanahoria en cubos pequeños.",
      "En un sartén grande o wok con aceite, saltea la zanahoria y la cebolla hasta que se ablanden.",
      "Agrega el pollo y cocínalo por completo.",
      "Haz un espacio en el centro de la sartén, rompe los huevos y revuélvelos ahí mismo hasta que cuajen.",
      "Incorpora el arroz frío, mezcla todo con energía y añade un chorrito de salsa de soja antes de servir."
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
    ],
    instructions: [
      "Bate los huevos en un plato hondo con una pizca de sal, pimienta y ajo en polvo.",
      "Pasa los filetes de carne por el huevo batido y luego empánalos presionando fuerte sobre el pan rallado.",
      "Corta las patatas en bastones alargados.",
      "Fríe las patatas en abundante aceite caliente hasta que estén doradas y crujientes (o cocínalas al horno).",
      "En otra sartén, fríe las milanesas durante 2 o 3 minutos por lado hasta que estén doradas.",
      "Escurre el exceso de aceite con papel absorbente y sirve las milanesas junto a las patatas fritas."
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
    ],
    instructions: [
      "Corta la cebolla, las zanahorias y la patata en trozos medianos.",
      "En una olla grande, coloca las piezas de pollo y cubre con abundante agua.",
      "Lleva a ebullición y retira la espuma que se forme en la superficie con una espumadera.",
      "Agrega los vegetales cortados, sazona con sal y cocina a fuego medio durante 40 minutos.",
      "Retira el pollo, desmenúzalo descartando los huesos e incorpóralo nuevamente a la sopa antes de servir bien caliente."
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
    ],
    instructions: [
      "En un bol espacioso, pisa la banana con un tenedor hasta convertirla en un puré fluido.",
      "Agrega los huevos y la leche, batiendo bien hasta unificar la mezcla.",
      "Incorpora la harina poco a poco mezclando con suavidad para evitar que se formen grumos.",
      "Calienta una sartén antiadherente a fuego medio y píntala con un poquito de manteca o aceite.",
      "Vierte porciones de masa formando discos pequeños. Cuando veas burbujas en la superficie, dales la vuelta.",
      "Cocina un minuto más del otro lado y sírvelos con miel, frutas o dulce de leche."
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
    ],
    instructions: [
      "Precalienta el horno a 180°C y enharina un molde para tartas.",
      "Mezcla la harina con la manteca fría y la mitad del azúcar hasta formar una masa arenosa; estírala sobre el molde.",
      "Pela las manzanas y córtalas en láminas finas.",
      "Coloca las láminas de manzana de forma decorativa sobre la base de masa y espolvorea el resto del azúcar encima.",
      "Hornea durante 35-40 minutos hasta que las manzanas estén tiernas y los bordes de la masa se vean dorados.",
      "Deja templar antes de desmoldar y cortar."
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
    ],
    instructions: [
      "Bate los huevos en un bol con una pizca de sal y pimienta hasta que queden espumosos.",
      "Corta el tomate en cubos pequeños y ralla o pica el queso.",
      "Calienta una sartén antiadherente a fuego medio con un poquito de manteca o aceite.",
      "Vierte los huevos batidos y espárcelos bien por toda la superficie.",
      "Cuando la base empiece a cuajar pero la superficie siga algo húmeda, coloca el queso y el tomate en una mitad.",
      "Con la ayuda de una espátula, dobla el omelette por la mitad cubriendo el relleno.",
      "Cocina un minuto de cada lado para que el queso se derrita por completo y sirve inmediatamente."
    ]
  }
];
