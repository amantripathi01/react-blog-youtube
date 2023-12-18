// Test generated by RoostGPT for test ReactUnitTesting using AI Type Open AI and AI Model gpt-4-1106-preview


import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CommentList from '../../../src/components/CommentList';
import { useQuery } from 'react-query';

// Mocking the useQuery hook from react-query
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('CommentList component', () => {
  const postId = 1;

  beforeEach(() => {
    // Reset the mock before each test
    useQuery.mockReset();
  });

  test('renders loading state', async () => {
    useQuery.mockReturnValue({ isLoading: true, error: null, data: null });
    const { getByText } = render(<CommentList postId={postId} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    useQuery.mockReturnValue({ isLoading: false, error: true, data: null });
    const { getByText } = render(<CommentList postId={postId} />);
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });

  test('renders comments when data is received', async () => {
    const commentsMockData = {
      data: [
        { id: 1, content: 'First comment' },
        { id: 2, content: 'Second comment' }
      ],
      refetch: jest.fn(),
    };
    useQuery.mockReturnValue({ isLoading: false, error: null, ...commentsMockData });
    const { getByText } = render(<CommentList postId={postId} />);
    await waitFor(() => {
      expect(getByText('First comment')).toBeInTheDocument();
      expect(getByText('Second comment')).toBeInTheDocument();
    });
  });
});

