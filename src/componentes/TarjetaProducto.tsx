import type { Product } from '../types/index';

interface TarjetaProductoProps {
  producto: Product;
  onAddToCart: (producto: Product) => void;
}

export const formatearPrecio = (valor: number): string => {
  return `$${valor.toLocaleString('es-CO')}`;
};

export const TarjetaProducto = ({ producto, onAddToCart }: TarjetaProductoProps) => {
  return (
    <article className="tarjeta-api">
      <img src={producto.image} alt={`Imagen de ${producto.title}`} loading="lazy" />
      <h3>{producto.title}</h3>
      <p className="price">{formatearPrecio(producto.price)}</p>
      <p>{producto.description}</p>
      {producto.apiRating !== undefined && (
        <span className="api-detail">
          <i className="fa-solid fa-star"></i> {producto.apiRating}/5 · Ref. API #{producto.apiId}
        </span>
      )}
      <button
        className="btn-add-cart"
        type="button"
        aria-label={`Agregar ${producto.title} al carrito`}
        onClick={() => onAddToCart(producto)}
      >
        <i className="fa-solid fa-cart-plus"></i> Agregar al Carrito
      </button>
    </article>
  );
};
