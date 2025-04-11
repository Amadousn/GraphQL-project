import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';

const ADD_COMMENT = gql`
  mutation AddComment($articleId: ID!, $content: String!) {
    addComment(articleId: $articleId, content: $content) {
      id
      content
      author {
        name
      }
    }
  }
`;

const CommentContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const CommentAuthor = styled.div`
  font-weight: 500;
  color: #007bff;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  color: #333;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const CommentButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

interface CommentProps {
  articleId: string;
  comments: Array<{
    id: string;
    content: string;
    author: {
      name: string;
    };
  }>;
  onCommentAdded: () => void;
}

const Comment: React.FC<CommentProps> = ({ articleId, comments, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [addComment] = useMutation(ADD_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({
        variables: { articleId, content },
      });
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <CommentContainer key={comment.id}>
          <CommentAuthor>{comment.author.name}</CommentAuthor>
          <CommentContent>{comment.content}</CommentContent>
        </CommentContainer>
      ))}
      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          placeholder="Ajouter un commentaire..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <CommentButton type="submit">Commenter</CommentButton>
      </CommentForm>
    </div>
  );
};

export default Comment;
