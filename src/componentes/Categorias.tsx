import type { CategoryFilter } from '../types/index';

interface CategoriasProps {
  currentCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const Categorias = ({ currentCategory, onSelectCategory }: CategoriasProps) => {
  return (
    <section className="categories">
      <div className="container">
        <div className="categories-grid">
          <button
            className={`cat-card ${currentCategory === 'all' ? 'active' : ''}`}
            data-category="all"
            aria-pressed={currentCategory === 'all'}
            onClick={() => onSelectCategory('all')}
          >
            <i className="fa-solid fa-store"></i>
            <span>Todo el Catálogo</span>
          </button>
          <button
            className={`cat-card ${currentCategory === 'leche' ? 'active' : ''}`}
            data-category="leche"
            aria-pressed={currentCategory === 'leche'}
            onClick={() => onSelectCategory('leche')}
          >
            <i className="fa-solid fa-bottle-water"></i>
            <span>Lácteos Base</span>
          </button>
          <button
            className={`cat-card ${currentCategory === 'derivados' ? 'active' : ''}`}
            data-category="derivados"
            aria-pressed={currentCategory === 'derivados'}
            onClick={() => onSelectCategory('derivados')}
          >
            <i className="fa-solid fa-cheese"></i>
            <span>Derivados</span>
          </button>
        </div>
      </div>
    </section>
  );
};
