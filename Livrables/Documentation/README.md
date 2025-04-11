# Application de Réseau Social

## Description
Cette application est un réseau social permettant aux utilisateurs de créer des articles, commenter et aimer les publications d'autres utilisateurs. Elle a été développée en utilisant les technologies modernes du web, notamment React pour le frontend et GraphQL pour l'API.

## Technologies Utilisées
- **Frontend** :
  - React
  - Apollo Client
  - TypeScript
  - Styled Components
  - React Router

- **Backend** :
  - Node.js
  - Apollo Server
  - GraphQL
  - Prisma (ORM)
  - TypeScript
  - PostgreSQL

## Fonctionnalités
1. **Authentification**
   - Inscription
   - Connexion
   - Gestion des tokens JWT

2. **Gestion des Articles**
   - Création d'articles
   - Affichage de la liste des articles
   - Affichage détaillé d'un article

3. **Interactions Sociales**
   - Commentaires sur les articles
   - Système de "j'aime" pour les articles
   - Affichage des auteurs

## Structure du Projet
```
project/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── App.tsx       # Point d'entrée
│   │   └── ...
│   └── package.json
│
└── server/                # Backend GraphQL
    ├── src/
    │   ├── resolvers.ts  # Résolveurs GraphQL
    │   ├── schema.ts     # Schéma GraphQL
    │   └── ...
    └── package.json
```

## Installation et Démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- PostgreSQL
- npm ou yarn

### Backend
1. Naviguer vers le dossier server :
```bash
cd server
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer la base de données :
```bash
npx prisma migrate dev
```

4. Démarrer le serveur :
```bash
npm run dev
```

### Frontend
1. Naviguer vers le dossier client :
```bash
cd client
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer l'application :
```bash
npm start
```

## Points Techniques Importants

### Sécurité
- Utilisation de JWT pour l'authentification
- Hachage des mots de passe avec bcrypt
- Validation des entrées utilisateur

### Performance
- Optimisation des requêtes GraphQL
- Mise en cache côté client avec Apollo Client
- Pagination des résultats

### Architecture
- Séparation claire frontend/backend
- Utilisation de TypeScript pour la sécurité du typage
- Architecture modulaire et maintenable
