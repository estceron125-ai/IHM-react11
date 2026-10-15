import React, { useEffect } from 'react';
import type { Product } from '../types/index';
import { formatearPrecio } from './TarjetaProducto';

interface CarritoModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  checkoutMessage: string;
}

export const CarritoModal = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
  checkoutMessage,
}: CarritoModalProps) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'is-open' : ''}`}
      id="cart-modal"
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
    >
      <section
        className="modal-card cart-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <button
          type="button"
          className="modal-close"
          data-close-modal
          aria-label="Cerrar carrito"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="cart-title">Tu carrito</h2>

        <div id="cart-items" className="cart-items">
          {cartItems.length === 0 ? (
            <p className="cart-empty">
              Tu carrito está vacío. Añade productos o el combo familiar.
            </p>
          ) : (
            cartItems.map((producto, index) => (
              <article key={`${producto.id}-${index}`} className="cart-item">
                <img src={producto.image} alt={producto.title} />
                <div>
                  <h3>{producto.title}</h3>
                  <p>{formatearPrecio(producto.price)}</p>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  aria-label={`Quitar ${producto.title}`}
                  onClick={() => onRemoveItem(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </article>
            ))
          )}
        </div>

        <div className="cart-summary">
          <span>Total</span>
          <strong id="cart-total">{formatearPrecio(total)}</strong>
        </div>

        <button
          type="button"
          className="btn-primary checkout-button"
          id="checkout-button"
          disabled={cartItems.length === 0}
          aria-disabled={cartItems.length === 0}
          onClick={onCheckout}
        >
          Finalizar compra
        </button>

        <p className="form-message" id="checkout-message" aria-live="polite">
          {checkoutMessage}
        </p>
      </section>
    </div>
  );
};
