import { Box, Flex, Text, VStack, HStack, Link, IconButton } from "@chakra-ui/react";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa";

const Dashboard = () => {
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
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;