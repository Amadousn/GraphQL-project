# Guide d'Installation Détaillé

## Prérequis

### Environnement de Développement
1. Node.js (v14 ou supérieur)
   - Téléchargement : https://nodejs.org/
   - Vérification : `node --version`

2. PostgreSQL
   - Téléchargement : https://www.postgresql.org/download/
   - Création d'une base de données nommée "social_network"

3. IDE recommandé : Visual Studio Code
   - Extensions recommandées :
     - ESLint
     - Prettier
     - GraphQL
     - TypeScript

## Installation Pas à Pas

### 1. Configuration du Backend

#### a. Installation des Dépendances
```bash
cd server
npm install
```

#### b. Configuration de l'Environnement
Créer un fichier `.env` dans le dossier `server` :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/social_network"
JWT_SECRET="votre_secret_jwt"
```

#### c. Initialisation de la Base de Données
```bash
npx prisma migrate dev
npx prisma generate
```

#### d. Démarrage du Serveur
```bash
npm run dev
```
Le serveur devrait démarrer sur http://localhost:4000

### 2. Configuration du Frontend

#### a. Installation des Dépendances
```bash
cd client
npm install
```

#### b. Configuration de l'Environnement
Créer un fichier `.env` dans le dossier `client` :
```env
REACT_APP_API_URL=http://localhost:4000
```

#### c. Démarrage de l'Application
```bash
npm start
```
L'application devrait démarrer sur http://localhost:3000

## Vérification de l'Installation

### 1. Backend
- Accéder à http://localhost:4000
- L'interface GraphQL Playground devrait s'afficher
- Tester la requête :
```graphql
query {
  articles {
    id
    title
  }
}
```

### 2. Frontend
- Accéder à http://localhost:3000
- La page d'accueil devrait s'afficher
- Tester l'inscription d'un nouvel utilisateur

## Résolution des Problèmes Courants

### Erreur de Base de Données
1. Vérifier que PostgreSQL est en cours d'exécution
2. Vérifier les informations de connexion dans `.env`
3. Vérifier les droits d'accès à la base de données

### Erreur de Connexion Frontend-Backend
1. Vérifier que le backend est en cours d'exécution
2. Vérifier que l'URL de l'API est correcte dans le frontend
3. Vérifier les paramètres CORS dans le backend

### Erreur de Dépendances
1. Supprimer le dossier `node_modules`
2. Supprimer le fichier `package-lock.json`
3. Réexécuter `npm install`
