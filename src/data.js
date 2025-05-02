export const menu = [
  { id: 'entrantes', title: 'Entrantes', items: [
    { id: 1, name: 'Empanadas de carne', description: 'Empanadas de carne con cebolla y especias', ingredients: ['Carne vacuna','Cebolla','Pimentón'], allergens: ['Gluten'], price: 5500 },
    { id: 2, name: 'Provoleta gourmet', description: 'Provoleta fundida con orégano y aceite de oliva', ingredients: ['Queso provolone','Orégano','Aceite de oliva'], allergens: ['Lácteos'], price: 7800 },
    { id: 3, name: 'Bruschetta clásica', description: 'Pan tostado con tomate, ajo y albahaca', ingredients: ['Pan','Tomate','Ajo','Albahaca'], allergens: ['Gluten'], price: 4800 },
    { id: 4, name: 'Ceviche peruano', description: 'Pescado marinado en limón, cebolla y cilantro', ingredients: ['Pescado','Limón','Cebolla','Cilantro'], allergens: ['Pescado'], price: 9200 }
  ]},
  {
    id: 'ensaladas',
    title: 'Ensaladas',
    items: [
      { id: 1, name: 'Ensalada Mixta', description: 'Lechuga, tomate, cebolla y huevo duro,', ingredients: ['Lechuga','Tomate','Cebolla','Huevo'], allergens: ['Huevos'], price: 16500},
      { id: 2, name: 'Ensalada Caprese', description: 'Tomate, mozzarella y albahaca con reducción de balsámico', ingredients: ['Tomate','Mozzarella','Albahaca'], allergens: ['Lácteos'], price: 18200},
      { id: 3, name: 'Ensalada de quinoa', description: 'Quinoa, rúcula, zanahoria rallada y semillas', ingredients: ['Quinoa','Rúcula','Zanahoria','Semillas'], allergens: [], price: 19800 }
    ]
  },
  {
    id: 'carnes-rojas',
    title: 'Carnes Rojas',
    items: [
      { id: 1, name: 'Asado de tira', description: 'Costillas de vaca a la parrilla al estilo argentino', ingredients: ['Costilla vacuna','Sal gruesa'], allergens: [], price: 28900 },
      { id: 2, name: 'Bife de chorizo', description: 'Jugoso bife de chorizo con chimichurri', ingredients: ['Carne vacuna','Chimichurri'], allergens: [], price: 31200 },
      { id: 3, name: 'Filet mignon', description: 'Filete de lomo premium con salsa de vino tinto', ingredients: ['Lomo vacuna','Vino tinto'], allergens: [], price: 35600 }
    ]
  },
  {
    id: 'carnes-blancas',
    title: 'Carnes Blancas',
    items: [
      { id: 1, name: 'Pollo al horno con limón', description: 'Pechuga de pollo marinada en limón y hierbas', ingredients: ['Pollo','Limón','Romero'], allergens: [], price: 24300 },
      { id: 2, name: 'Magret de pato', description: 'Pato a la plancha con salsa de frutos rojos', ingredients: ['Pato','Frutos rojos','Miel'], allergens: [], price: 27150 }
    ]
  },
  {
    id: 'pescados',
    title: 'Pescados',
    items: [
      { id: 1, name: 'Trucha a la manteca negra', description: 'Trucha salmonada con manteca negra y almendras', ingredients: ['Trucha','Mantequilla','Almendras'], allergens: ['Pescado','Frutos secos','Lácteos'], price: 37120 },
      { id: 2, name: 'Ossobuco de merluza', description: 'Merluza cocida en salsa de tomate y vino blanco', ingredients: ['Merluza','Tomate','Vino blanco'], allergens: ['Pescado'], price: 31200 }
    ]
  },
  {
    id: 'pastas',
    title: 'Pastas',
    items: [
      { id: 1, name: 'Ravioles de calabaza', description: 'Ravioles caseros rellenos de calabaza y ricotta', ingredients: ['Harina','Calabaza','Ricotta'], allergens: ['Gluten','Lácteos'], price: 25800 },
      { id: 2, name: 'Fettuccine al funghi', description: 'Pasta con crema de champiñones y parmesano', ingredients: ['Pasta','Champiñones','Crema','Parmesano'], allergens: ['Gluten','Lácteos'], price: 22100 }
    ]
  },
  {
    id: 'postres',
    title: 'Postres',
    items: [
      { id: 1, name: 'Panqueque de dulce de leche', description: 'Panqueque argentino relleno de dulce de leche', ingredients: ['Harina','Huevos','Dulce de leche'], allergens: ['Gluten','Huevos'], price: 9900 },
      { id: 2, name: 'Flan casero', description: 'Flan de huevo con crema y dulce de leche', ingredients: ['Leche','Huevos','Dulce de leche'], allergens: ['Lácteos','Huevos'], price: 10100 }
    ]
  },
  {
    id: 'bebidas-alcoholicas',
    title: 'Bebidas Alcohólicas',
    items: [
      { id: 1, name: 'Malbec argentino', description: 'Copa de Malbec de Mendoza', ingredients: [], allergens: [], price: 7500 },
      { id: 2, name: 'Caipirinha', description: 'Cóctel brasileño de cachaça, lima y azúcar', ingredients: ['Cachaça','Lima','Azúcar'], allergens: [], price: 8600 }
    ]
  },
  {
    id: 'bebidas-sin-alcohol',
    title: 'Bebidas Sin Alcohol',
    items: [
      { id: 1, name: 'Limonada casera', description: 'Limonada con hierbabuena fresca', ingredients: ['Limón','Azúcar','Hierbabuena'], allergens: [], price: 3100 },
      { id: 2, name: 'Agua mineral', description: 'Botella de agua mineral', ingredients: [], allergens: [], price: 3000 }
    ]
  }
];
