
import { Box, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      w="220px"
      bg="gray.50"
      p={4}
      borderRight="1px solid"
      borderColor="gray.200"
      minH="100vh"
    >
      <VStack spacing={4} align="stretch">
        <Button as={Link} to="/dashboard" variant="ghost">
          Dashboard
        </Button>
        <Button as={Link} to="/dashboard/books" variant="ghost">
          Books
        </Button>
        <Button as={Link} to="/dashboard/authors" variant="ghost">
          Authors
        </Button>
      </VStack>
    </Box>
  );
}
