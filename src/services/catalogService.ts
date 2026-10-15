import type { ApiProduct, Product } from '../types/index';

const CATALOG_API_URL = 'https://fakestoreapi.com/products?limit=6';

/**
 * Obtiene referencias públicas para enriquecer el catálogo propio de CampiLeche.
 * Los nombres, precios e imágenes del negocio siempre se conservan localmente.
 */
export const getCatalogReferences = async (signal?: AbortSignal): Promise<ApiProduct[]> => {
  const response = await fetch(CATALOG_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`No fue posible consultar el catálogo externo (HTTP ${response.status}).`);
  }

  const products: unknown = await response.json();
  if (!Array.isArray(products) || products.length === 0 || !products.every(isApiProduct)) {
    throw new Error('El catálogo externo no devolvió referencias disponibles.');
  }

  return products;
};

const isApiProduct = (value: unknown): value is ApiProduct => {
  if (typeof value !== 'object' || value === null || !('id' in value) || typeof value.id !== 'number') {
    return false;
  }

  if (!('rating' in value) || value.rating === undefined) return true;
  const rating = value.rating;
  return (
    typeof rating === 'object' &&
    rating !== null &&
    (!('rate' in rating) || rating.rate === undefined || typeof rating.rate === 'number')
  );
};

export const attachCatalogReferences = (
  localProducts: Product[],
  apiProducts: ApiProduct[],
): Product[] =>
  localProducts.map((product, index) => {
    const reference = apiProducts[index % apiProducts.length];
    return {
      ...product,
      apiId: reference.id,
      apiRating: reference.rating?.rate,
      apiCategory: reference.category,
    };
  });
