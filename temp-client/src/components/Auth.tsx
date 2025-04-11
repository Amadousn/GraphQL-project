import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
  &:hover {
    color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 10px;
`;

interface AuthProps {
  onAuthSuccess: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const token = data.login.token;
      localStorage.setItem('token', token);
      onAuthSuccess(token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      const token = data.signup.token;
      localStorage.setItem('token', token);
      onAuthSuccess(token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await login({
          variables: { email, password },
        });
      } else {
        await signup({
          variables: { email, password, name },
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <Container>
      <Title>{isLogin ? 'Connexion' : 'Inscription'}</Title>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </Button>
      </Form>
      <ToggleButton type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
      </ToggleButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Auth;
