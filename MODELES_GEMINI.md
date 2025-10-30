# Guide des Modèles Google Gemini

## Vue d'ensemble

QuizConstructor propose **4 modèles Google Gemini** différents pour générer vos quiz. Chaque modèle offre un équilibre différent entre vitesse, intelligence et qualité de génération.

---

## 1. 🚀 Gemini 2.0 Flash Lite (Recommandé)

**ID:** `gemini-2.0-flash-lite`

### Caractéristiques
- ⚡ **Le plus rapide** de tous les modèles
- 💰 **Gratuit** avec des limites généreuses
- 🎯 **Excellent rapport qualité/vitesse**
- 📊 Idéal pour des quiz standards

### Quand l'utiliser
- Pour générer rapidement des quiz
- Lorsque vous avez besoin de plusieurs quiz
- Pour un usage quotidien et fréquent

---

## 2. ⚡ Gemini 2.0 Flash

**ID:** `gemini-2.0-flash`

### Caractéristiques
- 🚀 **Très rapide** mais légèrement plus lent que Lite
- 🧠 **Plus intelligent** - meilleure compréhension du contexte
- 📝 Génère des questions plus variées et nuancées
- 💰 Gratuit avec limites raisonnables

### Quand l'utiliser
- Pour des quiz plus sophistiqués
- Sujets complexes nécessitant plus de contexte
- Quand vous voulez plus de créativité dans les questions

---

## 3. 🔄 Gemini 1.5 Flash

**ID:** `gemini-1.5-flash`

### Caractéristiques
- 🕐 **Version précédente** (génération 1.5)
- 🔧 **Stable et éprouvé**
- 📚 Bonne pour des contenus longs (textes, fichiers)
- 💰 Gratuit

### Quand l'utiliser
- Comme alternative si Gemini 2.0 a des problèmes
- Pour des quiz basés sur de longs textes/fichiers
- Si vous préférez la stabilité de la version 1.5

---

## 4. 🎓 Gemini Pro

**ID:** `gemini-pro`

### Caractéristiques
- 🧠 **Le plus intelligent** (modèle avancé)
- 🎯 **Précision maximale** dans les réponses
- 📖 **Explications plus détaillées**
- 🐢 Plus lent que les modèles Flash
- ⚠️ Peut avoir des limites d'usage plus strictes

### Quand l'utiliser
- Pour des quiz académiques exigeants
- Sujets très spécialisés (médecine, droit, sciences)
- Quand la qualité prime sur la vitesse
- Pour des explications très détaillées

---

## 📊 Comparaison Rapide

| Modèle | Vitesse | Intelligence | Usage Gratuit | Recommandé pour |
|--------|---------|--------------|---------------|-----------------|
| **2.0 Flash Lite** | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | ✅ Élevé | Usage quotidien |
| **2.0 Flash** | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | ✅ Bon | Quiz variés |
| **1.5 Flash** | ⚡⚡⚡⚡ | ⭐⭐⭐ | ✅ Bon | Textes longs |
| **Gemini Pro** | ⚡⚡ | ⭐⭐⭐⭐⭐ | ⚠️ Limité | Quiz avancés |

---

## 💡 Recommandations

### Pour débuter
→ Utilisez **Gemini 2.0 Flash Lite** (par défaut)

### Pour des quiz variés
→ Testez **Gemini 2.0 Flash**

### Pour des sujets complexes
→ Essayez **Gemini Pro**

### En cas de problème
→ L'application bascule automatiquement vers **2.0 Flash Lite**

---

## 🔥 Nouveautés Gemini 2.0

- ✅ Meilleure compréhension multilingue
- ✅ Génération plus créative et diverse
- ✅ Temps de réponse amélioré
- ✅ Support natif du français 🇫🇷
- ✅ **Temperature augmentée (0.9)** pour plus de variété
- ✅ **Seed aléatoire** pour générer des quiz différents

---

## 🛠️ Configuration Technique

### Paramètres de génération (Backend)

```javascript
generationConfig: {
  temperature: 0.9,  // Plus de créativité et variété
  topK: 40,          // Diversité des tokens
  topP: 0.95,        // Probabilité cumulative
}
```

### Système de fallback

Si un modèle échoue, l'application bascule automatiquement vers **Gemini 2.0 Flash Lite** :

```javascript
catch (error) {
  if (model !== 'gemini-2.0-flash-lite') {
    console.log('⚠️ Retrying with gemini-2.0-flash-lite...');
    return generateQuestionsFromSubject(subject, numQuestions, 'gemini-2.0-flash-lite');
  }
  throw error;
}
```

---

## 📝 Format de réponse

Tous les modèles génèrent des questions au format JSON suivant :

```json
[
  {
    "question": "Quelle est la capitale de la France ?",
    "options": [
      "Berlin",
      "Madrid",
      "Paris",
      "Rome"
    ],
    "correctAnswer": 2,
    "explanation": "Paris est la capitale de la France depuis 987, quand Hugues Capet est devenu roi."
  }
]
```

### Champs obligatoires

- **question** (string) : La question à poser
- **options** (array) : 4 options de réponse
- **correctAnswer** (number) : Index de la bonne réponse (0-3)
- **explanation** (string) : Explication de la bonne réponse

---

## 🎯 Génération de quiz différents

### Problème résolu
Avant, générer plusieurs quiz sur le même sujet donnait les mêmes questions.

