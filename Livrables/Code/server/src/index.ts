import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext } from './context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  formatError: (error) => {
    console.error('Server error:', error);
    return error;
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
