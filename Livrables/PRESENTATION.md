# Présentation du Projet : Réseau Social GraphQL

## Vue d'ensemble
Application de réseau social permettant aux utilisateurs de partager des articles, interagir via des likes et des commentaires, le tout avec une architecture moderne utilisant GraphQL.

## Fonctionnalités principales

### 1. Authentification
- Système complet d'inscription et connexion
- Gestion des tokens JWT pour la sécurité
- Protection des routes privées

### 2. Gestion des Articles
- Création d'articles avec titre et contenu
- Affichage en temps réel des nouveaux articles
- Interface intuitive de publication

### 3. Interactions Sociales
- Système de likes sur les articles
- Commentaires sur les articles
- Affichage des auteurs et timestamps

## Défis techniques rencontrés

### 1. Mise en place de GraphQL
- Configuration du serveur Apollo
- Définition du schéma GraphQL
- Implémentation des resolvers

### 2. Authentification
- Gestion sécurisée des tokens JWT
- Protection des mutations GraphQL
- Persistance de la session utilisateur

### 3. État de l'application React
- Gestion du cache Apollo Client
- Mise à jour en temps réel des données
- Optimisation des requêtes GraphQL

## Architecture technique

### Backend (Node.js + GraphQL)
- Apollo Server pour l'API GraphQL
- Prisma pour la gestion de la base de données
- TypeScript pour la sécurité du typage

### Frontend (React)
- Apollo Client pour la gestion des données
- Styled-components pour le style
- TypeScript pour la robustesse du code

## Points d'amélioration possibles

1. **Performance**
   - Mise en place du pagination pour les articles
   - Optimisation des requêtes N+1
   - Mise en cache côté serveur

2. **Fonctionnalités**
   - Système de followers/following
   - Notifications en temps réel
   - Upload d'images

3. **UX/UI**
   - Mode sombre
   - Interface responsive plus élaborée
   - Animations de transition

## Conclusion

Ce projet démontre l'utilisation pratique de GraphQL dans une application full-stack moderne. Il met en évidence les avantages de GraphQL pour la gestion efficace des données et la flexibilité des requêtes, tout en maintenant une base de code TypeScript propre et maintenable.
