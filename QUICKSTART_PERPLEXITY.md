# 🚀 Configuration Rapide - Perplexity Web Search

## ⚡ Installation en 5 minutes

### Étape 1: Obtenir votre clé API Perplexity (2 min)

1. Allez sur [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
2. Connectez-vous avec `laurent.cassar@laplateforme.io`
3. Cliquez sur "Generate New API Key"
4. Copiez la clé (commence par `pplx-`)

### Étape 2: Configurer le Backend (1 min)

```bash
cd QuizConstructor/backend
```

Créez un fichier `.env` avec:

```env
PERPLEXITY_API_KEY=pplx-VOTRE-CLE-ICI
DEMO_MODE=false
PORT=5000
NODE_ENV=development
```

### Étape 3: Démarrer les serveurs (2 min)

**Terminal 1 - Backend:**
```bash
cd QuizConstructor/backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd QuizConstructor/frontend
npm install
npm run dev
```

### Étape 4: Tester ✨

1. Ouvrez http://localhost:3000
2. Cliquez sur l'onglet **"Web Search"** 🌐
3. Entrez une requête: "Artificial Intelligence"
4. Cliquez sur "🔍 Search & Generate Quiz"
5. ✅ Votre premier quiz web est créé!

---

## 🎯 Exemples de requêtes

### Pour l'éducation
- "Les causes de la Seconde Guerre mondiale"
- "Le système solaire et les planètes"
- "Les bases de la programmation Python"

### Pour l'actualité
- "Climate change impact 2024"
- "Latest developments in AI"
- "Renewable energy technologies"

### Pour la science
- "DNA structure and function"
- "Quantum mechanics basics"
- "Human body organs"

---

## 🔧 Dépannage Express

### Erreur: "PERPLEXITY_API_KEY is not configured"
➡️ Vérifiez que `.env` existe dans `QuizConstructor/backend/`
➡️ Vérifiez que la clé est bien sur une ligne: `PERPLEXITY_API_KEY=pplx-...`

### Erreur: "Invalid API key"
➡️ Vérifiez que vous avez copié la clé complète
➡️ Pas d'espaces avant ou après la clé
➡️ Redémarrez le serveur backend

### Pas de sources affichées
➡️ Normal pour certaines recherches
➡️ Le système fonctionne quand même

### Quiz vide ou erreur
➡️ Vérifiez que les deux serveurs tournent
➡️ Vérifiez la console navigateur (F12)
➡️ Vérifiez les logs backend

---

## 📊 Vérification de l'installation

### Checklist complète:

- [ ] Clé API Perplexity obtenue
- [ ] Fichier `.env` créé dans backend
- [ ] Variable `PERPLEXITY_API_KEY` configurée
- [ ] Backend démarré sur port 5000
- [ ] Frontend démarré sur port 3000
- [ ] Onglet "Web Search" visible
- [ ] Premier quiz généré avec succès
- [ ] Sources web affichées

---

## 🎓 Ressources

- **Documentation complète**: `PERPLEXITY_SETUP.md`
- **Tests**: `TEST_PLAN_PERPLEXITY.md`
- **Architecture**: `AGENTS.md`
- **Support**: laurent.cassar@laplateforme.io

---

**Temps total**: ~5 minutes  
**Difficulté**: ⭐ Facile  
**Version**: 1.0 (2025-10-29)
