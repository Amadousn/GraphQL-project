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

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Backend

1. Installer les dépendances :
```bash
cd server
npm install
```

2. Configurer les variables d'environnement :
```bash
# Créer un fichier .env dans le dossier server avec :
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre_secret_jwt"  # Vous pouvez utiliser n'importe quelle chaîne de caractères
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

Le serveur sera disponible sur http://localhost:4000

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

## Résolution des problèmes courants

1. Si vous avez une erreur de base de données :
   ```bash
   cd server
   npx prisma migrate reset  # Réinitialise la base de données
   ```

2. Si le client ne se connecte pas au serveur :
   - Vérifiez que le serveur est bien lancé sur le port 4000
   - Vérifiez que l'URL du serveur dans `client/src/apollo.ts` est correcte

3. Si vous avez des erreurs de dépendances :
   ```bash
   # Dans le dossier client ou server
   rm -rf node_modules
   npm install
   ```

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
