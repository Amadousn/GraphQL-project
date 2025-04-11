import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Comment from './Comment';
import Like from './Like';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
      author {
        id
        name
      }
      comments {
        id
        content
        author {
          id
          name
        }
      }
      likes
    }
  }
`;

const ArticleContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ArticleTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const ArticleContent = styled.p`
  color: #666;
  margin-bottom: 15px;
  white-space: pre-wrap;
`;

const ArticleAuthor = styled.div`
  color: #007bff;
  font-weight: 500;
  margin-bottom: 15px;
`;

const ArticleActions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #dc3545;
`;

const NoArticlesMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ArticleList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_ARTICLES, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <LoadingMessage>Chargement des articles...</LoadingMessage>;
  if (error) return <ErrorMessage>Erreur : {error.message}</ErrorMessage>;
  if (!data?.articles || data.articles.length === 0) {
    return <NoArticlesMessage>Aucun article pour le moment</NoArticlesMessage>;
  }

  return (
    <div>
      {data.articles.map((article: any) => (
        <ArticleContainer key={article.id}>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleAuthor>Par {article.author?.name || 'Anonyme'}</ArticleAuthor>
          <ArticleContent>{article.content}</ArticleContent>
          <ArticleActions>
            <Like
              articleId={article.id}
              likes={article.likes || 0}
              onLikeToggled={refetch}
            />
          </ArticleActions>
          <Comment
            articleId={article.id}
            comments={article.comments || []}
            onCommentAdded={refetch}
          />
        </ArticleContainer>
      ))}
    </div>
  );
};

export default ArticleList;
