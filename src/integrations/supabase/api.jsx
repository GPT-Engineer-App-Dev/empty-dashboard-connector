import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// QueryClient instance
const queryClient = new QueryClient();

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// Types and relations documentation
/**
 * Type: posts
 * Fields:
 * - id: integer
 * - title: text
 * - body: text
 * - created_at: timestamp with time zone
 * - author_id: uuid
 * 
 * Type: reactions
 * Fields:
 * - id: integer
 * - post_id: integer (Foreign Key to posts.id)
 * - user_id: uuid
 * - emoji: character
 */

// Hooks for posts
export const usePosts = () => useQuery({
  queryKey: ['posts'],
  queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};

// Hooks for reactions
export const useReactions = () => useQuery({
  queryKey: ['reactions'],
  queryFn: () => fromSupabase(supabase.from('reactions').select('*')),
});

export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReaction) => fromSupabase(supabase.from('reactions').insert([newReaction])),
    onSuccess: () => {
      queryClient.invalidateQueries('reactions');
    },
  });
};

// QueryClientProvider setup
export const SupabaseQueryClientProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};