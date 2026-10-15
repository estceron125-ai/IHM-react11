import { useEffect, useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenProfile: () => void;
  onOpenCart: () => void;
}

export const Header = ({ cartCount, onOpenProfile, onOpenCart }: HeaderProps) => {
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    if (cartCount === 0) return;
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 200);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="logo">
          <a href="#inicio" aria-label="Ir a la página de inicio de CampiLeche">
            <img className="brand-logo" src="imagenes/logocampileche.jpeg" alt="CampiLeche" />
          </a>
        </div>
        <nav className="nav-menu" aria-label="Menú principal">
          <ul>
            <li><a href="#inicio" className="nav-link">Inicio</a></li>
            <li><a href="#productos" className="nav-link">Productos</a></li>
            <li><a href="#promociones" className="nav-link">Promociones</a></li>
            <li><a href="#nosotros" className="nav-link">Nosotros</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <button
            type="button"
            className="action-link"
            id="profile-button"
            aria-label="Acceder a mi perfil"
            onClick={onOpenProfile}
          >
            <i className="fa-solid fa-circle-user"></i>
            <span>Perfil</span>
          </button>
          <button
            type="button"
            className="action-link cart-link"
            id="cart-button"
            aria-label="Ver carrito"
            onClick={onOpenCart}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span
              id="cart-count"
              className="cart-badge"
              style={{
                transform: isBumping ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
