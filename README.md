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

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

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
