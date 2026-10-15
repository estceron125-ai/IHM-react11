import { useEffect, useState } from 'react';
import type { CategoryFilter, Product, UserProfile } from './types/index';
import { Header } from './componentes/Header';
import { Hero } from './componentes/Hero';
import { Categorias } from './componentes/Categorias';
import { Catalogo } from './componentes/Catalogo';
import { PromoBanner } from './componentes/PromoBanner';
import { SobreNosotros } from './componentes/SobreNosotros';
import { Footer } from './componentes/Footer';
import { PerfilModal } from './componentes/PerfilModal';
import { CarritoModal } from './componentes/CarritoModal';
import { formatearPrecio } from './componentes/TarjetaProducto';
import { attachCatalogReferences, getCatalogReferences } from './services/catalogService';

const PROFILE_STORAGE_KEY = 'campileche-profile';

const FAMILY_COMBO: Product = {
  id: 'combo-familiar',
  title: 'Combo Familiar',
  price: 18000,
  description: '2 litros de leche entera + queso campesino',
  image: 'imagenes/combofamiliar.jpeg',
};

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Leche Entera',
    price: 5000,
    description: 'Leche 100% fresca, sin aditivos ni conservantes, recolectada directamente del campo nariñense.',
    category: 'leche',
    image: 'imagenes/lecheEntera.jpeg',
  },
  {
    id: 2,
    title: 'Leche Deslactosada',
    price: 6000,
    description: 'Ideal para quienes tienen sensibilidad a la lactosa, manteniendo todo el sabor y calcio natural.',
    category: 'leche',
    image: 'imagenes/lechedeslactosada.jpeg',
  },
  {
    id: 3,
    title: 'Leche Descremada',
    price: 7000,
    description: 'Baja en grasas y calorías, perfecta para una dieta balanceada y saludable.',
    category: 'leche',
    image: 'imagenes/lecheDescremada.jpeg',
  },
  {
    id: 4,
    title: 'Queso Campesino',
    price: 12000,
    description: 'Queso fresco artesanal con el sabor tradicional del campo. Bajo en sal y muy cremoso.',
    category: 'derivados',
    image: 'imagenes/quesocampecino.jpeg',
  },
  {
    id: 5,
    title: 'Queso Doble Crema',
    price: 14500,
    description: 'Queso artesanal suave y cremoso, ideal para compartir en familia.',
    category: 'derivados',
    image: 'imagenes/quesodoblecrema.jpeg',
  },
  {
    id: 6,
    title: 'Yogur Natural',
    price: 4500,
    description: 'Yogur cremoso sin azúcar añadida, rico en probióticos naturales del campo.',
    category: 'derivados',
    image: 'imagenes/yogurt.jpeg',
  },
];

export default function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [catalogSource, setCatalogSource] = useState('Conectando catálogo...');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Cargar perfil desde localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored) as UserProfile);
      }
    } catch {
      // Ignorar fallas de lectura de localStorage
    }
  }, []);

  // Consulta una fuente pública y conserva el catálogo local cuando la red no está disponible.
  useEffect(() => {
    const controller = new AbortController();

    const obtenerProductos = async () => {
      try {
        const productosApi = await getCatalogReferences(controller.signal);
        setAllProducts(attachCatalogReferences(FALLBACK_PRODUCTS, productosApi));
        setCatalogSource('Catálogo CampiLeche conectado a Fake Store API');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.warn('API no disponible. Usando datos de respaldo locales.', error);
        setAllProducts(FALLBACK_PRODUCTS);
        setCatalogSource('Catálogo CampiLeche en modo local');
        setCatalogError(
          error instanceof Error
            ? `${error.message} Se muestran los productos disponibles localmente.`
            : 'No fue posible actualizar el catálogo externo. Se muestran los productos disponibles localmente.',
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    obtenerProductos();
    return () => controller.abort();
  }, []);

  const handleAddToCart = (producto: Product) => {
    setCartItems((prev) => [...prev, producto]);
    setCheckoutMessage('');
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
    } catch {
      // Error silencioso
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (!profile?.name || !profile.email) {
      setIsCartOpen(false);
      setIsProfileOpen(true);
      setProfileMessage('Completa tu perfil para continuar con el pago.');
      return;
    }

    const total = cartItems.reduce((suma, item) => suma + item.price, 0);
    setCartItems([]);
    setCheckoutMessage(
      `Pedido registrado para ${profile.name}: ${formatearPrecio(total)}. Te contactaremos para confirmar el pago y la entrega.`
    );
  };

  const handleViewAll = () => {
    setSelectedCategory('all');
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Header
        cartCount={cartItems.length}
        onOpenProfile={() => {
          setProfileMessage('');
          setIsProfileOpen(true);
        }}
        onOpenCart={() => {
          setCheckoutMessage('');
          setIsCartOpen(true);
        }}
      />

      <main id="main-content">
        <Hero />
        <Categorias
          currentCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
        <Catalogo
          productos={filteredProducts}
          isLoading={isLoading}
          error={catalogError}
          catalogSource={catalogSource}
          onViewAll={handleViewAll}
          onAddToCart={handleAddToCart}
        />
        <PromoBanner onAddCombo={() => handleAddToCart(FAMILY_COMBO)} />
        <SobreNosotros />
      </main>

      <Footer />

      <PerfilModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        profileMessage={profileMessage}
        setProfileMessage={setProfileMessage}
      />

      <CarritoModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        checkoutMessage={checkoutMessage}
      />
    </>
  );
}
