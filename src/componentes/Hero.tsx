export const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <span className="hero-tag">100% Natural y Artesanal</span>
          <h1>
            Pureza del <br />
            <span>Campo Nariñense</span>
          </h1>
          <p>
            Llevamos la frescura y el sabor inigualable de las montañas de Nariño directamente a la mesa de
            tu familia.
          </p>
          <div className="hero-btns">
            <a href="#productos" className="btn-primary">Explorar Productos</a>
            <a href="#nosotros" className="btn-secondary">Nuestra Historia</a>
          </div>
        </div>
        <div className="hero-visual">
          <img className="hero-image" src="imagenes/origenPasto.jpg" alt="Paisaje de Pasto, Nariño" />
          <div className="visual-card">
            <p>Origen: <strong>Pasto, Nariño</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};
