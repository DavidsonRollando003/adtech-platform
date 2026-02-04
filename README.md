Je développe cette plateforme sur mon ordinateur tournant sous **Linux Mint**.

# AdTech Platform

Une mini plateforme de gestion de campagnes publicitaires (AdTech) fullstack.

## Stack Technique

### Backend
- **Node.js + Express**: Serveur léger et performant.
- **MongoDB + Mongoose**: Base de données NoSQL flexible pour le modèle de campagne.
- **Joi**: Validation des données entrantes.
- **Architecture**: MVC avec séparation des Services, Controllers et Routes.

### Frontend
- **Next.js 14 (App Router)**: Framework React moderne.
- **Tailwind CSS**: Styling utilitaire pour une UI propre et rapide.
- **Lucide React**: Icônes vectorielles.
- **Design**: Interface premium, épurée et responsive (Français).

## Fonctionnalités

1. **Tableau de Bord / Liste**: Vue d'ensemble des campagnes avec indicateurs clés (Budget, Status).
2. **Création**: Formulaire validé pour lancer une nouvelle campagne.
3. **Détail & Stats**:
   - Calcul du CTR (Click-Through Rate) et CPC (Cost Per Click).
   - Affichage des métriques (Impressions, Clics).
   - Contrôle du statut (Pause / Activation) en temps réel.

## Améliorations Possibles (Bonus)

Avec plus de temps, j'ajouterais :
- **Pagination**: Indispensable si le nombre de campagnes explose.
- **Tests E2E**: Cypress ou Playwright pour valider les flux critiques.
- **Typescript**: Pour une meilleure robustesse du code.
- **Authentification**: JWT ou NextAuth pour sécuriser l'accès.

## Installation et Lancement

### Pré-requis
- Node.js (v18+)
- MongoDB (local ou URI via .env)

### 1. Backend

\`\`\`bash
cd backend
npm install
# Assurez-vous que MongoDB tourne sur le port par défaut ou configurez le .env
# Contenu du .env par défaut :
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/adtech_platform

npm start
\`\`\`
Le serveur démarrera sur http://localhost:5000

### 2. Frontendgit co

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
L'application sera accessible sur http://localhost:3000

