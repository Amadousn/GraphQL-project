import { Context } from './context';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const resolvers = {
  Query: {
    articles: async (_parent: any, _args: any, context: Context) => {
      try {
        const articles = await context.prisma.article.findMany({
          include: {
            author: true,
            comments: {
              include: {
                author: true,
              },
            },
            _count: {
              select: { likes: true }
            }
          },
        });

        return articles.map((article) => ({
          ...article,
          likes: article._count.likes || 0, // Valeur par défaut
        }));
      } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }
    },
    article: async (_parent: any, args: { id: string }, context: Context) => {
      try {
        const article = await context.prisma.article.findUnique({
          where: { id: args.id },
          include: {
            author: true,
            comments: {
              include: {
                author: true,
              },
            },
            _count: {
              select: { likes: true }
            }
          },
        });

        if (!article) return null;

        return {
          ...article,
          likes: article._count.likes || 0, // Valeur par défaut
        };
      } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
      }
    },
    me: (_parent: any, _args: any, context: Context) => {
      if (!context.userId) return null;
      return context.prisma.user.findUnique({ where: { id: context.userId } });
    },
  },

  Mutation: {
    signup: async (_parent: any, args: { email: string; password: string; name: string }, context: Context) => {
      try {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
          data: { ...args, password },
        });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return { token, user };
      } catch (error) {
        console.error('Error during signup:', error);
        throw error;
      }
    },

    login: async (_parent: any, args: { email: string; password: string }, context: Context) => {
      try {
        const user = await context.prisma.user.findUnique({ where: { email: args.email } });
        if (!user) throw new Error('Utilisateur non trouvé');

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) throw new Error('Mot de passe incorrect');

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return { token, user };
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },

    createArticle: async (_parent: any, args: { title: string; content: string }, context: Context) => {
      if (!context.userId) throw new Error('Non authentifié');
      try {
        const article = await context.prisma.article.create({
          data: {
            title: args.title,
            content: args.content,
            author: { connect: { id: context.userId } },
          },
          include: {
            author: true,
            comments: true,
            _count: {
              select: { likes: true }
            }
          },
        });

        return {
          ...article,
          likes: article._count.likes || 0, // Valeur par défaut
        };
      } catch (error) {
        console.error('Error creating article:', error);
        throw error;
      }
    },

    addComment: async (_parent: any, args: { articleId: string; content: string }, context: Context) => {
      if (!context.userId) throw new Error('Non authentifié');
      try {
        return await context.prisma.comment.create({
          data: {
            content: args.content,
            article: { connect: { id: args.articleId } },
            author: { connect: { id: context.userId } },
          },
          include: { author: true },
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
    },

    toggleLike: async (_parent: any, args: { articleId: string }, context: Context) => {
      if (!context.userId) throw new Error('Non authentifié');
      try {
        const existingLike = await context.prisma.like.findUnique({
          where: {
            articleId_userId: {
              articleId: args.articleId,
              userId: context.userId,
            },
          },
        });

        if (existingLike) {
          await context.prisma.like.delete({
            where: {
              articleId_userId: {
                articleId: args.articleId,
                userId: context.userId,
              },
            },
          });
          return false;
        } else {
          await context.prisma.like.create({
            data: {
              article: { connect: { id: args.articleId } },
              user: { connect: { id: context.userId } },
            },
          });
          return true;
        }
      } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
      }
    },
  },

  Article: {
    likes: async (parent: any, _args: any, context: Context) => {
      const count = await context.prisma.like.count({
        where: { articleId: parent.id },
      });
      return count;
    },
  },
};
