# Test Plan - Perplexity Web Search Integration

## Configuration Test

### Test 1: Environment Variables
**Objectif**: Vérifier que les variables d'environnement sont correctement configurées

```bash
cd QuizConstructor/backend
cat .env | grep PERPLEXITY_API_KEY
```

**Résultat attendu**: La clé API doit être affichée (commence par `pplx-`)

---

## Backend Tests

### Test 2: API Endpoint Availability
**Objectif**: Vérifier que le nouvel endpoint existe

**Requête**:
```bash
curl -X POST http://localhost:5000/api/quizzes/generate/websearch \
  -H "Content-Type: application/json" \
  -d '{"searchQuery": "test", "numQuestions": 3}'
```

**Résultat attendu**: 
- Status 200 si API key configurée
- JSON avec `questions` et `sources`
- Ou erreur claire si API key manquante

---

### Test 3: Demo Mode Fallback
**Objectif**: Vérifier que le mode démo fonctionne sans API key

**Configuration**: `DEMO_MODE=true` dans .env

**Requête**: Même que Test 2

**Résultat attendu**: 
- Retourne des questions mockées
- Pas d'erreur API
- Message console: "📚 DEMO MODE - Generating mock questions from web search"

---

### Test 4: Web Search with Real API
**Objectif**: Générer un quiz avec recherche web réelle

**Configuration**: 
- `DEMO_MODE=false`
- `PERPLEXITY_API_KEY` configuré

**Requête**:
```bash
curl -X POST http://localhost:5000/api/quizzes/generate/websearch \
  -H "Content-Type: application/json" \
  -d '{
    "searchQuery": "Artificial Intelligence history",
    "numQuestions": 5
  }'
```

**Résultat attendu**:
- 5 questions générées
- Format correct: `{ question, options: [], correctAnswer: 0-3 }`
- Array `sources` avec URLs
- Questions pertinentes sur l'histoire de l'IA

---

### Test 5: Error Handling - Invalid API Key
**Objectif**: Vérifier la gestion d'erreur pour une clé invalide

**Configuration**: `PERPLEXITY_API_KEY=invalid_key`

**Résultat attendu**: 
- Status 500
- Message: "Invalid Perplexity API key. Please check your configuration."

---

### Test 6: Error Handling - Rate Limit
**Objectif**: Tester le comportement en cas de limite atteinte

**Résultat attendu**: 
- Status 429 de Perplexity
- Message clair: "Rate limit reached. Please try again in a few moments."

---

## Frontend Tests

### Test 7: Web Search Tab Visibility
**Objectif**: Vérifier que l'onglet "Web Search" est visible

**Étapes**:
1. Ouvrir http://localhost:3000
2. Vérifier la présence de 4 onglets
3. Cliquer sur "Web Search"

**Résultat attendu**: 
- Onglet visible avec icône Globe 🌐
- Formulaire de recherche affiché

---

### Test 8: Basic Web Search
**Objectif**: Générer un quiz via l'interface

**Étapes**:
1. Aller sur l'onglet "Web Search"
2. Entrer: "Climate Change"
3. Nombre de questions: 10
4. Cliquer sur "🔍 Search & Generate Quiz"

**Résultat attendu**:
- Loading state activé
- Quiz généré avec 10 questions
- Sources affichées en bas du formulaire
- Quiz ajouté à la liste

---

### Test 9: Sources Display
**Objectif**: Vérifier l'affichage des sources

**Résultat attendu** (après Test 8):
- Section "📚 Sources Used:" visible
- Jusqu'à 5 sources listées
- Liens cliquables qui ouvrent dans un nouvel onglet
- URLs tronquées si trop longues

---

### Test 10: Error Display
**Objectif**: Tester l'affichage des erreurs

**Étapes**:
1. Configurer backend sans API key et DEMO_MODE=false
2. Tenter une recherche

**Résultat attendu**:
- Message d'erreur affiché
- Pas de crash de l'application
- Possibilité de réessayer

---

## Integration Tests

### Test 11: Multiple Search Queries
**Objectif**: Générer plusieurs quiz successifs

**Étapes**:
1. Recherche 1: "Python programming"
2. Recherche 2: "Machine Learning basics"
3. Recherche 3: "Web Development"

**Résultat attendu**:
- 3 quiz distincts créés
- Chaque quiz a ses propres sources
- Pas de mélange de contenu
- Tous visibles dans QuizList

