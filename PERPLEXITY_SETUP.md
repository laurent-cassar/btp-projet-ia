# Configuration de Perplexity.ai pour QuizConstructor

## 📋 Vue d'ensemble
Cette fonctionnalité permet de générer des quiz à partir de recherches web en temps réel en utilisant l'API Perplexity.ai avec votre compte Pro étudiant.

## 🔑 Configuration de l'API Perplexity

### Étape 1 : Obtenir votre clé API

1. Connectez-vous à [Perplexity.ai](https://www.perplexity.ai/) avec votre compte Pro (`laurent.cassar@laplateforme.io`)
2. Accédez aux paramètres de votre compte
3. Naviguez vers la section "API" ou "Developer Settings"
4. Générez une nouvelle clé API
5. Copiez la clé (elle commence généralement par `pplx-`)

### Étape 2 : Configurer le Backend

1. Créez un fichier `.env` dans `QuizConstructor/backend/` basé sur `.env.example`:

```bash
cd QuizConstructor/backend
cp .env.example .env
```

2. Ajoutez votre clé API Perplexity dans le fichier `.env`:

```env
PERPLEXITY_API_KEY=pplx-votre-clé-api-ici
DEMO_MODE=false
```

### Étape 3 : Redémarrer le serveur

```bash
cd QuizConstructor/backend
npm start
```

## 🎯 Utilisation

### Interface Utilisateur

1. Ouvrez QuizConstructor dans votre navigateur
2. Cliquez sur l'onglet **"Web Search"** (🌐)
3. Entrez votre requête de recherche (ex: "Intelligence Artificielle", "Réchauffement climatique")
4. Sélectionnez le nombre de questions souhaité
5. Cliquez sur **"🔍 Search & Generate Quiz"**

### Exemple de requêtes

- **Sujets académiques** : "Les lois de Newton en physique"
- **Histoire** : "La Révolution française"
- **Technologie** : "Blockchain et cryptomonnaies"
- **Sciences** : "Le système solaire et les planètes"
- **Actualités** : "L'impact de l'IA sur l'emploi"

## 🔍 Fonctionnalités

### Recherche Web Intelligente
- Utilise Perplexity.ai pour rechercher des informations actuelles et vérifiées
- Accès à des sources web fiables en temps réel
- Génération de questions basées sur des faits vérifiables

### Citations et Sources
- Affiche les sources web utilisées pour générer les questions
- Liens cliquables vers les articles originaux
- Transparence sur l'origine des informations

### Modèle IA Optimisé
- Utilise `llama-3.1-sonar-large-128k-online`
- Recherche web intégrée
- Contexte de 128k tokens pour des informations détaillées

## 📊 Architecture

```
Utilisateur
    ↓ Saisit une requête de recherche
QuizGenerator (Frontend)
    ↓ POST /api/quizzes/generate/websearch
Backend Route (quizRoutes.js)
    ↓
aiController.generateQuestionsFromWebSearch()
    ↓
1️⃣ Recherche Perplexity (API Call 1)
   - Recherche web sur le sujet
   - Récupération d'informations vérifiées
   - Obtention de citations et sources
    ↓
2️⃣ Génération de Quiz (API Call 2)
   - Analyse du contenu recherché
   - Création de questions pertinentes
   - Formatage JSON des questions
    ↓
Retour au Frontend
   - Questions générées
   - Sources citées
   - Affichage du quiz
```

## 🛠️ Fichiers Modifiés

### Backend
- ✅ `controllers/aiController.js` - Nouvelle fonction `generateQuestionsFromWebSearch()`
- ✅ `routes/quizRoutes.js` - Nouvelle route `POST /generate/websearch`
- ✅ `.env.example` - Variable `PERPLEXITY_API_KEY`

### Frontend
- ✅ `components/QuizGenerator.jsx` - Nouvel onglet "Web Search"
- ✅ `hooks/useApi.js` - Nouvelle fonction `generateQuizFromWebSearch()`

## 🔐 Sécurité

### Bonnes Pratiques
- ✅ Clé API stockée dans `.env` (non versionné)
- ✅ `.env` ajouté au `.gitignore`
- ✅ Utilisation de variables d'environnement côté serveur uniquement
- ✅ Pas d'exposition de la clé API côté client

### Limites et Quotas
- Surveillez votre utilisation via le dashboard Perplexity
- Les comptes Pro ont généralement des limites plus élevées
- En cas de dépassement, le système retournera une erreur claire

## 🧪 Mode Démo

Si `DEMO_MODE=true` ou si la clé API n'est pas configurée:
- Le système utilisera des questions mockées
- Aucun appel API réel ne sera effectué
- Utile pour le développement et les tests

## 🐛 Dépannage

### Erreur : "PERPLEXITY_API_KEY is not configured"
➡️ Vérifiez que votre clé API est bien ajoutée dans `.env`

### Erreur : "Invalid Perplexity API key"
➡️ Vérifiez que la clé est correcte et active sur votre compte

### Erreur : "Rate limit reached"
➡️ Attendez quelques minutes avant de réessayer

### Pas de sources affichées
➡️ Normal, certaines recherches peuvent ne pas retourner de citations

## 📈 Avantages vs Autres Méthodes

| Fonctionnalité | Web Search | Subject | Text/URL |
|---------------|-----------|---------|----------|
| **Informations actuelles** | ✅ Oui | ❌ Non | ❌ Limité |
| **Sources vérifiées** | ✅ Oui | ❌ Non | ⚠️ URL uniquement |
| **Recherche multi-sources** | ✅ Oui | ❌ Non | ❌ Non |
| **Citations académiques** | ✅ Oui | ❌ Non | ❌ Non |
| **Contexte actuel** | ✅ Oui | ⚠️ Dépend du modèle | ❌ Non |

## 📚 Ressources

- [Documentation API Perplexity](https://docs.perplexity.ai/)
- [Modèles disponibles](https://docs.perplexity.ai/docs/model-cards)
- [Tarification Perplexity](https://www.perplexity.ai/pro)

## 🎓 Compte Étudiant

Votre compte Pro avec `laurent.cassar@laplateforme.io` bénéficie :
- ✅ Accès illimité aux recherches
- ✅ Modèles les plus avancés
- ✅ Réponses plus détaillées
- ✅ Priorité d'accès

---

**Date de création** : 2025-10-29  
**Version** : 1.0  
**Statut** : ✅ Prêt à l'emploi
