import { useState } from 'react';
import { HelpCircle, X, Zap, Brain, Clock, Award } from 'lucide-react';

export const ModelHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const models = [
    {
      id: 'gemini-2.0-flash-lite',
      name: 'Gemini 2.0 Flash Lite',
      icon: <Zap className="text-yellow-500" size={24} />,
      speed: 5,
      intelligence: 3,
      badge: 'Recommandé',
      description: 'Le plus rapide et gratuit avec limites généreuses',
      useCases: [
        'Usage quotidien et fréquent',
        'Générer rapidement plusieurs quiz',
        'Quiz standards et simples'
      ],
      limits: '15 req/min • 1,500 req/jour'
    },
    {
      id: 'gemini-2.0-flash',
      name: 'Gemini 2.0 Flash',
      icon: <Brain className="text-blue-500" size={24} />,
      speed: 4,
      intelligence: 4,
      badge: 'Équilibré',
      description: 'Meilleur équilibre entre vitesse et intelligence',
      useCases: [
        'Quiz sophistiqués et variés',
        'Sujets complexes',
        'Plus de créativité dans les questions'
      ],
      limits: '15 req/min • 1,500 req/jour'
    },
    {
      id: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash',
      icon: <Clock className="text-gray-500" size={24} />,
      speed: 4,
      intelligence: 3,
      badge: 'Stable',
      description: 'Version précédente stable et éprouvée',
      useCases: [
        'Alternative si 2.0 a des problèmes',
        'Contenus longs (textes, fichiers)',
        'Préférence pour la stabilité'
      ],
      limits: '15 req/min • 1,500 req/jour'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      icon: <Award className="text-purple-500" size={24} />,
      speed: 2,
      intelligence: 5,
      badge: 'Avancé',
      description: 'Le plus intelligent avec explications détaillées',
      useCases: [
        'Quiz académiques exigeants',
        'Sujets très spécialisés',
        'Qualité maximale'
      ],
      limits: '2 req/min • 50 req/jour ⚠️'
    }
  ];

  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const renderSpeed = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < count ? 'text-green-500' : 'text-gray-300'}>
            ⚡
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        title="Guide des modèles Gemini"
      >
        <HelpCircle size={20} />
        <span className="hidden sm:inline">Aide Modèles</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Guide des Modèles Google Gemini</h2>
                <p className="text-gray-600 mt-1">Choisissez le modèle adapté à vos besoins</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Comparison Table */}
              <div className="mb-8 overflow-x-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Comparaison Rapide</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Modèle</th>
                      <th className="border p-3 text-center">Vitesse</th>
                      <th className="border p-3 text-center">Intelligence</th>
                      <th className="border p-3 text-center">Usage Gratuit</th>
                      <th className="border p-3 text-left">Recommandé pour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">2.0 Flash Lite</td>
                      <td className="border p-3">⚡⚡⚡⚡⚡</td>
                      <td className="border p-3">⭐⭐⭐</td>
                      <td className="border p-3 text-center">✅ Élevé</td>
                      <td className="border p-3">Usage quotidien</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">2.0 Flash</td>
                      <td className="border p-3">⚡⚡⚡⚡</td>
                      <td className="border p-3">⭐⭐⭐⭐</td>
                      <td className="border p-3 text-center">✅ Bon</td>
                      <td className="border p-3">Quiz variés</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">1.5 Flash</td>
                      <td className="border p-3">⚡⚡⚡⚡</td>
                      <td className="border p-3">⭐⭐⭐</td>
                      <td className="border p-3 text-center">✅ Bon</td>
                      <td className="border p-3">Textes longs</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold">Gemini Pro</td>
                      <td className="border p-3">⚡⚡</td>
                      <td className="border p-3">⭐⭐⭐⭐⭐</td>
                      <td className="border p-3 text-center">⚠️ Limité</td>
                      <td className="border p-3">Quiz avancés</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Model Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="border-2 rounded-lg p-5 hover:shadow-lg transition"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {model.icon}
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{model.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {model.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">{model.description}</p>

                    {/* Metrics */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Vitesse:</span>
                        {renderSpeed(model.speed)}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Intelligence:</span>
                        {renderStars(model.intelligence)}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">💡 Quand l'utiliser :</h4>
                      <ul className="space-y-1">
                        {model.useCases.map((useCase, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Limits */}
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <strong>Limites:</strong> {model.limits}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">💡 Conseils d'utilisation</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li><strong>Débutant ?</strong> Commencez avec <strong>Gemini 2.0 Flash Lite</strong></li>
                  <li><strong>Quiz variés ?</strong> Testez <strong>Gemini 2.0 Flash</strong></li>
                  <li><strong>Sujets complexes ?</strong> Utilisez <strong>Gemini Pro</strong></li>
                  <li><strong>Problème ?</strong> L'app bascule automatiquement vers 2.0 Flash Lite</li>
                </ul>
              </div>

              {/* New Features */}
              <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="font-bold text-green-900 mb-2">🔥 Nouveautés</h3>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>✅ Génération aléatoire pour des quiz différents</li>
                  <li>✅ Explications détaillées pour chaque question</li>
                  <li>✅ Support natif du français 🇫🇷</li>
                  <li>✅ Système de fallback automatique</li>
                </ul>
              </div>

              {/* FAQ */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">❓ Questions Fréquentes</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-800">Comment obtenir une clé API ?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Visitez{' '}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Google AI Studio
                      </a>
                      {' '}et créez une clé gratuitement
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-800">Pourquoi les questions sont identiques ?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Redémarrez le backend pour charger la nouvelle configuration avec génération aléatoire
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-800">Tous les modèles sont gratuits ?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Oui, mais avec des limites différentes. Gemini Pro a les limites les plus strictes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documentation Link */}
              <div className="mt-6 text-center">
                <a
                  href="https://ai.google.dev/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold"
                >
                  📚 Documentation complète Google Gemini
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-100 border-t p-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                💡 <strong>Conseil :</strong> Gemini 2.0 Flash Lite est parfait pour commencer
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Compris !
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