---

### Test 12: Mixed Input Methods
**Objectif**: Utiliser toutes les méthodes d'entrée

**Étapes**:
1. Générer quiz par Subject: "History"
2. Générer quiz par Text: "Lorem ipsum..."
3. Générer quiz par Web Search: "Space exploration"

**Résultat attendu**:
- 3 quiz générés avec méthodes différentes
- Format cohérent pour tous
- Distinction claire des sources

---

### Test 13: Large Query Results
**Objectif**: Tester avec beaucoup de questions

**Requête**: 50 questions sur "Quantum Physics"

**Résultat attendu**:
- 50 questions générées
- Temps de réponse < 30 secondes
- Pas de timeout
- Toutes les questions valides

---

## Performance Tests

### Test 14: Response Time
**Objectif**: Mesurer le temps de réponse

**Méthode**: 
```bash
time curl -X POST http://localhost:5000/api/quizzes/generate/websearch \
  -H "Content-Type: application/json" \
  -d '{"searchQuery": "Test", "numQuestions": 10}'
```

**Résultat attendu**: < 15 secondes pour 10 questions

---

### Test 15: Concurrent Requests
**Objectif**: Tester la charge simultanée

**Méthode**: Lancer 3 requêtes en parallèle

**Résultat attendu**:
- Toutes les requêtes réussissent
- Pas de conflit
- Réponses cohérentes

---

## User Acceptance Tests

### Test 16: Student Use Case
**Scénario**: Étudiant préparant un examen

**Étapes**:
1. Recherche: "French Revolution causes and consequences"
2. 20 questions
3. Vérifier la pertinence des questions

**Résultat attendu**:
- Questions éducatives
- Informations factuelles
- Sources fiables (Wikipedia, sites éducatifs)

---

### Test 17: Teacher Use Case
**Scénario**: Enseignant créant un quiz pour sa classe

**Étapes**:
1. Recherche: "Solar system planets characteristics"
2. 15 questions
3. Partager le quiz

**Résultat attendu**:
- Questions adaptées au niveau
- Variété de difficultés
- Sources vérifiables

---

## Regression Tests

### Test 18: Existing Features Still Work
**Objectif**: S'assurer que l'ajout n'a pas cassé les fonctionnalités existantes

**À tester**:
- ✅ Génération par Subject
- ✅ Génération par Text
- ✅ Génération par File
- ✅ Mode Démo
- ✅ Ajout/Suppression de quiz
- ✅ Navigation entre onglets

---

## Security Tests

### Test 19: API Key Not Exposed
**Objectif**: Vérifier que la clé API n'est jamais envoyée au client

**Méthode**: 
1. Ouvrir DevTools
2. Onglet Network
3. Faire une recherche web
4. Inspecter les requêtes

**Résultat attendu**:
- Clé API absente des headers
- Clé API absente du body
- Clé API absente de l'URL

---

### Test 20: Input Sanitization
**Objectif**: Tester avec entrées malveillantes

**Requêtes**:
- `<script>alert('XSS')</script>`
- `'; DROP TABLE quizzes; --`
- Très long texte (10000 caractères)

**Résultat attendu**:
- Pas d'exécution de code
- Pas d'injection SQL
- Gestion gracieuse des longues entrées

---

## Test Results Template

```
Test #: [Numéro]
Date: [Date]
Testeur: [Nom]
Environnement: [Dev/Staging/Prod]

Status: [✅ PASS | ❌ FAIL | ⚠️ PARTIAL]

Notes:
- 
- 

Bugs trouvés:
- 

Screenshots: [Liens]
```

---

## Automated Test Script

```javascript
// tests/perplexity.test.js
import { generateQuestionsFromWebSearch } from '../controllers/aiController.js';

describe('Perplexity Web Search', () => {
  test('should generate questions from search query', async () => {
    const result = await generateQuestionsFromWebSearch('AI', 5);
    expect(result.questions).toHaveLength(5);
    expect(result.sources).toBeDefined();
  });

  test('should handle demo mode', async () => {
    process.env.DEMO_MODE = 'true';
    const result = await generateQuestionsFromWebSearch('Test', 3);
    expect(result).toHaveLength(3);
  });
});
```

---

**Version**: 1.0  
**Dernière mise à jour**: 2025-10-29  
**Tests à exécuter**: 20  
**Priorité**: ⚡ Critique avant déploiement
