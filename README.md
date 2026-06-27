# 🌸 Ecommerce Iris — Perfumería y Cosmética

**Iris** es una plataforma web moderna y responsiva orientada al comercio y catálogo de productos de cosmética, maquillaje y perfumería internacional. El proyecto fue desarrollado poniendo el foco en las interacciones fluidas, una arquitectura limpia y modular, y una interfaz de usuario atractiva adaptada a dispositivos móviles tablet y de escritorio.

🚀 **Despliegue en vivo:** [Ver proyecto en Vercel](https://tu-proyecto.vercel.app) *(Enlace provisorio)*


---

## 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando un stack moderno de desarrollo frontend para garantizar rendimiento, tipado seguro y estilos encapsulados:

* **React 18** — Librería base para la construcción de la interfaz basada en componentes.
* **TypeScript** — Tipado estático fuerte para prevenir errores en tiempo de desarrollo y asegurar contratos de datos limpios (Interfaces).
* **Vite** — Herramienta de empaquetado y entorno de desarrollo ultra rápido.
* **CSS Modules** — Estilos completamente encapsulados por componente, evitando colisiones de clases globales y garantizando un mantenimiento limpio.
* **React Router Dom** — Gestión de enrutamiento dinámico y parámetros de navegación para marcas y categorías.
* **React Hook Form** — Gestión eficiente, limpia y con validaciones nativas para el formulario de pasarela en la página de Checkout.
* **React Icons** — Set de iconografía dinámico y responsivo para mejorar las interacciones de usuario (navegación, carrito, búsquedas).
* **Swiper** — Librería táctil de alto rendimiento utilizada para la creación de carruseles de imágenes y sliders de productos, completamente adaptada a gestos mobile.

---

## 🔌 Origen de los Datos

La aplicación combina dos estrategias para la gestión y consumo de productos:

1.  **Consumo de API Externa:** Conexión directa con la **Makeup API** a través de servicios estructurados, encargados de realizar búsquedas asincrónicas en tiempo real filtradas por marcas populares (ej: *Maybelline, NYX, L'Oreal, Essie*).
2.  **Mock Data Interno:** Para la sección de perfumería exclusiva, se diseñó e integró un set de datos simulados en memoria (`perfumesMock.ts`). Esto permite modelar estructuras de productos complejos con tipado estático nativo de TypeScript sin depender de servicios de terceros.

---

## 📐 Arquitectura y Modularización

El proyecto sigue una estructura modular estricta orientada a la separación de responsabilidades:

```text
src/
├── assets/images/       # Banners del carrusel principal y logotipo institucional
├── components/          # Componentes modulares y reutilizables de la interfaz
│   ├── BrandPage/       # Componente de vista para marcas individuales
│   ├── BrandSelector/  # Selector estético de marcas con efectos interactivos
│   ├── Button/          # Botón global configurable por variantes (primary, link)
│   ├── Carousel/       # Componente wrapper de Swiper, modular y configurable mediante props (slidesPerView, loop, autoplay)
│   ├── CartDrawer/      # Panel lateral interactivo para la previsualización del carrito
│   ├── Footer/          # Pie de página institucional
│   ├── Header/          # Barra de navegación superior adaptativa con contador de productos
│   ├── ProductCard/     # Tarjeta individual de producto con control de estados
│   ├── ProductDetail/   # Vista extendida y detallada de un producto individual
│   ├── ProductGrid/     # Grilla puramente de presentación para las colecciones
│   ├── ProductGridContainer/ # Contenedor inteligente (Smart) con lógica de fetch, loading y errores
│   └── SearchFilter/    # Barra interactiva de filtrado y búsqueda de productos
├── context/             # Gestión de Estado Global de la Aplicación
│   └── CartContext.tsx  # Contexto de React para coordinar el carrito en toda la web
├── data/                # Mock data de perfumería internacional (perfumesMock.ts)
├── interfaces/          # Definición de Tipos y Modelos de datos de TypeScript (product.ts)
├── pages/               # Páginas/Vistas de enrutamiento principal de la aplicación
│   ├── Checkout/        # Formulario y pasarela de finalización de compra con React Hook Form
│   └── Home/            # Página principal integrada con carruseles, destacados y marcas
│       ├── CategoryPages.tsx # Control de renderizado dinámico por categorías
│       ├── Maquillaje.tsx    # Vista optimizada para la sección de maquillajes
│       ├── Perfumes.tsx      # Vista mapeada al mock data de perfumería
│       └── Unas.tsx          # Vista enfocada al catálogo de esmaltes y uñas
├── services/            # Abstracción de llamadas fetch a la API (makeupApi.ts)
├── App.tsx              # Orquestador de rutas globales de la aplicación
├── index.css            # Estilos y variables CSS globales
└── main.tsx             # Punto de entrada de la aplicación en el DOM
```

### 🔄 Reutilización de Componentes: El caso de Swiper
En lugar de acoplar la librería **Swiper** directamente en cada vista, se diseñó un componente wrapper genérico llamado `Carousel.tsx`. Este componente abstrae la configuración nativa de Swiper y expone una API limpia basada en `props` de TypeScript:

* Permite definir dinámicamente la cantidad de elementos visibles en **Mobile, Tablet y Desktop** de manera independiente (`slidesPerViewDesktop`, etc.).
* Controla de manera centralizada configuraciones de UX como el bucle infinito (`loop`), retrasos de reproducción automática (`autoPlayDelay`) y el desplazamiento por bloques (`slidesPerGroup`).

Gracias a esto, el mismo componente base maneja tanto el banner gigante de la `Home` como las filas de productos destacados en las distintas secciones.

## ⚡ Gracias por leer

Si llegaste hasta acá te agradezco por leer e interesarte en la composición de mi proyecto y te dejo el enlace a mi portfolio para que sigas explorando:

💼 [Andrea Guinder — Portfolio Profesional](https://andreaguinder.com)