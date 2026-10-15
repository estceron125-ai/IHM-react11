export const SobreNosotros = () => {
  return (
    <section id="nosotros" className="about">
      <div className="container about-grid">
        <div className="about-image-wrap">
          <img className="about-image" src="imagenes/granjas.jpeg" alt="Granjas lecheras de CampiLeche" />
        </div>
        <div className="about-info">
          <h2>Orgullo de Nuestra Tierra</h2>
          <p>
            CampiLeche nace en el corazón de Nariño, donde el aire puro y los pastos verdes permiten que
            nuestras vacas produzcan la leche más nutritiva y sabrosa de la región.
          </p>
          <div className="about-features">
            <div className="feature">
              <i className="fa-solid fa-leaf"></i>
              <div>
                <strong>100% Orgánico</strong>
                <p>Sin químicos ni conservantes.</p>
              </div>
            </div>
            <div className="feature">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <div>
                <strong>Apoyo Local</strong>
                <p>Comercio justo con campesinos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
