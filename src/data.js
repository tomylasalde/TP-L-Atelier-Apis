
// Ya no se usa, se uso para la primer entrega antes del backend

export const menu = [
  { id: 'entrantes', title: 'Entrantes', items: [
    { id: 1, name: 'Empanadas de carne', description: 'Empanadas de carne con cebolla y especias', ingredients: ['Carne vacuna','Cebolla','Pimentón'], allergens: ['Gluten'], price: 5500, image:'https://hips.hearstapps.com/hmg-prod/images/empanadillas-rellenas-carne-elle-gourmet-2-65bb921087cad.jpg?resize=980:*' },
    { id: 2, name: 'Provoleta gourmet', description: 'Provoleta fundida con orégano y aceite de oliva', ingredients: ['Queso provolone','Orégano','Aceite de oliva'], allergens: ['Lácteos'], price: 7800, image:'https://www.clarin.com/2022/08/31/SvRumKBuh_2000x1500__1.jpg' },
    { id: 3, name: 'Bruschetta clásica', description: 'Pan tostado con tomate, ajo y albahaca', ingredients: ['Pan','Tomate','Ajo','Albahaca'], allergens: ['Gluten'], price: 4800, image: 'https://www.demoslavueltaaldia.com/sites/default/files/bruschetta-clasica.jpg.jpg' },
    { id: 4, name: 'Ceviche peruano', description: 'Pescado marinado en limón, cebolla y cilantro', ingredients: ['Pescado','Limón','Cebolla','Cilantro'], allergens: ['Pescado'], price: 9200, image: 'https://i0.wp.com/lacocinalatina.club/wp-content/uploads/2024/05/Ceviche-Peruano-de-pescado-La-Cocina-Latina.jpg?fit=700%2C467&ssl=1' }
  ]},
  {
    id: 'ensaladas',
    title: 'Ensaladas',
    items: [
      { id: 1, name: 'Ensalada Mixta', description: 'Lechuga, tomate, cebolla y huevo duro,', ingredients: ['Lechuga','Tomate','Cebolla','Huevo'], allergens: ['Huevos'], price: 16500, image: 'https://assets.unileversolutions.com/recipes-v2/243135.jpg'},
      { id: 2, name: 'Ensalada Caprese', description: 'Tomate, mozzarella y albahaca con reducción de balsámico', ingredients: ['Tomate','Mozzarella','Albahaca'], allergens: ['Lácteos'], price: 18200, image: 'https://www.paulinacocina.net/wp-content/uploads/2024/07/ensalada-caprese-italiana-800x534-1200x900.jpg'},
      { id: 3, name: 'Ensalada de quinoa', description: 'Quinoa, rúcula, zanahoria rallada y semillas', ingredients: ['Quinoa','Rúcula','Zanahoria','Semillas'], allergens: [], price: 19800, image: 'https://d36fw6y2wq3bat.cloudfront.net/recipes/ensalada-de-quinua-y-pollo/900/ensalada-de-quinua-y-pollo.jpg' }
    ]
  },
  {
    id: 'carnes-rojas',
    title: 'Carnes Rojas',
    items: [
      { id: 1, name: 'Asado de tira', description: 'Costillas de vaca a la parrilla al estilo argentino', ingredients: ['Costilla vacuna','Sal gruesa'], allergens: [], price: 28900, image: 'https://images.aws.nestle.recipes/original/7c90881a7a491ce719ae11c2f454278b_asado_de_tira_pure_rustico.jpg' },
      { id: 2, name: 'Bife de chorizo', description: 'Jugoso bife de chorizo con chimichurri', ingredients: ['Carne vacuna','Chimichurri'], allergens: [], price: 31200, image: 'https://comedera.com/wp-content/uploads/sites/9/2022/06/bife-de-chorizo.jpg?w=500&h=500&crop=1' },
      { id: 3, name: 'Filet mignon', description: 'Filete de lomo premium con salsa de vino tinto', ingredients: ['Lomo vacuna','Vino tinto'], allergens: [], price: 35600, image: 'https://wp-cdn.typhur.com/wp-content/uploads/2023/06/2b252f31bb184c3fb4168ab7947178a7.jpg' }
    ]
  },
  {
    id: 'carnes-blancas',
    title: 'Carnes Blancas',
    items: [
      { id: 1, name: 'Pollo al horno con limón', description: 'Pechuga de pollo marinada en limón y hierbas', ingredients: ['Pollo','Limón','Romero'], allergens: [], price: 24300, image: 'https://i.blogs.es/883f02/pollo_limon_rec/1366_2000.jpg' },
      { id: 2, name: 'Magret de pato', description: 'Pato a la plancha con salsa de frutos rojos', ingredients: ['Pato','Frutos rojos','Miel'], allergens: [], price: 27150, image: 'https://i.blogs.es/efc41d/magret/1366_2000.jpg' }
    ]
  },
  {
    id: 'pescados',
    title: 'Pescados',
    items: [
      { id: 1, name: 'Trucha a la manteca negra', description: 'Trucha salmonada con manteca negra y almendras', ingredients: ['Trucha','Mantequilla','Almendras'], allergens: ['Pescado','Frutos secos','Lácteos'], price: 37120, image: 'https://img-global.cpcdn.com/recipes/recipes_16469_v1393347038_receta_foto_00016469/400x400cq70/photo.jpg' },
      { id: 2, name: 'Ossobuco de merluza', description: 'Merluza cocida en salsa de tomate y vino blanco', ingredients: ['Merluza','Tomate','Vino blanco'], allergens: ['Pescado'], price: 31200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPj41J5JEBNDFYLgFq_MlYuLXHoeWb2SpbhQ&s' }
    ]
  },
  {
    id: 'pastas',
    title: 'Pastas',
    items: [
      { id: 1, name: 'Ravioles de calabaza', description: 'Ravioles caseros rellenos de calabaza y ricotta', ingredients: ['Harina','Calabaza','Ricotta'], allergens: ['Gluten','Lácteos'], price: 25800, image: 'https://okdiario.com/img/2018/02/28/raviolis-calabaza-1.jpg' },
      { id: 2, name: 'Fettuccine al funghi', description: 'Pasta con crema de champiñones y parmesano', ingredients: ['Pasta','Champiñones','Crema','Parmesano'], allergens: ['Gluten','Lácteos'], price: 22100, image: 'https://exauoliveoil.com/cdn/shop/articles/20220729172737-12.jpg?v=1676814330' }
    ]
  },
  {
    id: 'postres',
    title: 'Postres',
    items: [
      { id: 1, name: 'Panqueque de dulce de leche', description: 'Panqueque argentino relleno de dulce de leche', ingredients: ['Harina','Huevos','Dulce de leche'], allergens: ['Gluten','Huevos'], price: 9900, image: 'https://www.clarin.com/img/2023/04/20/FH-fEx20c_1256x620__2.jpg' },
      { id: 2, name: 'Flan casero', description: 'Flan de huevo con crema y dulce de leche', ingredients: ['Leche','Huevos','Dulce de leche'], allergens: ['Lácteos','Huevos'], price: 10100, image: 'https://www.lolitalapastelera.com/wp-content/uploads/Galeria-2-122-768x1152.jpg' }
    ]
  },
  {
    id: 'bebidas-alcoholicas',
    title: 'Bebidas Alcohólicas',
    items: [
      { id: 1, name: 'Malbec argentino', description: 'Copa de Malbec de Mendoza', ingredients: [], allergens: [], price: 7500, image: 'https://http2.mlstatic.com/D_NQ_NP_861320-MLA80976471692_122024-O.webp' },
      { id: 2, name: 'Caipirinha', description: 'Cóctel brasileño de cachaça, lima y azúcar', ingredients: ['Cachaça','Lima','Azúcar'], allergens: [], price: 8600, image: 'https://laopinionaustral.com.ar/media/uploads/2023/08/caipirina.webp' }
    ]
  },
  {
    id: 'bebidas-sin-alcohol',
    title: 'Bebidas Sin Alcohol',
    items: [
      { id: 1, name: 'Limonada casera', description: 'Limonada con hierbabuena fresca', ingredients: ['Limón','Azúcar','Hierbabuena'], allergens: [], price: 3100, image:'https://www.novachef.es/images/recetas/limonada-casera/limonada-casera.jpg' },
      { id: 2, name: 'Agua mineral', description: 'Botella de agua mineral', ingredients: [], allergens: [], price: 3000, image: 'https://img.freepik.com/fotos-premium/cerca-vaso-agua-mineral_127657-17236.jpg' }
    ]
  }
];
