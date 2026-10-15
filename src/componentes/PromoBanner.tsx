interface PromoBannerProps {
  onAddCombo: () => void;
}

export const PromoBanner = ({ onAddCombo }: PromoBannerProps) => {
  return (
    <section id="promociones" className="promo-banner">
      <div className="container promo-container">
        <div className="promo-text">
          <span className="promo-label">Oferta Especial</span>
          <h2>
            Combo Familiar <br />
            <span>Tradición Nariñense</span>
          </h2>
          <p>
            La combinación perfecta para el desayuno: 2 Litros de Leche Entera + Queso Campesino Artesanal.
          </p>
          <div className="promo-pricing">
            <span className="price-now">$18.000</span>
            <span className="price-old">$20.000</span>
          </div>
          <button type="button" className="btn-primary" id="promo-add-cart" onClick={onAddCombo}>
            Agregar al Carrito
          </button>
        </div>
        <div className="promo-image">
          <img className="promo-box" src="imagenes/combofamiliar.jpeg" alt="Combo familiar CampiLeche" />
        </div>
      </div>
    </section>
  );
};
