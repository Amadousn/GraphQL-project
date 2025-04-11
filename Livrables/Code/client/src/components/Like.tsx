import React from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';

const TOGGLE_LIKE = gql`
  mutation ToggleLike($articleId: ID!) {
    toggleLike(articleId: $articleId)
  }
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.isLiked ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isLiked ? 'white' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: ${(props) => (props.isLiked ? '#0056b3' : '#f8f9fa')};
  }
`;

interface LikeProps {
  articleId: string;
  likes: number;
  onLikeToggled: () => void;
}

const Like: React.FC<LikeProps> = ({ articleId, likes, onLikeToggled }) => {
  const [toggleLike] = useMutation(TOGGLE_LIKE);

  const handleLike = async () => {
    try {
      await toggleLike({
        variables: { articleId },
      });
      onLikeToggled();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <LikeButton onClick={handleLike} isLiked={likes > 0}>
      <span role="img" aria-label="like">
        {likes > 0 ? '❤️' : '🤍'}
      </span>
      {likes}
    </LikeButton>
  );
};

export default Like;
