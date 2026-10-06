export type RecipeIngredient = {
  name: string;
  quantity: number;
};

export type RecipeCategory = "desayuno" | "almuerzo" | "merienda" | "cena";

export type Recipe = {
  id: string;
  name: string;
  category: RecipeCategory;
  image: string; // Usaremos el emoji directamente acá
  ingredients: RecipeIngredient[];
  instructions: string[];
};

export const recipes: Recipe[] = [
  // ==========================================
  // DESAYUNO (20 Recetas)
  // ==========================================
  {
    id: "des_001",
    name: "Tostado Carlitos Clasico",
    category: "desayuno",
    image: "🥪",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "queso", quantity: 2 }, { name: "jamon", quantity: 2 }, { name: "manteca", quantity: 1 }],
    instructions: ["Unta las tapas de pan con manteca.", "Arma el tostado con fetas de jamón y queso.", "Tuesta en sartén vuelta y vuelta hasta dorar."]
  },
  {
    id: "des_002",
    name: "Panqueques con Dulce de Leche",
    category: "desayuno",
    image: "🥞",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "dulce de leche", quantity: 1 }],
    instructions: ["Bate la harina, leche y huevos hasta lograr una mezcla lisa.", "Cocina los panqueques finos en sartén con manteca.", "Rellena con dulce de leche y enrolla."]
  },
  {
    id: "des_003",
    name: "Huevos Revueltos de Campo",
    category: "desayuno",
    image: "🍳",
    ingredients: [{ name: "huevo", quantity: 3 }, { name: "manteca", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Bate los huevos con sal y pimienta.", "Derrite manteca en una sartén a fuego bajo.", "Cocina revolviendo constantemente y suma el queso al final."]
  },
  {
    id: "des_004",
    name: "Tostadas con Huevo y Palta",
    category: "desayuno",
    image: "🥑",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "palta", quantity: 1 }, { name: "huevo", quantity: 2 }],
    instructions: ["Tuesta el pan lactal o de campo.", "Pisa la palta con sal y esparce sobre las tostadas.", "Coloca encima los huevos hechos a la plancha."]
  },
  {
    id: "des_005",
    name: "Avena Caliente con Banana",
    category: "desayuno",
    image: "🥣",
    ingredients: [{ name: "avena", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "banana", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Cocina la avena con la leche a fuego medio.", "Revuelve hasta que espese y sirve en un bol.", "Decora con rodajas de banana fresca."]
  },
  {
    id: "des_006",
    name: "Yogur con Manzana y Azucar",
    category: "desayuno",
    image: "🥛",
    ingredients: [{ name: "yogur", quantity: 1 }, { name: "manzana", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Vierte el yogur natural en un bol.", "Pica la manzana en cubitos bien pequeños.", "Mezcla todo con una cucharada de azúcar."]
  },
  {
    id: "des_007",
    name: "Omelette de Queso y Tomate",
    category: "desayuno",
    image: "🥚",
    ingredients: [{ name: "huevo", quantity: 2 }, { name: "queso", quantity: 1 }, { name: "tomate", quantity: 1 }],
    instructions: ["Bate los huevos.", "Vierte en la sartén y agrega el queso y tomate picado en una mitad.", "Dobla al medio y cocina hasta derretir el queso."]
  },
  {
    id: "des_008",
    name: "Licuado Casero de Banana",
    category: "desayuno",
    image: "🥤",
    ingredients: [{ name: "banana", quantity: 2 }, { name: "leche", quantity: 2 }, { name: "azúcar", quantity: 2 }],
    instructions: ["Coloca las bananas en trozos en la licuadora.", "Suma la leche fría y el azúcar.", "Licúa a máxima potencia por 1 minuto."]
  },
  {
    id: "des_009",
    name: "Tostadas Francesas de la Abuela",
    category: "desayuno",
    image: "🍞",
    ingredients: [{ name: "pan", quantity: 3 }, { name: "huevo", quantity: 2 }, { name: "leche", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Mezcla el huevo, la leche y el azúcar en un plato hondo.", "Remoja las rodajas de pan en la mezcla.", "Dora en una sartén con manteca de ambos lados."]
  },
  {
    id: "des_010",
    name: "Budin de Pan en Microondas",
    category: "desayuno",
    image: "🍮",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "leche", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Remoja el pan viejo en leche tibia y písalo.", "Agrega el huevo y el azúcar.", "Cocina al microondas en una taza por 3 minutos."]
  },
  {
    id: "des_011",
    name: "Muffins de Manzana Faciles",
    category: "desayuno",
    image: "🧁",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "manzana", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Mezcla el huevo con azúcar y harina.", "Incorpora la manzana rallada finamente.", "Vierte en moldes y hornea a 180°C por 20 minutos."]
  },
  {
    id: "des_012",
    name: "Waffles de Harina Express",
    category: "desayuno",
    image: "🧇",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Bate la harina, el huevo y la leche hasta espesar.", "Vierte en una wafflera o sartén caliente.", "Cocina hasta que esté bien firme de ambos lados."]
  },
  {
    id: "des_013",
    name: "Galletas de Avena de Desayuno",
    category: "desayuno",
    image: "🍪",
    ingredients: [{ name: "avena", quantity: 2 }, { name: "huevo", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Une la avena, el huevo y el azúcar en un bol.", "Arma discos planos con una cuchara en una placa.", "Hornea 12 minutos a fuego medio."]
  },
  {
    id: "des_014",
    name: "Scons Caseros de Queso",
    category: "desayuno",
    image: "🧀",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "manteca", quantity: 1 }, { name: "queso", quantity: 2 }],
    instructions: ["Une la harina con la manteca fría creando un arenado.", "Agrega el queso rallado y un chorrito de agua fría.", "Corta círculos gruesos y hornea a 200°C por 15 minutos."]
  },
  {
    id: "des_015",
    name: "Pan con Tomate y Ajo",
    category: "desayuno",
    image: "🥖",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "tomate", quantity: 1 }, { name: "ajo", quantity: 1 }],
    instructions: ["Tuesta el pan y frótale el diente de ajo crudo.", "Corta el tomate en cubitos y condiméntalo con aceite.", "Sírvelo montado sobre la tostada caliente."]
  },
  {
    id: "des_016",
    name: "Crepes Simples Espolvoreados",
    category: "desayuno",
    image: "🥞",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Bate los ingredientes hasta obtener una mezcla líquida.", "Haz capas delgadas en una sartén de teflón.", "Sírvelas espolvoreadas con azúcar común."]
  },
  {
    id: "des_017",
    name: "Huevo Frito en el Pan",
    category: "desayuno",
    image: "🍳",
    ingredients: [{ name: "pan", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "manteca", quantity: 1 }],
    instructions: ["Haz un agujero redondo en el centro de la rodaja de pan.", "Dora el pan en una sartén con manteca.", "Rompe el huevo directo en el agujero y cocina a fuego bajo."]
  },
  {
    id: "des_018",
    name: "Torta en Taza Rapida (Mug Cake)",
    category: "desayuno",
    image: "☕",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Mezcla todo directo adentro de una taza.", "Asegúrate de que quede integrado de forma homogénea.", "Cocina al microondas a potencia máxima por 1 minuto y medio."]
  },
  {
    id: "des_019",
    name: "Pancakes Gorditos de Leche",
    category: "desayuno",
    image: "🥞",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Separa la clara y bátela a nieve.", "Mezcla la yema, harina, leche y azúcar; luego incorpora la clara.", "Cocina cucharadas de masa en sartén tapada a fuego mínimo."]
  },
  {
    id: "des_020",
    name: "Batido Nutritivo de Avena",
    category: "desayuno",
    image: "🥤",
    ingredients: [{ name: "avena", quantity: 1 }, { name: "banana", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Coloca la avena cruda en la licuadora y procésala sola.", "Suma la banana y la leche fría.", "Licúa hasta que no queden grumos y sirve."]
  },
  // ==========================================
  // ALMUERZO (20 Recetas)
  // ==========================================
  {
    id: "alm_001",
    name: "Milanesas con Papas Fritas",
    category: "almuerzo",
    image: "🥩",
    ingredients: [{ name: "carne", quantity: 1 }, { name: "pan rallado", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "patata", quantity: 3 }],
    instructions: ["Pasa la carne por huevo batido y pan rallado.", "Fríe en abundante aceite caliente.", "Sirve junto a una porción de papas fritas."]
  },
  {
    id: "alm_002",
    name: "Empanadas de Carne Fritas",
    category: "almuerzo",
    image: "🥟",
    ingredients: [{ name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 2 }, { name: "masa de empanadas", quantity: 1 }, { name: "huevo", quantity: 1 }],
    instructions: ["Rehoga la cebolla, agrega la carne picada y condimenta.", "Suma huevo duro picado y rellena las tapas.", "Fríe en grasa o aceite bien caliente."]
  },
  {
    id: "alm_003",
    name: "Tallarines con Tuco Casero",
    category: "almuerzo",
    image: "🍝",
    ingredients: [{ name: "pasta", quantity: 1 }, { name: "tomate", quantity: 2 }, { name: "cebolla", quantity: 1 }, { name: "ajo", quantity: 1 }],
    instructions: ["Sofríe la cebolla y el ajo picados.", "Suma el tomate triturado y cocina por 20 minutos.", "Hierve la pasta y revuélvela directo en la salsa."]
  },
  {
    id: "alm_004",
    name: "Pollo al Horno con Papas",
    category: "almuerzo",
    image: "🍗",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "patata", quantity: 2 }, { name: "cebolla", quantity: 1 }],
    instructions: ["Acomoda las piezas de pollo en una asadera aceitada.", "Suma las patatas en gajos y cebolla cortada.", "Hornea a fuego fuerte durante 45 minutos."]
  },
  {
    id: "alm_005",
    name: "Bife a la Plancha con Ajo",
    category: "almuerzo",
    image: "🥩",
    ingredients: [{ name: "carne", quantity: 1 }, { name: "ajo", quantity: 1 }],
    instructions: ["Calienta una plancha hasta que humee.", "Cocina el bife sin moverlo por 5 minutos.", "Da vuelta, sala y añade el ajo picado encima."]
  },
  {
    id: "alm_006",
    name: "Supremas de Pollo Napolitanas",
    category: "almuerzo",
    image: "🐔",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "pan rallado", quantity: 1 }, { name: "tomate", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Prepara milanesas de pollo de forma tradicional.", "Coloca encima una cucharada de salsa de tomate y queso.", "Lleva al horno fuerte hasta gratinar."]
  },
  {
    id: "alm_007",
    name: "Ñoquis de Papa Caseros",
    category: "almuerzo",
    image: "🥔",
    ingredients: [{ name: "patata", quantity: 3 }, { name: "harina", quantity: 1 }, { name: "huevo", quantity: 1 }],
    instructions: ["Haz un puré seco con las patatas y déjalo enfriar.", "Une con el huevo y la harina.", "Corta los ñoquis en dados y hiérvelos hasta que floten."]
  },
  {
    id: "alm_008",
    name: "Arroz con Pollo Campestre",
    category: "almuerzo",
    image: "🍚",
    ingredients: [{ name: "arroz", quantity: 1 }, { name: "pollo", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "zanahoria", quantity: 1 }],
    instructions: ["Dora trozos de pollo en una olla profunda con aceite.", "Agrega la cebolla y la zanahoria picadas.", "Suma el arroz, cubre con agua o caldo y cocina tapado."]
  },
  {
    id: "alm_009",
    name: "Tarta de Jamon y Queso",
    category: "almuerzo",
    image: "🥧",
    ingredients: [{ name: "masa de empanadas", quantity: 2 }, { name: "jamon", quantity: 2 }, { name: "queso", quantity: 2 }, { name: "huevo", quantity: 2 }],
    instructions: ["Forra una tartera con una masa.", "Coloca fetas de jamón, queso y los huevos batidos.", "Tapa con la otra masa y hornea por 25 minutos."]
  },
  {
    id: "alm_010",
    name: "Tortilla de Papas Tradicional",
    category: "almuerzo",
    image: "🍳",
    ingredients: [{ name: "patata", quantity: 3 }, { name: "huevo", quantity: 4 }, { name: "cebolla", quantity: 1 }],
    instructions: ["Fríe las patatas y cebollas en cubos hasta que estén tiernas.", "Mezcla con los huevos batidos en un bol.", "Cocina en sartén caliente dando la vuelta con un plato."]
  },
  {
    id: "alm_011",
    name: "Pollo Rehogado al Verdeo",
    category: "almuerzo",
    image: "🥘",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Corta el pollo en cubos y dóralo en una sartén.", "Suma la cebolla picada fina.", "Agrega un chorro de leche y deja reducir la salsa."]
  },
  {
    id: "alm_012",
    name: "Ensalada Completa de Pollo",
    category: "almuerzo",
    image: "🥗",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "queso", quantity: 1 }, { name: "pan", quantity: 1 }],
    instructions: ["Cocina el pollo a la plancha y córtalo en tiras.", "Tuesta cubos de pan en la sartén.", "Mezcla el pollo, los pancitos y el queso en un plato."]
  },
  {
    id: "alm_013",
    name: "Guiso de Arroz Familiar",
    category: "almuerzo",
    image: "🍲",
    ingredients: [{ name: "arroz", quantity: 1 }, { name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "tomate", quantity: 1 }],
    instructions: ["Dora la cebolla y la carne picada en una olla.", "Agrega el tomate triturado y una taza de agua.", "Suma el arroz y cocina a fuego lento hasta que esté tierno."]
  },
  {
    id: "alm_014",
    name: "Canelones de Carne Rapidos",
    category: "almuerzo",
    image: "🥖",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "carne picada", quantity: 1 }, { name: "tomate", quantity: 1 }],
    instructions: ["Haz panqueques de harina y leche.", "Rellénalos con carne picada previamente cocida.", "Coloca en fuente, cubre con puré de tomate y hornea."]
  },
  {
    id: "alm_015",
    name: "Zapallitos Rellenos con Queso",
    category: "almuerzo",
    image: "🍈",
    ingredients: [{ name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Ahueca los zapallitos hirviéndolos 5 minutos.", "Mezcla la pulpa con carne cocida y cebolla.", "Rellena, coloca una feta de queso arriba y gratina."]
  },
  {
    id: "alm_016",
    name: "Carne Asada con Zanahoria",
    category: "almuerzo",
    image: "🥩",
    ingredients: [{ name: "carne", quantity: 1 }, { name: "zanahoria", quantity: 2 }, { name: "cebolla", quantity: 1 }],
    instructions: ["Coloca la carne en una asadera.", "Rodea con rodajas de zanahoria y cebolla.", "Cocina al horno medio durante 1 hora."]
  },
  {
    id: "alm_017",
    name: "Sandwich de Milanesa de Cancha",
    category: "almuerzo",
    image: "🥖",
    ingredients: [{ name: "carne", quantity: 1 }, { name: "pan", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "tomate", quantity: 1 }],
    instructions: ["Prepara una milanesa frita tradicional.", "Abre el pan francés y unta a gusto.", "Arma con la milanesa, rodajas de tomate y huevo frito."]
  },
  {
    id: "alm_018",
    name: "Pastel de Pollo Clasico",
    category: "almuerzo",
    image: "🥧",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "patata", quantity: 3 }, { name: "cebolla", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Desmenuza pollo cocido y saltéalo con cebolla.", "Haz un puré de patatas clásico.", "Coloca el pollo abajo en una fuente, cubre con puré y queso, y hornea."]
  },
  {
    id: "alm_019",
    name: "Hamburguesas Caseras de Carne",
    category: "almuerzo",
    image: "🍔",
    ingredients: [{ name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "ajo", quantity: 1 }],
    instructions: ["Mezcla la carne con cebolla y ajo picados muy finos.", "Dale forma de hamburguesa compactando con las manos.", "Cocina a la plancha 4 minutos por lado."]
  },
  {
    id: "alm_020",
    name: "Ensalada Rusa con Huevo",
    category: "almuerzo",
    image: "🥗",
    ingredients: [{ name: "patata", quantity: 2 }, { name: "zanahoria", quantity: 2 }, { name: "huevo", quantity: 2 }],
    instructions: ["Hierve las patatas y zanahorias cortadas en cubos.", "Mezcla en frío con el huevo duro picado.", "Suma mayonesa a gusto y revuelve despacio."]
  },
  // ==========================================
  // MERIENDA (20 Recetas)
  // ==========================================
  {
    id: "mer_001",
    name: "Alfajores de Maicena Caseros",
    category: "merienda",
    image: "🍩",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "dulce de leche", quantity: 1 }, { name: "huevo", quantity: 1 }],
    instructions: ["Mezcla harina, azúcar, un huevo y forma una masa suave.", "Corta tapitas redondas y hornea 8 minutos.", "Une de a dos con abundante dulce de leche."]
  },
  {
    id: "mer_002",
    name: "Tarta de Manzana Dulce",
    category: "merienda",
    image: "🍎",
    ingredients: [{ name: "manzana", quantity: 3 }, { name: "harina", quantity: 2 }, { name: "manteca", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Crea una base arenosa uniendo harina y manteca.", "Cubre con láminas de manzana y azúcar.", "Hornea a 180°C por 35 minutos."]
  },
  {
    id: "mer_003",
    name: "Budin de Limon de la Tarde",
    category: "merienda",
    image: "🥮",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 2 }, { name: "leche", quantity: 1 }],
    instructions: ["Bate los huevos con azúcar y ralladura de limón.", "Agrega la harina intercalando con la leche.", "Vierte en budinera y hornea por 40 minutos."]
  },
  {
    id: "mer_004",
    name: "Galletitas Secas de Avena",
    category: "merienda",
    image: "🍪",
    ingredients: [{ name: "avena", quantity: 2 }, { name: "azúcar", quantity: 1 }, { name: "huevo", quantity: 1 }],
    instructions: ["Integra todos los ingredientes en un bol.", "Forma bolitas y aplástalas en una placa para horno.", "Hornea a 180°C durante 12 minutos."]
  },
  {
    id: "mer_005",
    name: "Bizcochuelo Esponjoso Casero",
    category: "merienda",
    image: "🎂",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "azúcar", quantity: 2 }, { name: "huevo", quantity: 4 }],
    instructions: ["Bate los huevos con azúcar hasta que queden muy espumosos.", "Incorpora la harina tamizada de forma envolvente.", "Hornea a fuego medio por 45 minutos."]
  },
  {
    id: "mer_006",
    name: "Tostadas Criollas con Dulce",
    category: "merienda",
    image: "🍞",
    ingredients: [{ name: "pan", quantity: 3 }, { name: "dulce de leche", quantity: 1 }, { name: "manteca", quantity: 1 }],
    instructions: ["Tuesta las rodajas de pan en sartén.", "Unta con manteca blanda.", "Agrega una cucharada generosa de dulce de leche."]
  },
  {
    id: "mer_007",
    name: "Mantecaditas de Azucar",
    category: "merienda",
    image: "🧁",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "manteca", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Mezcla la harina con el azúcar.", "Une amasando con la manteca a temperatura ambiente.", "Corta cuadraditos y llévalos al horno por 15 minutos."]
  },
  {
    id: "mer_008",
    name: "Pasta Frola de Dulce de Leche",
    category: "merienda",
    image: "🥧",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "dulce de leche", quantity: 2 }, { name: "huevo", quantity: 1 }],
    instructions: ["Haz una masa base con harina, huevo y agua.", "Estira sobre un molde reservando tiritas.", "Rellena con dulce de leche, haz el enrejado y hornea."]
  },
  {
    id: "mer_009",
    name: "Crepes Caramelizados",
    category: "merienda",
    image: "🥞",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Cocina los crepes finos en la sartén.", "Espolvorea azúcar en el centro de cada uno.", "Dóblalos y vuelve a pasarlos por la sartén caliente."]
  },
  {
    id: "mer_010",
    name: "Muffins Caseros de Banana",
    category: "merienda",
    image: "🧁",
    ingredients: [{ name: "banana", quantity: 2 }, { name: "harina", quantity: 1 }, { name: "huevo", quantity: 1 }],
    instructions: ["Pisa las bananas hasta hacerlas puré.", "Bate junto al huevo y la harina.", "Vierte en moldes individuales y hornea 18 minutos."]
  },
  {
    id: "mer_011",
    name: "Facturitas de Pan Dulces",
    category: "merienda",
    image: "🥐",
    ingredients: [{ name: "pan", quantity: 4 }, { name: "azúcar", quantity: 2 }, { name: "manteca", quantity: 1 }],
    instructions: ["Usa rodajas de pan lactal recortadas en triángulos.", "Enrolla dándole forma de medialuna.", "Pinta con manteca, espolvorea azúcar y hornea fuerte."]
  },
  {
    id: "mer_012",
    name: "Tarta Dulce de Queso",
    category: "merienda",
    image: "🥧",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "queso", quantity: 2 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Prepara una masa dulce con harina, azúcar y agua.", "Mezcla el queso crema con azúcar.", "Rellena la base y cocínala al horno medio por 30 minutos."]
  },
  {
    id: "mer_013",
    name: "Chipacitos Rapidos de Queso",
    category: "merienda",
    image: "🥯",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "queso", quantity: 2 }, { name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Mezcla la harina con abundante queso rallado.", "Suma el huevo y une con un chorrito de leche.", "Arma bollitos pequeños y hornea a fuego máximo 12 minutos."]
  },
  {
    id: "mer_014",
    name: "Cubanitos Simulados de Masa",
    category: "merienda",
    image: "🥖",
    ingredients: [{ name: "harina", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "dulce de leche", quantity: 1 }],
    instructions: ["Cocina obleas muy finas en una sartén.", "Enróllalas calientes alrededor de un mango para dar forma.", "Rellena el centro frío con dulce de leche."]
  },
  {
    id: "mer_015",
    name: "Base de Pan con Dulce",
    category: "merienda",
    image: "🍰",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "manteca", quantity: 1 }, { name: "dulce de leche", quantity: 2 }],
    instructions: ["Tritura el pan tostado viejo y mézclalo con manteca derretida.", "Presiona en la base de un molde y enfría.", "Rellena la superficie con dulce de leche."]
  },
  {
    id: "mer_016",
    name: "Palmeritas de Masa de Empanada",
    category: "merienda",
    image: "🥿",
    ingredients: [{ name: "masa de empanadas", quantity: 2 }, { name: "azúcar", quantity: 2 }, { name: "manteca", quantity: 1 }],
    instructions: ["Pinta los discos de empanada con manteca and azúcar.", "Enrolla los dos extremos hacia el centro.", "Corta rodajitas y hornea en placa a fuego fuerte."]
  },
  {
    id: "mer_017",
    name: "Budin Batido de Manzana",
    category: "merienda",
    image: "🍞",
    ingredients: [{ name: "manzana", quantity: 2 }, { name: "harina", quantity: 2 }, { name: "huevo", quantity: 2 }, { name: "azúcar", quantity: 1 }],
    instructions: ["Pica las manzanas y bátelas con los huevos y azúcar.", "Integra la harina poco a poco.", "Lleva a un molde de budín por 35 minutos al horno."]
  },
  {
    id: "mer_018",
    name: "Trufas de Dulce de Leche Express",
    category: "merienda",
    image: "🍡",
    ingredients: [{ name: "pan", quantity: 2 }, { name: "dulce de leche", quantity: 2 }],
    instructions: ["Desmenuza completamente restos de pan o bizcochuelo seco.", "Mezcla con dulce de leche hasta formar una pasta.", "Haz bolitas y pásalas por un poco de azúcar."]
  },
  {
    id: "mer_019",
    name: "Tortas Fritas de la Tarde",
    category: "merienda",
    image: "🥯",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "manteca", quantity: 1 }, { name: "agua", quantity: 1 }],
    instructions: ["Une la harina, la manteca derretida, sal y agua tibia.", "Estira bollos finos con un tajo en el centro.", "Fríe en aceite abundante bien caliente."]
  },
  {
    id: "mer_020",
    name: "Flan de Taza en Microondas",
    category: "merienda",
    image: "🍮",
    ingredients: [{ name: "huevo", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "azúcar", quantity: 2 }],
    instructions: ["Mezcla el huevo, la leche y azúcar en una taza.", "Cocina en el microondas a potencia media por 2 minutos.", "Deja enfriar en la heladera antes de consumir."]
  },
  // ==========================================
  // CENA (20 Recetas)
  // ==========================================
  {
    id: "cen_001",
    name: "Pastel de Papa Tradicional",
    category: "cena",
    image: "🥧",
    ingredients: [{ name: "patata", quantity: 4 }, { name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Prepara un puré de patatas firme.", "Cocina la carne picada con cebolla y condimentos.", "Arma capas de carne y puré; gratina al horno con queso."]
  },
  {
    id: "cen_002",
    name: "Arroz Saltado con Huevo",
    category: "cena",
    image: "🍚",
    ingredients: [{ name: "arroz", quantity: 2 }, { name: "huevo", quantity: 2 }, { name: "cebolla", quantity: 1 }],
    instructions: ["Usa arroz blanco cocido que esté frío.", "Saltea la cebolla en una sartén caliente.", "Agrega el arroz, rompe los huevos en el centro y mezcla."]
  },
  {
    id: "cen_003",
    name: "Sopa de Pollo y Fideos Calentita",
    category: "cena",
    image: "🍲",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "pasta", quantity: 1 }, { name: "zanahoria", quantity: 1 }, { name: "cebolla", quantity: 1 }],
    instructions: ["Hierve el pollo con cebolla y zanahoria por 30 minutos.", "Retira el pollo, desmenúzalo y vuelve a meterlo.", "Suma los fideos cortos y cocina 8 minutos."]
  },
  {
    id: "cen_004",
    name: "Pollo Caramelizado Express",
    category: "cena",
    image: "🍗",
    ingredients: [{ name: "pollo", quantity: 2 }, { name: "azúcar", quantity: 2 }, { name: "ajo", quantity: 1 }],
    instructions: ["Dora cubos de pollo con el ajo picado en una sartén.", "Espolvorea el azúcar para caramelizar a fuego lento.", "Cocina moviendo la sartén hasta que espese."]
  },
  {
    id: "cen_005",
    name: "Pizza Casera de Molde Rapida",
    category: "cena",
    image: "🍕",
    ingredients: [{ name: "harina", quantity: 2 }, { name: "tomate", quantity: 1 }, { name: "queso", quantity: 2 }],
    instructions: ["Mezcla harina, agua y sal formando una masa elástica.", "Estírala en una asadera aceitada.", "Agrega tomate triturado, queso arriba y lleva al horno."]
  },
  {
    id: "cen_006",
    name: "Pollo Frito con Zanahoria",
    category: "cena",
    image: "🐔",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "zanahoria", quantity: 2 }],
    instructions: ["Cocina trozos de pollo a la plancha o sartén.", "Corta las zanahorias en bastones y hiérvelas.", "Sirve el pollo sazonado junto con los vegetales."]
  },
  {
    id: "cen_007",
    name: "Croquetas de Arroz al Horno",
    category: "cena",
    image: "🧆",
    ingredients: [{ name: "arroz", quantity: 2 }, { name: "huevo", quantity: 1 }, { name: "queso", quantity: 1 }, { name: "pan rallado", quantity: 1 }],
    instructions: ["Mezcla el arroz cocido con un huevo batido.", "Forma esferas colocando un cubo de queso en el centro.", "Pásalas por pan rallado y cocínalas al horno."]
  },
  {
    id: "cen_008",
    name: "Fideos Simples al Ajo",
    category: "cena",
    image: "🍝",
    ingredients: [{ name: "pasta", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "ajo", quantity: 2 }],
    instructions: ["Hierve los fideos en agua con sal.", "En una sartén saltea los ajos cortados finos.", "Suma un chorrito de leche, reduce e incorpora los fideos."]
  },
  {
    id: "cen_009",
    name: "Papas al Horno Doradas",
    category: "cena",
    image: "🥔",
    ingredients: [{ name: "patata", quantity: 4 }],
    instructions: ["Corta las patatas en cubos.", "Sazónanas con sal y aceite en un bol.", "Cocina en una asadera caliente a 220°C hasta que estén crocantes."]
  },
  {
    id: "cen_010",
    name: "Tortilla Rapida de Cebolla",
    category: "cena",
    image: "🍳",
    ingredients: [{ name: "cebolla", quantity: 3 }, { name: "huevo", quantity: 3 }],
    instructions: ["Corta las cebollas y dóralas bien en una sartén.", "Bate los huevos y mézclalos con la cebolla escurrida.", "Vuelve a la sartén y cocina de ambos lados."]
  },
  {
    id: "cen_011",
    name: "Carne Picada con Arroz Blanco",
    category: "cena",
    image: "🍚",
    ingredients: [{ name: "carne picada", quantity: 1 }, { name: "cebolla", quantity: 1 }, { name: "arroz", quantity: 1 }],
    instructions: ["Cocina la cebolla y la carne picada sazonando bien.", "Hierve el arroz blanco en otra olla.", "Sirve el arroz de base con la carne por encima."]
  },
  {
    id: "cen_012",
    name: "Sopa Puré de Zanahorias",
    category: "cena",
    image: "🥣",
    ingredients: [{ name: "zanahoria", quantity: 2 }, { name: "patata", quantity: 1 }, { name: "leche", quantity: 1 }],
    instructions: ["Hierve las zanahorias y la patata en cubos.", "Písalas con fuerza sumando el agua de cocción.", "Añade un chorro de leche para dar cremosidad."]
  },
  {
    id: "cen_013",
    name: "Bocaditos de Pollo Crujientes",
    category: "cena",
    image: "🍗",
    ingredients: [{ name: "pollo", quantity: 1 }, { name: "huevo", quantity: 1 }, { name: "pan rallado", quantity: 1 }],
    instructions: ["Corta la pechuga de pollo en dados pequeños.", "Pásalos por huevo batido y empánalos.", "Cocina al horno fuerte en placa aceitada por 12 minutos."]
  },
  {
    id: "cen_014",
    name: "Revuelto Gramajo Express",
    category: "cena",
    image: "🍳",
    ingredients: [{ name: "patata", quantity: 2 }, { name: "huevo", quantity: 2 }, { name: "jamon", quantity: 1 }],
    instructions: ["Corta patatas en hilos finos y fríelas.", "Corta el jamón en tiritas.", "Mezcla patatas, jamón y huevos en sartén un minuto hasta cuajar."]
  },
  {
    id: "cen_015",
    name: "Queso a la Plancha Dorado",
    category: "cena",
    image: "🧀",
    ingredients: [{ name: "queso", quantity: 2 }, { name: "huevo", quantity: 1 }, { name: "pan rallado", quantity: 1 }],
    instructions: ["Usa rodajas gruesas de queso firme.", "Pásalas doble vez por huevo y pan rallado cuidando los bordes.", "Cocina en sartén ardiente 1 minuto por lado."]
  },
  {
    id: "cen_016",
    name: "Fideos Cortos con Pollo",
    category: "cena",
    image: "🍝",
    ingredients: [{ name: "pasta", quantity: 1 }, { name: "pollo", quantity: 1 }, { name: "tomate", quantity: 1 }],
    instructions: ["Hierve fideos cortos de cualquier tipo.", "Suma tiras de pollo hechas a la plancha.", "Mezcla todo caliente junto con cubos de tomate."]
  },
  {
    id: "cen_017",
    name: "Papas Aplastadas con Queso",
    category: "cena",
    image: "🥔",
    ingredients: [{ name: "patata", quantity: 3 }, { name: "queso", quantity: 1 }],
    instructions: ["Hierve las patatas con piel hasta que estén tiernas.", "Colócalas en placa y aplástalas con una cuchara.", "Ponles queso encima y llévalas al horno a derretir."]
  },
  {
    id: "cen_018",
    name: "Pizzitas de Pan Lactal",
    category: "cena",
    image: "🍕",
    ingredients: [{ name: "pan", quantity: 4 }, { name: "tomate", quantity: 1 }, { name: "queso", quantity: 2 }],
    instructions: ["Coloca rodajas de pan en una placa.", "Distribuye encima puré de tomates condimentado.", "Cubre con queso y hornea 5 minutos hasta derretir."]
  },
  {
    id: "cen_019",
    name: "Omelette de Carne Picada",
    category: "cena",
    image: "🍳",
    ingredients: [{ name: "huevo", quantity: 2 }, { name: "carne picada", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Cocina previamente la carne picada sazonada.", "Prepara el disco del omelette tradicional en la sartén.", "Rellena el centro con la carne y el queso antes de doblar."]
  },
  {
    id: "cen_020",
    name: "Arroz con Leche y Queso Salado",
    category: "cena",
    image: "🍚",
    ingredients: [{ name: "arroz", quantity: 1 }, { name: "leche", quantity: 1 }, { name: "queso", quantity: 1 }],
    instructions: ["Hierve el arroz en agua reducida.", "Faltando dos minutos agrega un vaso de leche.", "Apaga el fuego, incorpora el queso y revuelve enérgicamente."]
  }
];