### Solution implémentée
1. **Seed aléatoire** ajouté au prompt :
```javascript
const randomSeed = Math.floor(Math.random() * 10000);
const prompt = `Generate ${numQuestions} unique and diverse questions...
Variation seed: ${randomSeed}`;
```

2. **Temperature élevée** (0.9) pour plus de variété

3. **Instructions explicites** : "Create varied questions covering different aspects of the topic"

### Résultat
✅ Chaque génération produit des questions **uniques et différentes**

---

## 🚀 Comment choisir le bon modèle ?

### Débutant → **2.0 Flash Lite**
- Configuration par défaut
- Parfait pour découvrir l'application
- Rapide et fiable

### Utilisation normale → **2.0 Flash**
- Meilleur équilibre qualité/vitesse
- Pour des quiz réguliers
- Plus de créativité

### Usage avancé → **Gemini Pro**
- Pour des examens importants
- Sujets académiques complexes
- Explications détaillées

### Contenus longs → **1.5 Flash**
- Pour analyser de longs documents
- Fichiers PDF/DOCX volumineux
- Stabilité éprouvée

---

## ⚙️ Configuration dans l'application

### Frontend (QuizGenerator.jsx)

```javascript
const AVAILABLE_MODELS = [
  { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash (Lite)', description: 'Fast & reliable' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Balanced performance' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Alternative model' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Advanced model' },
];
```

### Backend (aiController.js)

```javascript
const getApiUrl = (model) => {
  return `${GOOGLE_GEMINI_BASE_URL}/${model}:generateContent`;
};
```

---

## 🔐 Limites d'utilisation (API gratuite)

### Gemini 2.0 Flash Lite
- **Requêtes/min** : 15
- **Requêtes/jour** : 1,500
- **Tokens/min** : 1,000,000

### Gemini 2.0 Flash
- **Requêtes/min** : 15
- **Requêtes/jour** : 1,500
- **Tokens/min** : 1,000,000

### Gemini 1.5 Flash
- **Requêtes/min** : 15
- **Requêtes/jour** : 1,500
- **Tokens/min** : 1,000,000

### Gemini Pro
- **Requêtes/min** : 2
- **Requêtes/jour** : 50
- **Tokens/min** : 32,000

> **Note** : Ces limites peuvent évoluer. Consultez la [documentation officielle Google AI](https://ai.google.dev/pricing).

---

## 🐛 Résolution de problèmes

### Le modèle ne fonctionne pas

1. **Vérifiez votre clé API** : Assurez-vous qu'elle est valide dans `.env`
2. **Vérifiez les limites** : Vous avez peut-être atteint la limite quotidienne
3. **Testez un autre modèle** : Essayez `gemini-2.0-flash-lite`
4. **Consultez les logs** : Regardez la console backend pour les erreurs

### Les questions sont toujours les mêmes

1. **Redémarrez le backend** : Pour charger la nouvelle configuration
2. **Changez de modèle** : Testez `gemini-2.0-flash`
3. **Augmentez le nombre de questions** : Plus de variété avec 10-15 questions

### Erreur "Failed to parse AI response"

1. **Le modèle a changé de format** : Utilisez un modèle stable (`2.0 Flash Lite`)
2. **Problème réseau** : Vérifiez votre connexion internet
3. **Rate limiting** : Attendez quelques minutes

---

## 📚 Ressources supplémentaires

- [Documentation Google Gemini](https://ai.google.dev/docs)
- [Obtenir une clé API gratuite](https://aistudio.google.com/app/apikey)
- [Limites et quotas](https://ai.google.dev/pricing)
- [Guide de démarrage rapide](../START_HERE.md)
- [Configuration de l'environnement](../QuizConstructor/SETUP.md)

---

## 📋 Changelog

### Version 2.0 (2025-10-30)
- ✅ Ajout de la génération aléatoire (seed + temperature)
- ✅ Support de tous les modèles Gemini
- ✅ Système de fallback automatique
- ✅ Explications détaillées pour chaque question
- ✅ Documentation complète des modèles

### Version 1.0 (2025-10-28)
- ✅ Support initial de Gemini 2.0 Flash Lite
- ✅ Mode DEMO avec questions pré-générées

---

## ❓ Questions fréquentes

### Quel modèle choisir pour débuter ?
→ **Gemini 2.0 Flash Lite** est le meilleur choix pour commencer.

### Puis-je utiliser tous les modèles gratuitement ?
→ Oui, tous les modèles ont une version gratuite avec des limites.

### Comment obtenir une clé API ?
→ Visitez [Google AI Studio](https://aistudio.google.com/app/apikey) et créez une clé gratuitement.

### Les quiz générés sont-ils stockés ?
→ Actuellement, ils sont stockés en mémoire. La persistance en base de données est planifiée.

### Puis-je générer des quiz en plusieurs langues ?
→ Oui, Gemini 2.0 supporte nativement le français et de nombreuses autres langues.

---

**Note finale** : Tous les modèles génèrent maintenant des **explications détaillées** et supportent la **génération aléatoire** pour créer des quiz différents sur le même sujet ! 🎯

**Modèle recommandé** : Commencez avec **Gemini 2.0 Flash Lite** et explorez les autres selon vos besoins.

---

*Dernière mise à jour : 2025-10-30*  
*Version : 2.0*
