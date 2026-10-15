import type { Product } from '../types/index';
import { TarjetaProducto } from './TarjetaProducto';
import styles from './Catalogo.module.css';

interface CatalogoProps {
  productos: Product[];
  isLoading: boolean;
  error: string;
  catalogSource: string;
  onViewAll: () => void;
  onAddToCart: (producto: Product) => void;
}

export const Catalogo = ({
  productos,
  isLoading,
  error,
  catalogSource,
  onViewAll,
  onAddToCart,
}: CatalogoProps) => {
  return (
    <section id="productos" className="products">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="title">Nuestra Selección</h2>
            <p className="subtitle">Calidad premium certificada en cada gota</p>
            <p className="catalog-source" id="catalog-source" aria-live="polite">
              {catalogSource}
            </p>
          </div>
          <button type="button" className="view-all" id="view-all" onClick={onViewAll}>
            Ver todo <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div id="contenedor-api" className="products-grid">
          {isLoading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Cosechando la frescura para ti...</p>
            </div>
          ) : productos.length === 0 ? (
            <p className="loading-state">No se encontraron productos en esta categoría.</p>
          ) : (
            <>
              {error && <p className={styles.errorNotice} role="status">{error}</p>}
              {productos.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  onAddToCart={onAddToCart}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
