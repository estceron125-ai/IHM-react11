export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <img className="brand-logo footer-logo" src="imagenes/logocampileche.jpeg" alt="CampiLeche" />
          </div>
          <p>
            Creciendo juntos, naturalmente. Preservando la esencia del campo nariñense en cada producto.
          </p>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="footer-nav">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#productos">Productos</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>
            <i className="fa-solid fa-location-dot"></i> Pasto, Nariño, Colombia
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +57 300 000 0000
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> info@campileche.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 CampiLeche. Diseñado para la excelencia en IHM.</p>
      </div>
    </footer>
  );
};
