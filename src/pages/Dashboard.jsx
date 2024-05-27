import { Box, Flex, Text, VStack, HStack, Link, IconButton, Button, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa";
import { usePosts, useAddPost, useReactions, useAddReaction } from '../integrations/supabase/api';
import { useState } from 'react';

const Dashboard = () => {
  const { data: posts, isLoading: isLoadingPosts, error: postsError } = usePosts();
  const { data: reactions, isLoading: isLoadingReactions, error: reactionsError } = useReactions();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [newReactionEmoji, setNewReactionEmoji] = useState('');
  const [newReactionPostId, setNewReactionPostId] = useState('');

  const handleAddPost = () => {
    addPostMutation.mutate({ title: newPostTitle, body: newPostBody });
  };

  const handleAddReaction = () => {
    addReactionMutation.mutate({ post_id: newReactionPostId, emoji: newReactionEmoji });
  };

  return (
    <Flex direction="column" height="100vh">
      <Box bg="blue.600" color="white" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
      </Box>
      <Flex flex="1" direction={{ base: "column", md: "row" }}>
        <Box bg="gray.100" width={{ base: "100%", md: "250px" }} p={4}>
          <VStack align="start" spacing={4}>
            <Link href="#" display="flex" alignItems="center">
              <FaHome />
              <Text ml={2}>Home</Text>
            </Link>
            <Link href="#" display="flex" alignItems="center">
              <FaChartBar />
              <Text ml={2}>Analytics</Text>
            </Link>
            <Link href="#" display="flex" alignItems="center">
              <FaCog />
              <Text ml={2}>Settings</Text>
            </Link>
          </VStack>
        </Box>
        <Box flex="1" p={4}>
          <Text fontSize="xl">Welcome to your dashboard!</Text>
          <Text>This is a placeholder for future data and widgets.</Text>

          <Box mt={4}>
            <Text fontSize="lg" mb={2}>Posts</Text>
            {isLoadingPosts ? <Spinner /> : postsError ? <Alert status="error"><AlertIcon />{postsError.message}</Alert> : (
              <VStack align="start">
                {posts.map(post => (
                  <Box key={post.id} p={4} bg="white" shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{post.title}</Text>
                    <Text>{post.body}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          <Box mt={4}>
            <Text fontSize="lg" mb={2}>Add New Post</Text>
            <Input placeholder="Title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
            <Input placeholder="Body" value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)} />
            <Button mt={2} onClick={handleAddPost} isLoading={addPostMutation.isLoading}>Add Post</Button>
          </Box>

          <Box mt={4}>
            <Text fontSize="lg" mb={2}>Reactions</Text>
            {isLoadingReactions ? <Spinner /> : reactionsError ? <Alert status="error"><AlertIcon />{reactionsError.message}</Alert> : (
              <VStack align="start">
                {reactions.map(reaction => (
                  <Box key={reaction.id} p={4} bg="white" shadow="md" borderWidth="1px">
                    <Text>{reaction.emoji}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          <Box mt={4}>
            <Text fontSize="lg" mb={2}>Add New Reaction</Text>
            <Input placeholder="Post ID" value={newReactionPostId} onChange={(e) => setNewReactionPostId(e.target.value)} />
            <Input placeholder="Emoji" value={newReactionEmoji} onChange={(e) => setNewReactionEmoji(e.target.value)} />
            <Button mt={2} onClick={handleAddReaction} isLoading={addReactionMutation.isLoading}>Add Reaction</Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;