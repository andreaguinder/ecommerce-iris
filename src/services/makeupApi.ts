import type { Product } from '../interfaces/product';

const BASE_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json';

export const makeupService = {

  getProducts: async (brand?: string): Promise<Product[]> => {
    try {
      // Si pasan marca, la agregamos como Query Parameter
      const url = brand ? `${BASE_URL}?brand=${brand}` : BASE_URL;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los productos de cosmética:", error);
      // Devolvemos un array vacío para que la app no rompa si falla la API
      return [];
    }
  }
};