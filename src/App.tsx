import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('boutique');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              🌈 Rainbow Connexion
            </h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Panier (0)
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['boutique', 'communauté', 'à-propos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'boutique' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Boutique LGBT Pride 🏳️‍🌈
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-300 to-blue-300 rounded-lg mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">Produit LGBT #{i}</h3>
                  <p className="text-gray-600 mb-4">Description du produit</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">29,99€</span>
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communauté' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Communauté LGBT+ 💬
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Forum de discussion</h3>
              <p className="text-gray-600 mb-4">
                Connectez-vous avec la communauté LGBT+ ! Partagez vos expériences, 
                posez des questions et trouvez du soutien.
              </p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                Rejoindre la discussion
              </button>
            </div>
          </div>
        )}

        {activeTab === 'à-propos' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              À propos de Rainbow Connexion
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Notre Mission 🌈</h3>
              <p className="text-gray-600 mb-6">
                Rainbow Connexion est votre destination pour des produits LGBT+ de qualité.
                Nous soutenons la communauté LGBTQ+ avec des produits authentiques 
                et un espace d'échange bienveillant.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <h4 className="font-bold">Qualité</h4>
                  <p className="text-sm text-gray-600">Produits premium</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🚚</div>
                  <h4 className="font-bold">Livraison Rapide</h4>
                  <p className="text-sm text-gray-600">48-72h en France</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💜</div>
                  <h4 className="font-bold">Communauté</h4>
                  <p className="text-sm text-gray-600">Espace d'échange</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">🌈 Rainbow Connexion</h3>
          <p className="text-gray-400 mb-4">
            Votre boutique LGBT+ de confiance
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Rainbow Connexion. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
