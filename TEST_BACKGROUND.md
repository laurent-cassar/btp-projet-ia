# Instructions pour tester le background

## 🔴 Problème
Le background animé ne s'affiche pas

## ✅ Solution

### Étape 1 : Arrêter les serveurs
Fermez toutes les fenêtres de commande (Backend et Frontend)

### Étape 2 : Supprimer le cache
```bash
cd QuizConstructor\frontend
rmdir /s /q node_modules\.vite
```

### Étape 3 : Redémarrer
Double-cliquez sur `start.bat` à la racine du projet

### Étape 4 : Vérifier
1. Ouvrez http://localhost:5173
2. Appuyez sur `Ctrl + Shift + R` pour forcer le rechargement
3. Appuyez sur `F12` pour ouvrir la console
4. Vérifiez qu'il n'y a pas d'erreurs CSS

## 🎨 Ce que vous devriez voir

- **Fond** : Dégradé bleu → indigo → violet
- **Cercles animés** : 3 cercles colorés qui bougent lentement
  - Cercle bleu en haut à gauche
  - Cercle violet en haut à droite
  - Cercle rose en bas au centre
- **Grille** : Motif quadrillé très subtil

## 🐛 Si ça ne marche toujours pas

### Vérification 1 : Le CSS est chargé ?
1. Ouvrez F12 (Console développeur)
2. Onglet "Elements" ou "Inspecteur"
3. Trouvez `<div class="min-h-screen bg-gradient-to-br...">`
4. Vérifiez que les classes CSS sont appliquées

### Vérification 2 : Les animations sont définies ?
1. F12 → Onglet "Console"
2. Tapez : `getComputedStyle(document.querySelector('.animate-blob')).animation`
3. Devrait retourner : `"7s infinite ease 0s 1 normal none running blob"`

### Vérification 3 : Problème de cache navigateur
1. Videz le cache du navigateur
2. Chrome : `Ctrl + Shift + Delete` → Cochez "Images et fichiers en cache"
3. Rechargez la page avec `Ctrl + F5`

## 📝 Code à vérifier

### HomePage.jsx devrait avoir :
```jsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent"></div>
  </div>
  <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
    {/* Contenu */}
  </div>
</div>
```

### index.css devrait avoir :
```css
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-blob {
  animation: blob 7s infinite;
}
```

## 📞 Besoin d'aide ?

Si le problème persiste :
1. Faites une capture d'écran de la console (F12)
2. Vérifiez que le fichier `index.css` a bien été modifié
3. Vérifiez que le serveur frontend a redémarré après les changements
