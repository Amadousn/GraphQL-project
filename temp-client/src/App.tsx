import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import styled from '@emotion/styled';
import Auth from './components/Auth';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleAuthSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
  };

  return (
    <ApolloProvider client={client}>
      <Container>
        {token ? (
          <>
            <Header>
              <Title>Social Network</Title>
              <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
            </Header>
            <CreateArticle />
            <ArticleList />
          </>
        ) : (
          <Auth onAuthSuccess={handleAuthSuccess} />
        )}
      </Container>
    </ApolloProvider>
  );
};

export default App;
