export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  stock: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lámpara Moderna",
    category: "Luminarias",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 10,
    description: "Lámpara LED de diseño moderno, ideal para salas y dormitorios. Luz cálida y bajo consumo.",
  },
  {
    id: 2,
    name: "Tira LED RGB",
    category: "Tiras LED",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 25,
    description: "Tira LED multicolor con control remoto, perfecta para ambientar cualquier espacio.",
  },
  {
    id: 3,
    name: "Aplique Minimalista",
    category: "Luminarias",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 5,
    description: "Aplique de pared con acabado minimalista y luz cálida. Ideal para pasillos y recibidores.",
  },
  {
    id: 4,
    name: "Guirnalda Decorativa",
    category: "Accesorios",
    price: 15.99,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 30,
    description: "Guirnalda de luces LED para decoración de eventos y habitaciones.",
  },
  {
    id: 5,
    name: "Lámpara de Escritorio",
    category: "Luminarias",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 12,
    description: "Lámpara de escritorio con brazo flexible y luz regulable.",
  },
  {
    id: 6,
    name: "Tira LED Blanca",
    category: "Tiras LED",
    price: 17.99,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 18,
    description: "Tira LED de luz blanca, ideal para cocinas y baños.",
  },
  // Nuevos productos de prueba
  {
    id: 7,
    name: "Aro LED Profesional",
    category: "Aros LED",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 8,
    description: "Aro LED de alta potencia para fotografía y video. Incluye trípode y control remoto.",
  },
  {
    id: 8,
    name: "Luminaria Colgante Vintage",
    category: "Luminarias",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 6,
    description: "Luminaria colgante de estilo vintage, ideal para comedores y bares.",
  },
  {
    id: 9,
    name: "Set de Accesorios para Iluminación",
    category: "Accesorios",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 20,
    description: "Set de soportes, trípodes y adaptadores para equipos de iluminación.",
  },
  {
    id: 10,
    name: "Lámpara de Pie Escandinava",
    category: "Luminarias",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 7,
    description: "Lámpara de pie de estilo escandinavo, madera natural y pantalla textil blanca.",
  },
  {
    id: 11,
    name: "Tira LED Inteligente WiFi",
    category: "Tiras LED",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 15,
    description: "Tira LED controlable por app y voz, compatible con Alexa y Google Home.",
  },
  {
    id: 12,
    name: "Guirnalda Solar Exterior",
    category: "Accesorios",
    price: 22.99,
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 25,
    description: "Guirnalda LED para exteriores, funciona con energía solar y sensor crepuscular.",
  },
  {
    id: 13,
    name: "Aro LED Selfie con Trípode",
    category: "Aros LED",
    price: 32.99,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
    ],
    stock: 14,
    description: "Aro LED para selfies y videollamadas, incluye trípode ajustable y control de temperatura de color.",
  },
];
