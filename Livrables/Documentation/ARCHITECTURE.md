# Architecture du Projet

## Vue d'Ensemble
L'application suit une architecture client-serveur moderne, utilisant GraphQL comme couche d'API. Elle est construite avec une séparation claire des responsabilités et une approche modulaire.

## Architecture Frontend

### Structure des Composants
```
src/
├── components/           # Composants réutilisables
│   ├── Auth/            # Composants d'authentification
│   ├── Article/         # Composants liés aux articles
│   └── Common/          # Composants partagés
├── hooks/               # Hooks personnalisés
├── graphql/             # Requêtes et mutations GraphQL
└── utils/              # Fonctions utilitaires
```

### Gestion de l'État
- **Apollo Client** : Gestion du cache et des requêtes GraphQL
- **Local Storage** : Stockage du token JWT
- **Context API** : Gestion de l'état d'authentification

### Routing
Utilisation de React Router avec les routes principales :
- `/` : Page d'accueil (liste des articles)
- `/login` : Page de connexion
- `/signup` : Page d'inscription
- `/create` : Création d'article

## Architecture Backend

### Structure du Code
```
src/
├── resolvers/          # Résolveurs GraphQL
├── schema/            # Définitions du schéma
├── models/            # Modèles Prisma
└── utils/            # Utilitaires (auth, validation)
```

### Couches Logiques
1. **GraphQL Layer**
   - Schema definitions
   - Resolvers
   - Type definitions

2. **Service Layer**
   - Business logic
   - Data validation
   - Error handling

3. **Data Access Layer**
   - Prisma ORM
   - Database queries
   - Data transformations

### Sécurité
- **Authentication** : JWT-based
- **Authorization** : Per-resolver checks
- **Input Validation** : GraphQL type system

## Modèle de Données

### Entités Principales
1. **User**
   ```prisma
   model User {
     id        String    @id @default(uuid())
     email     String    @unique
     password  String
     name      String
     articles  Article[]
     comments  Comment[]
     likes     Like[]
   }
   ```

2. **Article**
   ```prisma
   model Article {
     id        String    @id @default(uuid())
     title     String
     content   String
     author    User      @relation(fields: [authorId], references: [id])
     comments  Comment[]
     likes     Like[]
   }
   ```

3. **Comment**
   ```prisma
   model Comment {
     id        String   @id @default(uuid())
     content   String
     article   Article  @relation(fields: [articleId], references: [id])
     author    User     @relation(fields: [authorId], references: [id])
   }
   ```

## Flow de Données

### Création d'Article
1. Utilisateur remplit le formulaire
2. Apollo Client envoie la mutation
3. Resolver vérifie l'authentification
4. Création en base de données
5. Mise à jour du cache Apollo
6. UI mise à jour automatiquement

### Système de Like
1. Clic sur le bouton Like
2. Mutation optimiste
3. Mise à jour en base de données
4. Confirmation ou rollback

## Points d'Extension

### Scalabilité
- Pagination des articles
- Caching GraphQL
- Optimisation des requêtes N+1

### Futures Fonctionnalités
1. Système de followers
2. Notifications
3. Recherche avancée
4. Upload de médias
