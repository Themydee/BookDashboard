import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Landing = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // While auth state is loading
  if (isLoading) {
    return null;
  }

  // If already logged in, go straight to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex h="100vh" direction="column">
      {/* Hero */}
      <Flex flex="1" align="center" justify="center">
        <VStack spacing={6} textAlign="center">
          <Heading size="xl">Book Management Dashboard</Heading>

          <Text color="gray.600">
            A simple admin dashboard for managing books.
          </Text>

          {/* Features */}
          <List spacing={3} textAlign="left">
            <ListItem>
              <ListIcon as={CheckIcon} color="black" />
              Create new books
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="black" />
              View existing books
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="black" />
              Edit book details
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="black" />
              Delete books
            </ListItem>
          </List>
        </VStack>
      </Flex>

      {/* Footer */}
      <Box py={12} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Admin access only
        </Text>
      </Box>
    </Flex>
  );
};

export default Landing;
