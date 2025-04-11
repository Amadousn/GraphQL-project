# Réseau Social - Application Full Stack

Une application de réseau social développée avec React, GraphQL, et Prisma.

## Technologies Utilisées

### Frontend
- React
- Apollo Client
- Emotion (styled-components)
- TypeScript

### Backend
- Node.js
- Apollo Server
- Prisma
- SQLite
- TypeScript

## Fonctionnalités

- Authentification (inscription/connexion)
- Création d'articles
- Système de likes
- Commentaires
- Interface utilisateur responsive

## Structure du Projet

```
.
├── client/             # Frontend React
│   ├── src/
│   │   ├── components/
│   │   └── App.tsx
│   └── package.json
│
└── server/             # Backend GraphQL
    ├── src/
    │   ├── schema.ts
    │   ├── resolvers.ts
    │   └── context.ts
    ├── prisma/
    │   └── schema.prisma
    └── package.json
```

## Installation

### Backend

1. Installer les dépendances :
```bash
cd server
npm install
```

2. Configurer les variables d'environnement :
```bash
# Créer un fichier .env avec :
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre_secret_jwt"
```

3. Initialiser la base de données :
```bash
npx prisma migrate dev
npx prisma generate
```

4. Démarrer le serveur :
```bash
npm run dev
```

### Frontend

1. Installer les dépendances :
```bash
cd client
npm install
```

2. Démarrer l'application :
```bash
npm start
```

L'application sera disponible sur http://localhost:3000

## Captures d'écran

Des captures d'écran de l'application sont disponibles dans le dossier `Livrables/Screenshots` :
- `auth_login.png` : Page de connexion
- `auth_signup.png` : Page d'inscription
- `home.png` : Page principale avec les articles

## Utilisation

1. Créez un compte ou connectez-vous
2. Créez des articles
3. Interagissez avec les articles (likes, commentaires)
4. Explorez les articles des autres utilisateurs

## Points Techniques

- Utilisation de GraphQL pour une API efficace et typée
- Gestion d'état avec Apollo Client
- Base de données relationnelle avec Prisma
- Authentification JWT
- Composants React réutilisables
- Styled-components pour un style maintenable
