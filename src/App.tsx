import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  tags: string[];
  rating?: number;
  reviews?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bandana Pride Arc-en-ciel",
    description: "Bandana aux couleurs vives de la fierté LGBT. Parfait pour les événements Pride ou le quotidien.",
    price: 12.99,
    originalPrice: 18.99,
    image: "/products/bandana-pride.jpg",
    category: "Accessoires",
    inStock: true,
    tags: ["pride", "bandana"],
    rating: 4.8,
    reviews: 127
  },
  {
    id: "2",
    name: "T-shirt Tie-Dye Rainbow",
    description: "T-shirt tie-dye aux couleurs de l'arc-en-ciel. Coupe unisexe confortable, 100% coton bio.",
    price: 24.99,
    originalPrice: 34.99,
    image: "/products/tshirt-pride.jpg",
    category: "Vêtements",
    inStock: true,
    tags: ["t-shirt", "tie-dye"],
    rating: 4.9,
    reviews: 89
  }
];

export default function RainbowConnexion() {
  const [activeTab, setActiveTab] = useState("boutique");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full"></div>
              <h1 className="text-2xl font-bold rainbow-text">Rainbow Connexion</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab("boutique")}
                className={`font-medium transition-colors ${
                  activeTab === "boutique" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Boutique
              </button>
              <button 
                onClick={() => setActiveTab("communaute")}
                className={`font-medium transition-colors ${
                  activeTab === "communaute" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Communauté
              </button>
              <button 
                onClick={() => setActiveTab("apropos")}
                className={`font-medium transition-colors ${
                  activeTab === "apropos" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
                }`}
              >
                À propos
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                👤
              </button>
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                🛒
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === "boutique" && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 rainbow-animate opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Exprimez votre <span className="rainbow-text">Fierté</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de vêtements et accessoires LGBT. 
              Livraison rapide en 48-72h partout en France ! 🌈
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rainbow-gradient text-white rounded-lg hover:scale-105 transition-transform">
                Découvrir la boutique →
              </button>
              <button 
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setActiveTab("communaute")}
              >
                Rejoindre la communauté 💬
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "boutique" && (
          <div>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="group hover:shadow-xl transition-all duration-300 pride-card rounded-lg overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/ff6b6b/ffffff?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      ❤️
                    </button>
                    {product.originalPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:rainbow-text transition-all">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {"⭐".repeat(Math.floor(product.rating || 0))}
                      <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-600">{product.price.toFixed(2)}€</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}€</span>
                        )}
                      </div>
                    </div>

                    <button 
                      className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      🛒 Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold mb-2">Livraison Express</h3>
                <p className="text-gray-600">Livraison en 48-72h partout en France</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Paiement Sécurisé</h3>
                <p className="text-gray-600">Vos données sont protégées et sécurisées</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="font-semibold mb-2">Communauté Bienveillante</h3>
                <p className="text-gray-600">Un espace safe pour s'exprimer librement</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "communaute" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Espace <span className="rainbow-text">Communauté</span>
              </h2>
              <p className="text-xl text-gray-600">
                Partagez, échangez et soutenez-vous dans un environnement bienveillant 💝
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Partager avec la communauté</h3>
              <input 
                placeholder="Titre de votre message..." 
                className="w-full p-3 border rounded-lg mb-4"
              />
              <textarea 
                placeholder="Que souhaitez-vous partager avec la communauté ?" 
                className="w-full p-3 border rounded-lg min-h-[100px] mb-4"
              ></textarea>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#conseils</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#support</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#événements</span>
              </div>
              <button className="px-6 py-2 rainbow-gradient text-white rounded-lg">
                Publier
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                      🌈
                    </div>
                    <div>
                      <h3 className="font-semibold">Mes conseils pour coming out en famille</h3>
                      <p className="text-sm text-gray-600">Par Alex Rainbow • 10/01/2025</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500">
                    ❤️ 47
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  Salut la communauté ! Je voulais partager mon expérience de coming out auprès de ma famille. 
                  Ça n'a pas toujours été facile mais...
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">#coming-out</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">#famille</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">#conseils</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  💬 Répondre
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "apropos" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                À propos de <span className="rainbow-text">Rainbow Connexion</span>
              </h2>
              <p className="text-xl text-gray-600">
                Notre mission : créer des liens authentiques dans la communauté LGBT+ 🌈
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Notre Histoire</h3>
                <p className="text-gray-700">
                  Rainbow Connexion est née de la volonté de créer un espace où chaque personne LGBT+ 
                  peut s'exprimer librement, trouver des produits qui la représentent et rencontrer 
                  d'autres membres de la communauté dans un environnement bienveillant.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Nos Valeurs</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✨ Inclusivité et diversité</li>
                  <li>💝 Bienveillance et respect</li>
                  <li>🌈 Fierté et authenticité</li>
                  <li>🤝 Solidarité communautaire</li>
                  <li>⚡ Innovation et qualité</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Rejoignez notre communauté !</h3>
              <p className="text-gray-600 mb-6">
                Plus de 10,000 membres nous font déjà confiance pour exprimer leur fierté 
                et créer des connexions authentiques.
              </p>
              <button className="px-8 py-3 rainbow-gradient text-white rounded-lg text-lg">
                Devenir membre
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="ml-auto w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Panier ({getTotalItems()})</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-600">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/64x64/ff6b6b/ffffff?text=${item.product.name.slice(0,2)}`;
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.price.toFixed(2)}€</p>
                        <p className="text-sm">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">{getTotalPrice().toFixed(2)}€</span>
                    </div>
                    <button className="w-full py-3 rainbow-gradient text-white rounded-lg">
                      Procéder au paiement
                    </button>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Livraison express 48-72h incluse
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full"></div>
                <span className="font-bold text-lg">Rainbow Connexion</span>
              </div>
              <p className="text-gray-400">
                Votre boutique LGBT de confiance avec une communauté bienveillante.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Boutique</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Vêtements</li>
                <li>Accessoires</li>
                <li>Bijoux</li>
                <li>Nouveautés</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Communauté</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Forum</li>
                <li>Événements</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@rainbowconnexion.fr</li>
                <li>01 23 45 67 89</li>
                <li>FAQ</li>
                <li>Livraison & Retours</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Rainbow Connexion. Tous droits réservés. Made with 🌈 in France</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
