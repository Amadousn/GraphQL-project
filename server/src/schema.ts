import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    articles: [Article!]!
    comments: [Comment!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    article: Article!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    articles: [Article!]!
    article(id: ID!): Article
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createArticle(title: String!, content: String!): Article!
    addComment(articleId: ID!, content: String!): Comment!
    toggleLike(articleId: ID!): Boolean!
  }
`;
