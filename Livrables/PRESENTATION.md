# Présentation du Projet : Réseau Social GraphQL

## Vue d'ensemble
Application de réseau social permettant aux utilisateurs de partager des articles, interagir via des likes et des commentaires, le tout avec une architecture moderne utilisant GraphQL.

## Fonctionnalités principales

### 1. Authentification
- Système complet d'inscription et connexion
- Protection des routes privées

### 2. Gestion des Articles
- Création d'articles avec titre et contenu
- Affichage des articles avec leurs likes et commentaires

### 3. Interactions Sociales
- Système de likes sur les articles
- Commentaires sur les articles

## Défis rencontrés et solutions

### 1. Authentification avec GraphQL
- **Défi** : Implémentation de l'authentification JWT avec GraphQL, notamment la gestion des tokens dans les requêtes Apollo Client
- **Solution** : Utilisation d'un middleware côté serveur pour vérifier le token JWT et d'un link Apollo côté client pour injecter automatiquement le token dans les headers

### 2. Gestion du temps réel
- **Défi** : Mise à jour en temps réel des likes et commentaires sans rechargement
- **Solution** : Utilisation efficace du cache Apollo Client et configuration optimisée des politiques de mise à jour

### 3. TypeScript et GraphQL
- **Défi** : Assurer la cohérence des types entre le backend et le frontend
- **Solution** : Génération automatique des types TypeScript à partir du schéma GraphQL

## Architecture technique

### Backend (Node.js + GraphQL)
- Apollo Server pour l'API GraphQL
- Prisma pour la gestion de la base de données
- TypeScript pour la sécurité du typage

### Frontend (React)
- Apollo Client pour la gestion des données
- Styled-components pour le style
- TypeScript pour la robustesse du code

## Points d'amélioration envisagés

1. **Fonctionnalités**
   - Système de followers/following
   - Notifications en temps réel

2. **Performance**
   - Pagination des articles
   - Optimisation du cache

## Conclusion

Ce projet m'a permis de maîtriser GraphQL et son intégration avec React, tout en relevant des défis techniques intéressants en matière d'authentification et de gestion des données en temps réel.
