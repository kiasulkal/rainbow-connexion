import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Search, 
  Menu, 
  User, 
  MessageCircle, 
  Truck, 
  Shield, 
  ArrowRight,
  Plus,
  Minus,
  X
} from "lucide-react";

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
  size?: string;
  color?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ForumPost {
  id: string;
  author: User;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replies: any[];
  tags: string[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bandana Pride Arc-en-ciel",
    description: "Bandana aux couleurs vives de la fierté LGBT. Parfait pour les événements Pride ou le quotidien. Matière douce et résistante.",
    price: 12.99,
    originalPrice: 18.99,
    image: "/products/bandana-pride.jpg",
    category: "Accessoires",
    inStock: true,
    tags: ["pride", "bandana", "arc-en-ciel"],
    rating: 4.8,
    reviews: 127
  },
  {
    id: "2",
    name: "T-shirt Tie-Dye Rainbow",
    description: "T-shirt tie-dye aux couleurs de l'arc-en-ciel. Coupe unisexe confortable, 100% coton bio. Parfait pour montrer votre fierté !",
    price: 24.99,
    originalPrice: 34.99,
    image: "/products/tshirt-pride.jpg",
    category: "Vêtements",
    inStock: true,
    tags: ["t-shirt", "tie-dye", "unisexe"],
    rating: 4.9,
    reviews: 89
  },
  {
    id: "3",
    name: "Bracelet Pride Sport",
    description: "Bracelet sport aux couleurs Pride. Résistant à l'eau, parfait pour le sport ou les festivals. Design confortable et durable.",
    price: 8.99,
    originalPrice: 12.99,
    image: "/products/bracelet-pride.jpg",
    category: "Accessoires",
    inStock: true,
    tags: ["bracelet", "sport", "résistant"],
    rating: 4.7,
    reviews: 203
  },
  {
    id: "4",
    name: "Boucles d'oreilles Rainbow",
    description: "Set de boucles d'oreilles créatives et colorées. Inclut plusieurs styles different pour varier les looks. Hypoallergéniques.",
    price: 15.99,
    originalPrice: 22.99,
    image: "/products/earrings-pride.jpg",
    category: "Bijoux",
    inStock: true,
    tags: ["boucles d'oreilles", "créatif", "hypoallergénique"],
    rating: 4.6,
    reviews: 156
  }
];

const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: "1",
    author: { id: "1", name: "Alex Rainbow", email: "alex@example.com", avatar: "🌈" },
    title: "Mes conseils pour coming out en famille",
    content: "Salut la communauté ! Je voulais partager mon expérience de coming out auprès de ma famille. Ça n'a pas toujours été facile mais...",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
    likes: 47,
    replies: [],
    tags: ["coming-out", "famille", "conseils"]
  },
  {
    id: "2",
    author: { id: "2", name: "Marie Solidarity", email: "marie@example.com", avatar: "🏳️‍⚧️" },
    title: "Événements Pride 2025 en France",
    content: "Hey ! Quelqu'un a déjà les dates des marches des fiertés 2025 ? J'aimerais organiser mon planning pour participer au maximum d'événements...",
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-08"),
    likes: 23,
    replies: [],
    tags: ["pride", "événements", "2025"]
  },
  {
    id: "3",
    author: { id: "3", name: "Jordan Style", email: "jordan@example.com", avatar: "💫" },
    title: "Où trouver des vêtements inclusifs de qualité ?",
    content: "Salut ! Je cherche des marques qui proposent des vêtements vraiment inclusifs, pas juste des rainbow pendant le mois de juin...",
    createdAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-07"),
    likes: 31,
    replies: [],
    tags: ["mode", "inclusif", "recommandations"]
  }
];

export default function RainbowConnexion() {
  const [activeTab, setActiveTab] = useState("boutique");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", "Vêtements", "Accessoires", "Bijoux"];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Rainbow Connexion" className="h-10 w-10" />
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
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs rainbow-gradient text-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
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
              <Button size="lg" className="rainbow-gradient text-white hover:scale-105 transition-transform">
                Découvrir la boutique
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => setActiveTab("communaute")}>
                Rejoindre la communauté
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "boutique" && (
          <div>
            {/* Search and Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher des produits..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "rainbow-gradient text-white" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 pride-card">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:rainbow-text transition-all">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 0) 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
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

                    <Button 
                      className="w-full hover-rainbow"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Livraison Express</h3>
                <p className="text-gray-600">Livraison en 48-72h partout en France</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Paiement Sécurisé</h3>
                <p className="text-gray-600">Vos données sont protégées et sécurisées</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rainbow-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
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

            {/* New Post Form */}
            <Card className="mb-8 pride-card">
              <CardHeader>
                <CardTitle>Partager avec la communauté</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Titre de votre message..." />
                <Textarea placeholder="Que souhaitez-vous partager avec la communauté ?" className="min-h-[100px]" />
                <div className="flex gap-2">
                  <Badge variant="outline">#conseils</Badge>
                  <Badge variant="outline">#support</Badge>
                  <Badge variant="outline">#événements</Badge>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="rainbow-gradient text-white">
                  Publier
                </Button>
              </CardContent>
            </Card>

            {/* Forum Posts */}
            <div className="space-y-6">
              {MOCK_FORUM_POSTS.map((post) => (
                <Card key={post.id} className="pride-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {post.author.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600">
                            Par {post.author.name} • {post.createdAt.toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">#{tag}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Répondre
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
              <Card className="pride-card">
                <CardHeader>
                  <CardTitle>Notre Histoire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Rainbow Connexion est née de la volonté de créer un espace où chaque personne LGBT+ 
                    peut s'exprimer librement, trouver des produits qui la représentent et rencontrer 
                    d'autres membres de la communauté dans un environnement bienveillant.
                  </p>
                </CardContent>
              </Card>

              <Card className="pride-card">
                <CardHeader>
                  <CardTitle>Nos Valeurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>✨ Inclusivité et diversité</li>
                    <li>💝 Bienveillance et respect</li>
                    <li>🌈 Fierté et authenticité</li>
                    <li>🤝 Solidarité communautaire</li>
                    <li>⚡ Innovation et qualité</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="pride-card text-center">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Rejoignez notre communauté !</h3>
                <p className="text-gray-600 mb-6">
                  Plus de 10,000 membres nous font déjà confiance pour exprimer leur fierté 
                  et créer des connexions authentiques.
                </p>
                <Button size="lg" className="rainbow-gradient text-white">
                  Devenir membre
                </Button>
              </CardContent>
            </Card>
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
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
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
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.price.toFixed(2)}€</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">{getTotalPrice().toFixed(2)}€</span>
                    </div>
                    <Button className="w-full rainbow-gradient text-white">
                      Procéder au paiement
                    </Button>
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
                <img src="/logo.png" alt="Rainbow Connexion" className="h-8 w-8" />
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
